import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadtv, removetv } from '../store/actions/tvActions';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';



const TvDetails = () => {

  const {pathname} = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
  
    // bringing data from redux (by using useSelector hook then from state.tv (from tv reducer))
    const {info} = useSelector((state) => state.tv)
    const dispatch  = useDispatch();
  
  
    // console.log("info: ",info)
  
    useEffect(()=> {
      dispatch(asyncloadtv(id))
  
      return () => {
        // cleanup
        dispatch(removetv())
      }
    },[id])


  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)) ,
              url(https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path ||
                info.detail.poster_path
              })`,         
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
        }}
      className='relative w-screen h-[200vh] px-[10%]'>

              {/* navigation part 1 */}
        <nav className="h-[10vh] w-full text-[#fff7ed] flex items-center gap-10 text-xl">
            <Link title='Previous page' onClick={() => navigate(-1)} className="ri-arrow-left-line  hover:text-[#F56009]"></Link>
            <a title='Wikipedia link' target='blank' href={`https://wikidata.org/wiki/${info.externalid.wikidata_id} `} >
              <i className='ri-earth-fill hover:text-[#F56009] '></i>
            </a>
            <a title={`${info.detail.original_title} Offical Website`} target='blank' href={info.detail.homepage} >
              <i className='ri-external-link-fill  hover:text-[#F56009]'></i>
            </a>
            <a title='imdb link' target='blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
              <i className='ri-database-2-fill hover:text-[#F56009]'></i>
            </a>
            
        </nav>

        
              {/* { p2 poster and details} */}
        <div className="w-full flex text-white">
          <img className='h-[50vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${ info.detail.poster_path || info.detail.backdrop_path }`} alt=''  />

          <div className='content ml-[5%]'>

            <h1 className='text-5xl font-black text-white '>{info.detail.name || info.detail.title || info.detail.original_title || info.detail.original_name} <small className='text-2xl font-bold text-zinc-200'>({info.detail.first_air_date.split("-")[0] })</small>
            </h1>

            <div className='mt-3 mb-5 flex items-center gap-x-3 '>
              <span className='text-white right-[-10%] botton-[30%] rounded-full text-xl font-semibold bg-[#fe9739] w-[5vh] h-[5vh] flex justify-center items-center'>
                    {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
              <h1 className='w-[60px] font-semibold text-2xl leading-6'>User Score</h1>
              <h1>{info.detail.first_air_date }</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>

            <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>

            <h1 className='text-2xl mt-5 font-semibold'>Overview:</h1>
            <p className=''>{info.detail.overview}</p>

            <h1 className='text-2xl  mt-5 font-semibold'>Languages:</h1>
            <p className='mb-10'>{info.translations.join(", ")}</p>


            <Link className='p-5 bg-[#F56009] rounded-full' to={`${pathname}/trailer`} ><i className="ri-play-fill text-xl mr-3 "></i>Watch Trailer</Link>



          </div>




        </div>


              {/* { p3 - Plateforms to watch} */}
        <div className='w-[80%] flex flex-col gap-y-5 mt-10'>        

            {info.watchproviders && info.watchproviders.flatrate && (
              <div className='flex gap-x-10 items-center text-white'>
                <h1>Available on Plateforms</h1>
                {info.watchproviders.flatrate.map((w,i)=> (
                  <img title={w.provider_name} key={i} className='w-[5vh] h-[5vh] object-cover rounded-md'  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=''  />
                ))}
              </div>
            )}

           
            {info.watchproviders && info.watchproviders.rent && (
              <div className='flex gap-x-10 items-center text-white'>
                <h1>Available on Rent</h1>
                {info.watchproviders.rent.map((w,i)=> (
                  <img title={w.provider_name} key={i} className='w-[5vh] h-[5vh] object-cover rounded-md'  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=''  />
                ))}
              </div>
            )}

           
            {info.watchproviders && info.watchproviders.buy && (
              <div className='flex gap-x-10 items-center text-white'>
                <h1>Available to Buy</h1>
                {info.watchproviders.buy.map((w,i)=> (
                  <img title={w.provider_name} key={i} className='w-[5vh] h-[5vh] object-cover rounded-md'  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt=''  />
                ))}
              </div>
            )}        

        </div>




              {/* p4 - seasons */}
              {/* {console.log("hello",info.similar)} */}
        <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />    
        <h1 className='text-3xl font-bold text-white'>Seasons </h1>      
        {/* <HorizontalCards data={info.detail.seasons}   /> */}
        

        <div className='w-[100%] flex overflow-y-hidden mb-5 p-5'>
            { info.detail.seasons.map((s, i) => (
              <div className='w-[15vh] mr-[8%]'>
                  <img key={i} className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[14vw] h-[30vh] object-cover' src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} alt=''  />

                  <h1 className='text-2xl text-zinc-300 mt-3 font-semibold hover:text-[#F56009]'>{s.name}
                    {info.detail.vote_average && ( <small className=' pl-2 text-[#fe9739]'>{info.detail.vote_average.toFixed(1)}<i className="text-[#fe9739] pl-1 ri-star-fill text-xm"></i></small>) }
                  </h1>
              </div>)
            )
          }
            
        </div>



         


              {/* p5 - Recommendatons */}
              {/* {console.log("hello",info.similar)} */}
        <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />    
        <h1 className='text-3xl font-bold text-white'>tv Recommendations & Similar tvs </h1>      
        <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar}   />
        <Outlet />  





          


  

    </div>
  ) : (
    <Loading />
  )
}

export default TvDetails