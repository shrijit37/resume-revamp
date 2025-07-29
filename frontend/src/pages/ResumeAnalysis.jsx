import { useState } from "react"
import AnalysesSteps from "../components/AnalysesSteps"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import DisplayPDf from "../components/DisplayPDF";
import testpdf from "../assets/shrijit.pdf"
function ResumeAnalysis() {

    const [status, setStatus] = useState("notLoading");
    const handleAnalyseButton = () => {
        setStatus("loaded");
    }

    const handleFileChange = () => {
        
    }
    return (
        <div className='flex h-screen'>
            <div className=' flex w-[50%] h-full justify-center items-center'>
                {status === 'notLoading' && (<div className="flex flex-col w-1/2 h-1/4 border-3 border-info rounded-lg p-3 bg-black">
                    <div className="text-gray-400 text-center text-2xl w-full">
                        Upload a Resume
                    </div>
                    <div className='self-center mt-15'>
                        <input
                            type="file"
                            accept="application/pdf"
                            className="file-input file-input-sm"
                        />
                    </div>
                    <button onClick={handleAnalyseButton} className="btn btn-primary w-1/2 self-center m-6">
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
                            <DisplayPDf pdfUrl={testpdf+"#toolbar=0"+"&zoom=page-fit"}/>

                        </div>
                    )
                }
            </div>
            <div className="flex-1">
                {status !== 'notLoading' && <AnalysesSteps />}
            </div>
        </div>
    )
}

export default ResumeAnalysis