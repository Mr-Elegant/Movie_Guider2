
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';


const Movie = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    document.title = "Movie Guider 2 - Movies: "+ category.toLocaleUpperCase() 


    const GetMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
          // console.log("movie page" ,data)
          // setmovie(data.results);
          if(data.results.length > 0){
            setmovie((prevState)=> [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
              sethasMore(false);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
  
  
      const refereshHandler =  ()=> {
          if(movie.length === 0) {
            GetMovie();
          } else {
            setpage(1);
            setmovie([])
            GetMovie()
          }
      }
      
  
      useEffect(()=> {
        // Getmovie()
        refereshHandler();
      },[category])
      


  return movie.length > 0 ? (
    <div className="w-screen h-screen ">

      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-white font-semibold hover:text-[#ffeed4]">
          {" "}
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-[#fff7ed] hover:text-[#F56009]"></i>{" "}
          <i title='HomePage' onClick={()=> navigate("/")} className="p-2 ri-home-3-fill text-[#fff7ed] hover:text-[#F56009]"></i>
          Movie: <small className='text-sm text-zinc-600'>{category.toUpperCase()}</small>  
        </h1>

        <div className='flex items-center w-[80%]'>
          <Topnav />
          <Dropdown title="Category" options={["popular", "top_rated", "upcoming","now_playing"]} func={(e)=> setcategory(e.target.value)}/>
          <div className="w-[2%]"></div>
        </div>
      </div>


      <div className='w-full h-[2%] bg-[#1F1E24]'></div>
      <InfiniteScroll
         dataLength={movie.length}
         next={GetMovie} 
         hasMore={hasMore}
      >
          <Cards data={movie} title="movie" />

      </InfiniteScroll>



    </div>
  ) : (
    <Loading />
  )
}

export default Movie