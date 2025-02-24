import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import { formatDistanceToNow } from 'date-fns';
import {useNavigate} from 'react-router-dom'
import { HiFire } from "react-icons/hi";
import ThemeContext from '../../context/ThemeContext'




const apiStatus={
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    loading:'LOADING'
}

const TrendingRoute=()=>{

    const [status,setStatus]=useState(apiStatus.initial)
    const [trendingVideosList,setTrendingVideosList]=useState([])
    const navigate=useNavigate()



const getTrendingVideos=async()=>{
    setStatus(apiStatus.loading)
    const jwtToken=Cookies.get('jwt_token')
    const url="https://apis.ccbp.in/videos/trending"
    const options={
        headers:{
            Authorization:`Bearer ${jwtToken}`
        },
        method:'GET'
    };
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Failed to fetch trending videos") // ❌ Forces failure case
        }

        const data = await response.json();
        const formattedData = data.videos.map(eachItem => ({
            id: eachItem.id,
            title: eachItem.title,
            thumbnailUrl: eachItem.thumbnail_url,
            channel: eachItem.channel,
            viewCount: eachItem.view_count,
            publishedAt: eachItem.published_at
        }))
        
        setTrendingVideosList(formattedData)
        setStatus(apiStatus.success)
    } catch (error) {
        console.error("API Fetch Error:", error) // ✅ Logs error in console
        setStatus(apiStatus.failure) // ✅ Sets status to FAILURE
    }
}

useEffect(()=>{
    getTrendingVideos();
},[])

const handleRetry = () => {
    getTrendingVideos();
};

const openVideoItem=(id)=>{
    navigate(`/videos/${id}`)
}


   return(
    <ThemeContext.Consumer>

    {value=>{
        const {isDarkTheme}=value

        const trendingRouteBg=isDarkTheme?"bg-[#000000]" : "bg-[#f4f4f4]";
        const logoBg=isDarkTheme?"bg-[#383838]":"bg-[#d7dfe9]";
        const textColor=isDarkTheme?"text-[#ffffff]":"text-[#0f0f0f]";
        const trendingHead=isDarkTheme?"bg-[#181818]":"bg-[#f4f4f4]";
        const failureViewImg=isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";

const failureView=()=>{
    return(
        <div className={`${trendingRouteBg} flex flex-col items-center justify-center w-full h-screen`}>
            <img src={failureViewImg} alt="failure-view" className="w-[30%] mb-2 sm:[70%]" />
            <p className={` text-2xl font-bold ${textColor} mt-2`}>Oops! Something Went Wrong</p>
            <p className="text-[#475569] text-md font-semibold mt-2">We are having some trouble completing your request.</p>
            <p className="text-[#475569] text-md font-semibold mt-2">Please Try again.</p>
            <button className="bg-[#4f46e5] border border-none rounded-sm text-[#ffffff] w-[100px] h-[40px] mt-4" onClick={handleRetry}>Retry</button>
        </div>
    )
}

const loadingView=()=>{
    return(
                <div className={`${trendingRouteBg} flex justify-center items-center w-full h-screen`}>
                    <ThreeDots color="#4f46e5" height={80} width={80} /> 
                </div>
            )

}
const successView=()=>{

    return(
        <div className={`${trendingRouteBg} w-full`}>
            <div className={`${trendingHead} p-4 flex items-center w-full m-0 mb-3`}>
                                <div className={`${logoBg} rounded-full p-3 flex items-center justify-center mr-3`}>
                                <HiFire className="text-[#ff0000] text-2xl"/>
                                </div>
                                <p className={`${textColor} text-3xl font-bold text-[#212121]`}>Trending</p>
            </div>
            <div>
            {trendingVideosList.map(eachItem=>(
                <div key={eachItem.id} onClick={()=>openVideoItem(eachItem.id)} className="flex flex-row items-start p-4">
                    <img src={eachItem.thumbnailUrl} alt={eachItem.title} className="w-[40%] sm:w-[30%] md:w-[25%] lg:w-[20%] rounded-lg" />
                    <div className="p-2 mt-2 ml-4 flex-1">
                        <p className={` ${textColor} text-lg sm:text-xl font-semibold`}>{eachItem.title}</p>
                        <p className="text-sm sm:text-md text-[#475569] mt-1">{eachItem.channel.name}</p>
                        <div className="flex text-sm sm:text-md text-[#475569] mt-1 items-center">
                            <p className="text-[#475569]">{eachItem.viewCount} views</p>
                            <span className="mr-2 ml-2 text-[#212121]">•</span>
                            <p className="text-[#475569]">{formatDistanceToNow(new Date(eachItem.publishedAt), { addSuffix: true })}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}


const renderTrendingRoute=()=>{
    switch(status){
     case apiStatus.loading:
         return loadingView();
     case apiStatus.success:
         return successView();
     case apiStatus.failure:
         return failureView();
     default:
        return null;
    }
 }


     return(
        <div>
            <Navbar/>
            <div className="flex mt-[10vh]">
                <div className="hidden sm:block">
                <Sidebar/>
                </div>
                <div className="w-full sm:w-[calc(100%-250px)] md:ml-[250px] overflow-auto">{renderTrendingRoute()}</div>
               
            </div>

        </div>
     )
    }}

</ThemeContext.Consumer>
   )


    
    


        


    

    

}

export default TrendingRoute