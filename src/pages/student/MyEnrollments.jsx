/* eslint-disable no-unused-vars */
// import React from 'react'

import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from 'rc-progress';
import Footer from "../../Components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);

  return (
    <>
      <div className="px-8 md:px-36 pt-10">
        <h1 className="font-semibold text-2xl">My Enrollments</h1>
        <table className="md:table-auto table-fixed mt-10 border w-full overflow-hidden">
          <thead className="border-gray-500/20 max-sm:hidden border-b text-gray-900 text-left text-sm">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-gray-500/20 border-b">
                <td className="flex items-center space-x-3 md:px-4 py-3 pl-2 md:pl-4">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100 ) / progressArray[index].totalLectures : 0 } className="bg-gray-300 rounded-full" />
                  </div>
                </td>
                <td className="max-sm:hidden px-4 py-3">
                  {calculateCourseDuration(course)}
                </td>
                <td className="max-sm:hidden px-4 py-3">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}{" "}
                  <span>Lectures</span>
                </td>
                <td className="max-sm:text-right px-4 py-3">
                  <button className="bg-orange-400 px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-white max-sm:text-xs" onClick={() => navigate('/player/' + course._id)}>
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalLectures === 1
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
