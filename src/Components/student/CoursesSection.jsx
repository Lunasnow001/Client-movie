// import React from 'react'

import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)

  return (
    <div className="px-8 md:px-40 py-16">
      <h2 className="font-medium text-3xl text-gray-800">Learn from the best</h2>
      <p className="mt-3 text-gray-500 text-sm md:text-base">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to deliver
        results.
      </p>

      <div className="gap-4 grid grid-cols-auto my-10 md:my-16 px-4 md:px-0">
        {allCourses.slice(0,4).map((course, index)=> <CourseCard key={index} course={course} />)}
      </div>

      <Link to={"/course-list"} onClick={() => scrollTo(0, 0)} className="border-gray-500/30 px-10 py-3 border rounded text-gray-500">
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
