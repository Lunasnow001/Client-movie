// import React from 'react'
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      {/* <img
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      /> */}
      <h1
        onClick={() => navigate("/")}
        className="font-bold text-4xl text-gray-500 cursor-pointer"
      >
        <span className="text-orange-400">Bz </span>Sketch
      </h1>
      <div className="md:flex items-center gap-5 hidden text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={()=> {navigate('/educator')}}>{isEducator ? 'Bzsketch Dashboard': 'Become Bzsketch'}</button> |
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-orange-400 px-5 py-2 rounded-full text-white"
          >
            Create Account
          </button>
        )}
      </div>
      {/* For Phone Screens */}
      <div className="flex items-center gap-2 sm:gap-5 md:hidden text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={()=> {navigate('/educator')}}>{isEducator ? 'Bzsketch Dashboard': 'Become Bzsketch'}</button> |
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
