/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch All Courses
  const fetchAllcourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  const calculateCourseDuration = (courseData) => {
    const totalDuration = courseData.courseContent.reduce(
      (acc, chapter) =>
        acc +
        chapter.chapterContent.reduce(
          (acc, lecture) => acc + lecture.lectureDuration,

          0
        ),
      0
    );

    return humanizeDuration(totalDuration * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (courseData) => {
    return courseData.courseContent.reduce(
      (acc, chapter) => acc + chapter.chapterContent.length,
      0
    );
  };

  // Fetch User Enrolled Courses
  const fetchUserEnrolledCourses = async ()=> {
    setEnrolledCourses(dummyCourses)
  }

  const calculateChapterTime = (chapter) => {
    const totalDuration = chapter.chapterContent.reduce(
      (acc, lecture) => acc + lecture.lectureDuration,
      0
    );
    return humanizeDuration(totalDuration * 60 * 1000, { units: ["h", "m"] });
  };


  useEffect(() => {
    fetchAllcourses();
    fetchUserEnrolledCourses();
  }, []);


  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    fetchUserEnrolledCourses,
    enrolledCourses,
    humanizeDuration,
    isEducator,
    setIsEducator,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
