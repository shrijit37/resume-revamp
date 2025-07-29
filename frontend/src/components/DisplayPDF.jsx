import React from 'react';

function DisplayPDF({ pdfUrl }) {
    console.log(pdfUrl);
    return (
        <div className="h-screen">
            <div className='text-3xl text-center text-accent'>
                resume preview
            </div>
            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    title="Uploaded PDF"
                    className="w-full h-screen border"
                    style={{ border: 'none' }}
                />
            )}
        </div>
    );
}

export default DisplayPDF;
