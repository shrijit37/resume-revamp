import React from 'react'
import hero_resume from "../assets/resume_hero.svg"
import AnimatedContent from '../components/AnimatedContent/AnimatedContent'
import HowItWorks from './HowItWorks'
export const Hero = () => {
    return (

        <>
  
        <div className="flex p-5">
            <div className="flex-2/3 flex items-center mx-auto justify-end">

                <div>
                    <div className="text-5xl font-bold text-yellow-300 text-center m-3">
                        Elevate Your Career with Expert Resume Feedback & Job Description Optimization
                    </div>
                    <div className="text-xl font-bold text-gray-300 text-center">
                        Welcome to your ultimate platform for crafting a job-winning resume! Upload your resume and a job description (JD) to receive personalized, expert-driven feedback powered by advanced AI. Our cutting-edge technology analyzes your resume and optimizes it to align perfectly with your target job, helping you stand out in the competitive job market.
                    </div>
                    <div className='flex justify-center m-8'>
                        <button className="btn btn-info">Try it out [its Free]</button>
                    </div>
                </div>

            </div>


            <div className="flex-1/3 justify-center m-10 h-150 ">
                <AnimatedContent
                    distance={200}
                    direction="vertical"
                    reverse={false}
                    duration={2}
                    ease="bounce.out"
                    initialOpacity={0.2}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0}
                >
                    <img src={hero_resume} alt="sdfas" />
                </AnimatedContent>
            </div>
        </div>
        <HowItWorks />
        </>

    )
}
