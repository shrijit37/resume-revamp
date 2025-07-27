import React, { useRef, useEffect } from 'react';
import HowItWorksImage from "../assets/Howitworks.svg"
const HowItWorks = () => {
  const carouselRef = useRef();
  let scrollAmount = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      scrollAmount += carouselRef.current.offsetWidth;
      if (scrollAmount >= carouselRef.current.scrollWidth) {
        scrollAmount = 0; // reset to start
      }
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }, 4000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const steps = [
    {
      step: "1",
      title: "Upload Your Resume & JD",
      description: "Drag and drop your resume and the job description for the role you're targeting."
    },
    {
      step: "2", 
      title: "AI Analysis & Optimization",
      description: "Our advanced AI reviews your resume, cross-references it with the JD, and provides tailored suggestions to maximize alignment and impact."
    },
    {
      step: "3",
      title: "Receive Feedback", 
      description: "Get a comprehensive report with clear, actionable steps to refine your resume and boost your chances of landing the job."
    },
    {
      step: "4",
      title: "Revise and Succeed",
      description: "Apply the feedback, optimize your resume, and confidently apply for your dream job!"
    }
  ];

  return (
    <div className=' py-16'>
      <div className="text-5xl text-center text-black mb-12 font-bold">How it works</div>
      <div className="flex">
        <div className="carousel w-full carousel-end rounded-box max-w-4xl mx-auto" ref={carouselRef}>
        {steps.map((stepData, index) => (
          <div key={index} className="carousel-item w-full">
            <div className='bg-accent w-full h-80 flex flex-col items-center justify-center text-center p-8 mx-4 rounded-lg shadow-lg border'>
              <div className='bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6'>
                {stepData.step}
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                {stepData.title}
              </h3>
              <p className='text-gray-600 text-lg leading-relaxed max-w-md'>
                {stepData.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <img src={HowItWorksImage} alt="" className='h-80 w-80' />
      </div>
      
    </div>
  );
};

export default HowItWorks;