/* eslint-disable react/prop-types */
// import React from 'react'

import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";


const CourseCard = ({ course }) => {

  const { currency, calculateRating } = useContext(AppContext)

  return (
    <Link to={'/course/' + course._id} onClick={()=> scrollTo(0,0,)} className="border-gray-500/30 pb-6 border rounded-lg overflow-hidden">
      <img className="w-full" src={course.courseThumbnail} alt="" />
      <div className="p-3 text-left">
        <h3 className="font-semibold text-base">{course.courseTitle}</h3>
        <p className="text-gray-500">Bz sketch</p> 
        {/* {course.educator.name} */}
        <div className="flex items-center space-x-2">
          <p>
            {calculateRating(course)}
          </p>
          <div className="flex">
            {[...Array(5)].map((_, i)=>(<img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt="" className="w-3.5 h-3.5"/>
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="font-semibold text-base text-gray-800">{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
