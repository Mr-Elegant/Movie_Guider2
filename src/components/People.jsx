import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './partials/Loading';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

const person = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    document.title = "Movie Guider 2 - Actors "

    const GetPerson = async () => {
        try {
          const { data } = await axios.get(`/person/popular`);
          console.log("person page" ,data)
          // setperson(data.results);
          if(data.results.length > 0){
            setperson((prevState)=> [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
              sethasMore(false);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
  
  
      const refereshHandler =  ()=> {
          if(person.length === 0) {
            GetPerson();
          } else {
            setpage(1);
            setperson([])
            GetPerson()
          }
      }
      
  
      useEffect(()=> {
        // Getperson()
        refereshHandler();
      },[category])


  return person.length > 0 ? (
    <div className="w-screen h-screen ">

      <div className="px-[5%] w-full flex items-center justify-between">
        
        <h1  className=" text-2xl text-white font-semibold hover:text-[#ffeed4]">
          {" "}
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line text-[#fff7ed] hover:text-[#F56009]"></i>{" "}
          <i title='HomePage' onClick={()=> navigate("/")} className="p-2 ri-home-3-fill text-[#fff7ed] hover:text-[#F56009]"></i>
          Popular Actors: 
        </h1>

        <div className='flex items-center w-[80%]'>
        <Topnav />
        <div className="w-[2%]"></div>
       
        </div>
      </div>

      <div className='w-full h-[2%] bg-[#1F1E24]'></div>
      {/* <Cards data={person} title="person" /> */}
      <InfiniteScroll
         dataLength={person.length}
         next={GetPerson} 
        //  hasMore={hasMore}
      >
          <Cards data={person} title="person" />

      </InfiniteScroll>



    </div>
  ) : (
    <Loading />
  )
}

export default person