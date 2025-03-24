
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';


const Popular = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    document.title = "Movie Guider 2 - Popular: "+ category.toLocaleUpperCase() 


    const GetPopular = async () => {
        try {
          const { data } = await axios.get(`${category}/popular?page=${page}`);
          // console.log("Popular page" ,data)
          // setpopular(data.results);
          if(data.results.length > 0){
            setpopular((prevState)=> [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
              sethasMore(false);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
  
  
      const refereshHandler =  ()=> {
          if(popular.length === 0) {
            GetPopular();
          } else {
            setpage(1);
            setpopular([])
            GetPopular()
          }
      }
      
  
      useEffect(()=> {
        // Getpopular()
        refereshHandler();
      },[category])
      
    
    
    
    return popular.length > 0 ? (
        <div className="w-screen h-screen ">
    
          <div className="px-[5%] w-full flex items-center justify-between">
            <h1 className=" text-2xl text-white font-semibold">
              {" "}
              <i title='Previous Page' onClick={() => navigate(-1)} className="ri-arrow-left-line text-[#fff7ed] hover:text-[#F56009]"></i>{" "}
              <i title='HomePage' onClick={()=> navigate("/")} className="p-2 ri-home-3-fill text-[#fff7ed] hover:text-[#F56009]"></i>
              Popular
            </h1>
    
            <div className='flex items-center w-[80%]'>
              <Topnav />
    
              <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e)=> setcategory(e.target.value)}/>
    
              <div className="w-[2%]"></div>
    
              
            </div>
    
    
    
          </div>
    
          <div className='w-full h-[2%] bg-[#1F1E24]'></div>

          <InfiniteScroll
             dataLength={popular.length}
             next={GetPopular} 
             hasMore={hasMore}
          >
              <Cards data={popular} title={category} />
    
          </InfiniteScroll>
    
    
    
        </div>
      ) : (
        <Loading />
      )
}

export default Popular