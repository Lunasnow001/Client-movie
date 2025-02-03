
// import React from 'react'

import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ data }) => {

  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="flex items-center border-gray-500/20 bg-white border rounded w-full max-w-xl h-12 md:h-14"
    >
      <img
        src={assets.search_icon}
        alt="search icon"
        className="px-3 w-10 md:w-auto"
      />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full text-gray-500/80 outline-none"
      />
      <button
        className="bg-orange-400 mx-1 px-7 md:px-10 py-2 md:py-3 rounded text-white"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
