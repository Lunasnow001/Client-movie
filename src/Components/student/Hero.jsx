import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-7 bg-gradient-to-b from-cyan-100/70 px-7 md:px-0 pt-20 md:pt-36 w-full text-center">
      <h1 className="relative mx-auto max-w-3xl font-bold text-gray-800 text-home-heading-small md:text-home-heading-large">
        Empower your future with the courses designed to
        <span className="text-orange-400"> fit your choice. </span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block right-0 -bottom-7 absolute hidden"
        />
      </h1>
      <p className="md:block hidden mx-auto max-w-2xl text-gray-500">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <p className="md:hidden mx-auto max-w-sm text-gray-500">
        We bring together world-class instructors to help you achieve your
        professional goals. 
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
