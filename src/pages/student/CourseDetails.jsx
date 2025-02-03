/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { useContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../Components/student/Loading";
import Footer from "../../Components/student/Footer";
import { assets } from "../../assets/assets";
import Youtube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    currency,
    calculateCourseDuration,
    calculateNoOfLectures,
    calculateChapterTime,
  } = useContext(AppContext);

  console.log("dsdsdsds", courseData);
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="relative flex md:flex-row flex-col-reverse justify-between items-start gap-10 px-8 md:px-36 pt-20 md:pt-30 text-left">
        <div className="top-0 left-0 -z-1 absolute bg-gradient-to-b from-cyan-100/70 w-full h-section-height"></div>

        {/* Left column */}
        <div className="z-10 max-w-xl text-gray-500">
          <h1 className="font-semibold text-course-deatails-heading-small text-gray-800 md:text-course-deatails-heading-large">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and rating */}
          <div className="flex items-center space-x-2 pt-3 pb">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ( {courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"} )
            </p>
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            Course by{" "}
            <span className="underline underline-offset-4">
              <span className="text-orange-400">Bz</span> Sketch
            </span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="font-semibold text-xl">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border-gray-300 bg-white mb-2 border rounded"
                >
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium text-sm md:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-base">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="border-gray-300 py-2 pr-4 pl-4 md:pl-10 border-t text-gray-600 list-disc">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="mt-1 w-4 h-4"
                          />
                          <div className="flex justify-between items-center w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                onClick={()=> setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()
                                })}
                                className="text-blue-500 cursor-pointer">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-20 text-sm md:text-default">
            <h3 className="font-semibold text-gray-800 text-xl">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* Right column */}
        <div className="z-10 bg-white shadow-custom-card rounded-t md:rounded-none min-w-[300px] sm:min-w-[420px] max-w-course-card overflow-hidden">
          {
              playerData ? 
              <Youtube videoId={playerData.videoId} opts={{playerVars: {autoplay: 1 }}} iframeClassName="w-full aspect-video" />
              :<img src={courseData.courseThumbnail} alt="" />
          }

          <div className="p-5">
            
            <div className="flex items-center gap-2">
               <img className="rounded-full w-3.5" src={assets.time_left_clock_icon} alt="time left clock icon" />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <p className="font-semibold text-2xl text-gray-800 md:text-4xl">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="text-gray-500 md:text-lg line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="text-gray-500 md:text-lg">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2 md:pt-4 text-gray-500 text-sm md:text-default">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="bg-gray-600/40 w-px h-4"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="bg-gray-600/40 w-px h-4"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="clock icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button className="bg-orange-400 mt-4 md:mt-6 py-3 rounded w-full font-medium text-white">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="font-medium text-gray-800 text-lg md:text-lx">
                What&apos;s in the course?
              </p>
              <ul className="ml-4 pt-2 text-gray-500 text-sm md:text-default list-disc">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
