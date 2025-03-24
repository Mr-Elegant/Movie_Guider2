import {useEffect} from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {


  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-10">
      <h1 className=" text-2xl text-white font-bold">
        <i className="text-[#F56009] ri-tv-fill mr-2"></i>
        <span className="text-2xl text-[#F56009]"> Movie Guider 2 </span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link to="/trending" className="hover:bg-[#F56009] hover:text-white hover:font-bold duration-300 rounded-lg p-5 ">
          {" "}
          <i className="ri-fire-fill text-[#F56009] mr-2 hover:text-[#6556CD]"></i>
          Trending{" "}
        </Link>
        <Link to="/popular" className="hover:bg-[#F56009] hover:text-white duration-300 hover:font-bold rounded-lg p-5 ">
          <i className="text-[#F56009] ri-star-fill mr-2"></i>Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#F56009] hover:text-white duration-300 hover:font-bold rounded-lg p-5 ">
          <i className="text-[#F56009] mr-2 ri-movie-2-fill"></i>Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#F56009] hover:text-white duration-300 hover:font-bold rounded-lg p-5 ">
          <i className="text-[#F56009] mr-2 ri-tv-fill"></i>Tv Shows
        </Link>
        <Link to="/person" className="hover:bg-[#F56009] hover:text-white duration-300 hover:font-bold rounded-lg p-5 ">
          <i className="text-[#F56009] mr-2 ri-group-fill"></i>Actors
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-[#F56009] mt-5" />
      
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          Website Information
        </h1>

        <Link className="hover:bg-[#F56009] hover:text-white hover:font-bold duration-300 rounded-lg p-5 ">
          {" "}
          <i className="ri-information-fill text-[#F56009] mr-2 hover:text-[#6556CD]"></i>
          About.{" "}
        </Link>
        <Link className="hover:bg-[#F56009] hover:text-white duration-300 hover:font-bold rounded-lg p-5 ">
          <i className="text-[#F56009] ri-phone-fill mr-2"></i>Contact Us
        </Link>
       
      </nav>



    </div>
  );
};

export default Sidenav;
