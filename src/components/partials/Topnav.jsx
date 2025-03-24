import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import noimage2 from "/no-image2.jpg"

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative mx-auto flex items-center rounded-lg">
      <i className="hover:text-[#F56009] text-3xl ri-search-line "></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-10 p-5 text-xl text-zinc-200 outline-none rounded-lg border-none bg-transparent"
        type="text"
        placeholder="Search"
      />

      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className=" hover:text-[#F56009] text-zinc-300 text-3xl ri-close-fill right-0"
        ></i>
      )}

      <div className="z-[100] w-[100%] absolute max-h-[50vh] bg-[#141519] top-[100%] left-[5%] overflow-auto rounded">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-zinc-300 hover:bg-[#3d424f] duration-300 font-semibold text-zinc-400 w-[100%] p-10 flex justify-start items-center"
          >
            <img
              src={s.backdrop_path || s.profile_path || s.poster_path || s.images ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path || s.poster_path || s.images}` : noimage2}
              alt=""
              className="w-[10vh] h-[10vh] object-cover rounded-lg mr-5 shadow-lg"

            />
            <span>
              {s.original_title || s.name || s.original_name || s.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
