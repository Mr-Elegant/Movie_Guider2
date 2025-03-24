import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';

const PersonDetails = () => {

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    // bringing data from redux (by using useSelector hook then from state.person (from person reducer))
    const {info} = useSelector((state) => state.person)
    const dispatch  = useDispatch();

    const [category, setcategory] = useState("movie");
    

    
  
  
    // console.log("info: ",info)
  
    useEffect(()=> {
      dispatch(asyncloadperson(id))
  
      return () => {
        // cleanup
        dispatch(removeperson())
      }
    },[id])
  

    return info ? ( 
      <div className='px-[10%] w-screen bg-[#000000] h-[200vh]'>

              {/* navigation part 1 */}
        <nav className="h-[10vh] w-full text-[#fff7ed] flex items-center gap-10 text-xl">
            <Link title='Previous page' onClick={() => navigate(-1)} className="ri-arrow-left-line  hover:text-[#F56009]"></Link>
                 
        </nav>


        <div className='w-full flex'>
                {/*  p2 - left poster and details  */}
            <div className="w-[20%]">
                <img className='h-[35vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${ info.detail.profile_path || info.detail.backdrop_path }`} alt=''  />
                <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />    
                              {/* Social media links                  */}
                <div className='text-2xl text-white flex gap-x-5 '>
                     <a title='Wikipedia Profile' target='blank' href={`https://wikidata.org/wiki/${info.externalid.wikidata_id}`} >
                      <i className='ri-earth-fill hover:text-[#6d6d6d] '></i>
                     </a>
                     <a title='Facebook Profile' target='blank' href={`https://facebook.com/${info.externalid.facebook_id}`} >
                      <i className='ri-facebook-circle-fill hover:text-[#0866FF] '></i>
                     </a>
                     <a title='Instagram Profile' target='blank' href={`https://instagram.com/${info.externalid.instagram_id}`} >
                      <i className='ri-instagram-fill hover:text-[#fd3fca] '></i>
                     </a>
                     <a title='X (twitter) Profile' target='blank' href={`https://x.com/${info.externalid.twitter_id}`} >
                      <i className='ri-twitter-x-line hover:text-[#b0b0b0] '></i>
                     </a>       
                </div>
                              {/*  Personal Details                  */}
                <h1 className='text-2xl text-white font-semibold my-5'>Personal Info :</h1>         

                <div className='text-lg flex items-center gap-2'>
                <h1 className='text-white font-semibold'>Work :</h1>              
                <h1 className='text-zinc-400 '>{"  "}{info.detail.known_for_department}</h1>              
                </div>

                <div className='text-lg flex items-center gap-2'>
                <h1 className='text-white font-semibold '>Gender : </h1>              
                <h1 className=' text-zinc-400 '>{info.detail.gender === 2 ? "Male" : "Female"}</h1>              
                </div>
                
                <h1 className='text-lg text-white font-semibold '>Born & Place: </h1>              
                <h1 className=' text-zinc-400 '>{info.detail.birthday}, {info.detail.place_of_birth}</h1>              
                                  
                <h1 className='text-lg text-white font-semibold '>Death-day:</h1>              
                <h1 className=' text-zinc-400 '>{info.detail.deathday ? info.detail.deathday : "Alive and Kickin😎"}</h1>

                <h1 className='text-lg text-white font-semibold '>AKA:</h1>              
                <h1 className=' text-zinc-400 '>{info.detail.also_known_as.join(",")}</h1>              



            </div>


                {/* p3 right Details and information */}
            <div className="w-[80%] ml-[5%]">
                <h1 className='text-2xl text-white font-black my-5'>{info.detail.name}</h1>         
               
                <h1 className='text-xl text-zinc-300 font-semibold'>Biography :</h1>              
                <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>

                <HorizontalCards data={info.combinedCredits.cast}  />        

                <div className='w-full flex justify-between'>
                  <h1 className='mt-5 text-xl text-zinc-400 font-semibold'>
                    Movies List :
                  </h1>

                  <Dropdown title="category" options={["tv", "movie"]} func={(e)=> setcategory(e.target.value)}  />
                </div>       

                <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[#ffbe72] border-2 border-zinc-700 p-5">

                      {info[category + "Credits"].cast.map((c,i)=> (
                        <li key={i} className='hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer'>
                          <Link to={`/${category}/details/${c.id}`} className=''>
                              <span>{c.name || c.title || c.original_title || c.original_name}</span>
        
                              <span className='block ml-5'>{c.character && `Charcter Name: ${c.character}`}</span>  
                          </Link>
                        </li> 
                      ))}

                    
                </div>   


                
            </div>



        </div>





{/* 
        <a title='Wikipedia link' target='blank' href={`https://wikidata.org/wiki/${info.externalid.wikidata_id} `} >
          <i className='ri-earth-fill hover:text-[#F56009] '></i>
        </a>
        <a title={`${info.detail.original_title} Offical Website`} target='blank' href={info.detail.homepage} >
          <i className='ri-external-link-fill  hover:text-[#F56009]'></i>
        </a>
        <a title='imdb link' target='blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
          <i className='ri-database-2-fill hover:text-[#F56009]'></i>
        </a>
 */}




      </div>
    ): <Loading />
}

export default PersonDetails