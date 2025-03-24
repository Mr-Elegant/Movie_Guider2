import { useEffect, useState }from 'react'
import { useNavigate} from 'react-router-dom'
import Topnav from "./partials/Topnav"
import Dropdown from "./partials/Dropdown"
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './partials/Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {

    const navigate = useNavigate()
    const goToHome = () => {
      navigate("/");
    };

    const [category, setcategory] = useState("all");
    // state for upload time duration
    const [duration, setduration] = useState("day")
    const [trending, settrending] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    document.title = "Movie Guider 2 - Trending: "+ category.toLocaleUpperCase() 


    const GetTrending = async () => {
      try {
        const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
        
        // settrending(data.results);
    // console.log("trending data", data)

        if(data.results.length > 0){
          settrending((prevState)=> [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
            sethasMore(false);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };



    const refereshHandler =  () => {
        if(trending.length === 0) {
          GetTrending();
        } else {
          setpage(1);
          settrending([])
          GetTrending()
        }
    }
    

    useEffect(()=> {
      // GetTrending()
      refereshHandler();
    },[category,duration])
    
   


  return trending.length > 0 ? (
    <div className="w-screen h-screen ">

      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl text-white font-semibold ">
           
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-[#fff7ed] hover:text-[#F56009]"></i>{" "}
          <i onClick={goToHome} className="p-2 ri-home-3-fill text-[#fff7ed] hover:text-[#F56009]"></i>
          Trending
        </h1>

        <div className='flex items-center w-[80%]'>
          <Topnav />

          <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e)=> setcategory(e.target.value)}/>

          <div className="w-[2%]"></div>

          <Dropdown title="Duration" options={["week","day"]}  func={(e)=> setduration(e.target.value)} />
        </div>



      </div>

      <div className='w-full h-[2%] bg-[#1F1E24]'></div>
      <InfiniteScroll
         dataLength={trending.length}
         next={GetTrending} 
         hasMore={hasMore}
      >
          <Cards data={trending} title={category} />

      </InfiniteScroll>



    </div>
  ) : (
    <Loading />
  )
}

export default Trending