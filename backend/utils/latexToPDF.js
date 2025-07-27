import latex from "node-latex";
import fs from "fs";
import path from "path";
import { Readable } from 'stream';

const latexToPDF = async (latexContent, clsFileContent) => {
    if (!latexContent || !clsFileContent) {
        throw new Error("latexCode and clsFileContent are required");
    }

    return new Promise(async (resolve, reject) => {
        try {
            // Create a temporary directory
            const tempDir = path.join(process.cwd(), "tmp", Date.now().toString());
            await fs.promises.mkdir(tempDir, { recursive: true });

            // Write the .cls file
            const clsFilePath = path.join(tempDir, "resume.cls");
            await fs.promises.writeFile(clsFilePath, clsFileContent, 'utf8');
            
            // Verify the file was written
            const clsExists = await fs.promises.access(clsFilePath).then(() => true).catch(() => false);
            if (!clsExists) {
                throw new Error('Failed to write resume.cls file');
            }

            // Create PDF from latexCode
            const pdfStream = latex(Readable.from(latexContent), { 
                cwd: tempDir,
                inputs: [tempDir],
                cmd: 'pdflatex'
            });

            const chunks = [];

            pdfStream.on('data', (chunk) => {
                chunks.push(chunk);
            });

            pdfStream.on('end', async () => {
                try {
                    const pdfBuffer = Buffer.concat(chunks);
                    
                    // Clean up temporary directory
                    await fs.promises.rm(tempDir, { recursive: true, force: true });
                    
                    resolve(pdfBuffer);
                } catch (cleanupError) {
                    console.error("Cleanup error:", cleanupError);
                    resolve(Buffer.concat(chunks)); // Still return the PDF even if cleanup fails
                }
            });

            pdfStream.on('error', async (err) => {
                console.error("LaTeX Error:", err);
                
                // Clean up on error
                try {
                    await fs.promises.rm(tempDir, { recursive: true, force: true });
                } catch (cleanupError) {
                    console.error("Cleanup error:", cleanupError);
                }
                
                reject(new Error(`Error generating PDF: ${err.message}`));
            });

        } catch (error) {
            console.error("Error:", error);
            reject(new Error(`Internal server error: ${error.message}`));
        }
    });
};

export default latexToPDF;
