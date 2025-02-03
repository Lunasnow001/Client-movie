/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../Components/student/Footer";
import Rating from "../../Components/student/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-2 md:px-36 p-4 sm:p-10">
        {/* Left Col */}
        <div className="text-gray-800">
          <h2 className="font-semibold text-xl">Course Structure</h2>
          <div className="pt-5">
            {courseData && courseData.courseContent.map((chapter, index) => (
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
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          alt="play icon"
                          className="mt-1 w-4 h-4"
                        />
                        <div className="flex justify-between items-center w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() => setPlayerData({
                                  ...lecture, chapter: index + 1, lecture: i + 1
                                })}
                                className="text-blue-500 cursor-pointer"
                              >
                                Watch
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

            <div className="flex items-center gap-2 mt-10 py-3">
              <h1 className="font-bold text-xl">Rate this Course: </h1>
              <Rating initialRating={0}/>
            </div>

        </div>

        {/* Right Col */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="w-full aspect-video" />
              <div className="flex justify-between items-center mt-1">
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className="text-blue-600">{false ? 'Completed' : 'Mark Complete'}</button>
              </div>
            </div>
          ) :
          <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
        }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
