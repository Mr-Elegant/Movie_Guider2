import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';


const TvShows = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    document.title = "tv Guider 2 - Tv Shows: "+ category.toLocaleUpperCase() 


    const GetTv = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}?page=${page}`);
          // console.log("tv page" ,data)
          // settv(data.results);
          if(data.results.length > 0){
            settv((prevState)=> [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
              sethasMore(false);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
  
  
      const refereshHandler =  ()=> {
          if(tv.length === 0) {
            GetTv();
          } else {
            setpage(1);
            settv([])
            GetTv()
          }
      }
      
  
      useEffect(()=> {
        // Gettv()
        refereshHandler();
      },[category])
      
  return (
    tv.length > 0 ? (
        <div className="w-screen h-screen ">
    
          <div className="px-[5%] w-full flex items-center justify-between">
            
            <h1 className=" text-2xl text-white font-semibold hover:text-[#ffeed4]">
              {" "}
              <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-[#fff7ed] hover:text-[#F56009]"></i>{" "}
              Tv: <small className='text-sm text-zinc-600'>{category.toUpperCase()}</small>  
              <i title='HomePage' onClick={()=> navigate("/")} className="p-2 ri-home-3-fill text-[#fff7ed] hover:text-[#F56009]"></i>
            </h1>
    
            <div className='flex items-center w-[80%]'>
              <Topnav />
              <Dropdown title="Category" options={["popular", "top_rated", "on_the_air","airing_today"]} func={(e)=> setcategory(e.target.value)}/>
              <div className="w-[2%]"></div>
            </div>

          </div>


          <div className='w-full h-[2%] bg-[#1F1E24]'></div>
    
          <InfiniteScroll
             dataLength={tv.length}
             next={GetTv} 
             hasMore={hasMore}
          >
              <Cards data={tv} title="tv" />
    
          </InfiniteScroll>
      
        </div>
      ) : (
        <Loading />
      )
    
  )
}

export default TvShows