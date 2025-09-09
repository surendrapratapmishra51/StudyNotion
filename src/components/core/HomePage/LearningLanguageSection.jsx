import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"


const LearningLanguageSection = () => {
  return (
    <div className='mt-[80px] mb-32 lg:mt-[110px]'>
     <div className='flex flex-col gap-5 items-center'>
        
        <div className='text-3xl lg:text-4xl font-semibold text-center '>
            Your Swiss Knife for
            <HighlightText text={"learning any language"}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-sm lg:text-md font-medium lg:w-[70%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='mt-5 space-y-[-15%] lg:flex flex-row items-center justify-center lg:space-y-0 '>
        <img 
        src = {know_your_progress}
        alt = "KnowYourProgressImage"
        className='object-contain -mr-32'
        />

         <img 
        src = {compare_with_others}
        alt = "KnowYourProgressImage"
        className='object-contain'
        />

         <img 
        src = {plan_your_lesson}
        alt = "KnowYourProgressImage"
        className='object-contain lg:-ml-36'
        />
        </div>

        <div className='w-fit'>
        <CTAButton active={true} linkto={"/signup"}>
        <div>
            Learn more
        </div>
        </CTAButton>

        </div>

     </div>

    </div>
  )
}

export default LearningLanguageSection