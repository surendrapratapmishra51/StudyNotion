import React from 'react'
import HighlightText from './HighlightText'
import { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className="relative">
      {/* Explore more section */}
      <div className="">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center my-6 sm:my-8 lg:my-10">
          Unlock the <HighlightText text={"Power of Code"} />
          <p className="text-sm sm:text-base lg:text-lg text-richblack-300 font-semibold mt-2 lg:mt-1">
            Learn to build anything you can imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div
        className="mt-5 flex flex-wrap lg:flex-row rounded-full bg-richblack-800 mb-5 
        border-richblack-100 px-1 py-1 gap-2 lg:gap-0 justify-center"
      >
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setMyCards(element)}
              className={`text-[14px] sm:text-[16px] flex flex-row justify-center items-center gap-2
                ${
                  currentTab === element
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                }
                rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 px-4 sm:px-6 lg:px-7 py-2`}
            >
              {element}
            </div>
          );
        })}
      </div>

      {/* Space for cards only in large screen */}
      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Course Cards */}
      <div
        className="flex flex-wrap justify-center lg:justify-between gap-6 lg:gap-0 w-full 
        lg:absolute lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] 
        text-black mb-7 lg:mb-0 px-3 lg:px-0"
      >
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore