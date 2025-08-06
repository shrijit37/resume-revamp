import HowItWorksImage from "../assets/Howitworks.svg"

const HowItWorks = () => {
  const data = [
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
    <div className='py-16 px-6 max-w-7xl mx-auto'>
      <div className="text-5xl text-center text-yellow-600 text-accent mb-16 font-bold">
        How it works
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Steps Section */}
        <div className="flex-1 space-y-8">
          {data.map((item, index) => (
            <div key={index} className="flex items-start gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                {item.step}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex-shrink-0">
          <img 
            src='/Howitworks.svg' 
            alt="How it works illustration" 
            className='h-80 w-80 lg:h-96 lg:w-96 drop-shadow-lg hover:scale-105 transition-transform duration-300' 
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;