import { useState } from "react"
import AnalysesSteps from "../components/AnalysesSteps"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import DisplayPDf from "../components/DisplayPDF";
import testpdf from "../assets/shrijit.pdf"
import axios from "axios";
function ResumeAnalysis() {
    const [status, setStatus] = useState("notLoading");
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file);

    }


    const handleAnalyseButton = async () => {
        if (!file) {
            alert("Please select a PDF file first!");
            return;
        }

        const formData = new FormData();
        formData.append("resumeFile", file); 
setStatus("loaded");
        try {
            const response = await axios.post("http://localhost:8000/api/resume/user/atscheckwithresume/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload success:", response.data);
            // setStatus("loaded");
        } catch (error) {
            console.error("Error uploading PDF:", error);
        }
    };
    return (
        <div className='flex h-screen w-full justify-center items-center'>
            <div className=' flex h-full justify-center items-center'>
                {status === 'notLoading' && (
                    <div className="flex flex-col  h-1/4 border-3 border-info rounded-lg p-3 ">
                    <div className="text-gray-400 text-center text-2xl w-full">
                        Upload a Resume
                    </div>
                    <div className='self-center mt-15'>
                        <input
                            type="file"
                            accept="application/pdf"
                            className="file-input file-input-sm"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button onClick={handleAnalyseButton} className="btn btn-primary bg-[#00FF84] text-black w-1/2 self-center m-6">
                        Analyse
                    </button>
                </div>)}

                {
                    status === 'loading' && (
                        <div>
                            <DotLottieReact
                                src="https://lottie.host/b7ebe515-201b-427e-bf18-29d1d69db06d/CNaLF3NkQV.lottie"
                                loop
                                autoplay
                            />
                            <div className="text-xl text-center">Please wait while we analyse your resume.</div>
                        </div>
                    )
                }


                {
                    status === 'loaded' && (
                        <div className="h-screen w-full bg-black ">
                            <DisplayPDf pdfUrl={testpdf + "#toolbar=0" + "&zoom=page-fit"} />

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ResumeAnalysis