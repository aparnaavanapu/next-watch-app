import {ThreeDots} from 'react-loader-spinner'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import { SiYoutubegaming } from "react-icons/si";
import {useNavigate} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'


const apiStatus={
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    loading:'LOADING'
}


const GamingRoute =()=>{
    const [status,setStatus]=useState(apiStatus.initial)
    const [gamingVideosList,setGamingVideosList]=useState([])
    const navigate=useNavigate()


    

    const getGamingVideos=async()=>{
        setStatus(apiStatus.loading)
        const jwtToken=Cookies.get('jwt_token')
        const url="https://apis.ccbp.in/videos/gaming"
        const options={
            headers:{
                Authorization:`Bearer ${jwtToken}`
            },
            method:'GET'
        }
        try{
            const response=await fetch(url,options)

            if (!response.ok) {
                throw new Error("Failed to fetch trending videos") // ❌ Forces failure case
            }
        
            const data=await response.json()
            const formattedData=data.videos.map(eachItem=>({
                id:eachItem.id,
                title:eachItem.title,
                thumbnailUrl:eachItem.thumbnail_url,
                viewCount:eachItem.view_count
            }))
            setGamingVideosList(formattedData)
            setStatus(apiStatus.success)
        }
        catch (error) {
            console.error("API Fetch Error:", error) // ✅ Logs error in console
            setStatus(apiStatus.failure) // ✅ Sets status to FAILURE
        }
        
    }

    useEffect(()=>{
        getGamingVideos()
    },[])


    const openVideoItem=(id)=>{
        navigate(`/videos/${id}`)

    }

    const handleRetry=()=>{
        getGamingVideos()
    }


    return(

        <ThemeContext.Consumer>

        {value=>{
            const {isDarkTheme}=value
            
            const gamingBg=isDarkTheme?"bg-[#000000]" : "bg-[#f4f4f4]";
            const logoBg=isDarkTheme?"bg-[#383838]":"bg-[#d7dfe9]";
            const textColor=isDarkTheme?"text-[#ffffff]":"text-[#0f0f0f]";
            const gamingHead=isDarkTheme?"bg-[#181818]":"bg-[#f4f4f4]";
            const failureViewImg=isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";

            const failureView=()=>{
                return(
                    <div className={`flex flex-col items-center justify-center w-full h-screen ${gamingBg} `}>
                        <img src={failureViewImg} alt="failure-view" className="w-[30%] sm:[70%] mb-2" />
                        <p className={` text-2xl font-bold ${textColor} mt-2`}>Oops! Something Went Wrong</p>
                        <p className="text-[#475569] text-md font-semibold mt-2">We are having some trouble completing your request.</p>
                        <p className="text-[#475569] text-md font-semibold mt-2">Please Try again.</p>
                        <button className="bg-[#4f46e5] border border-none rounded-sm text-[#ffffff] w-[130px] h-[30px] mt-4" onClick={handleRetry}>Retry</button>
                    </div>
                )
            }
            
            const loadingView=()=>{
                return(
                            <div className={`flex justify-center items-center ${gamingBg} w-full h-screen`}>
                                <ThreeDots color="#4f46e5" height={80} width={80} /> 
                            </div>
                        )
        
            }
        
            const successView=()=>{
                return(
                    <div className={` ${gamingBg} w-full`}>
                        <div className={`${gamingHead} p-4 flex items-center m-0 mb-3`}>
                            <div className={`${logoBg} rounded-full p-3 flex items-center justify-center mr-3`}>
                                <SiYoutubegaming className="text-[#ff0000] text-2xl"/>
                            </div>
                            <p className={`text-3xl font-bold ${textColor}`}>Gaming</p>
                        </div>
                        <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {gamingVideosList.map(eachItem=>(
                                <div onClick={() => openVideoItem(eachItem.id)} key={eachItem.id} className="cursor-pointer hover:opacity-80">
                                    <img src={eachItem.thumbnailUrl} alt={eachItem.title} className="w-10 rounded-lg w-full" />
                                    <p className={`${textColor} text-sm sm:text-md font-medium mt-2`}>{eachItem.title}</p>
                                    <p className="text-[#475569] text-sm mt-2">{eachItem.viewCount} Watching Worldwide</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        
            const renderGamingVideos=()=>{
                console.log("Current API Status:", status);
        
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
                        <div className="w-full sm:w-[calc(100%-250px)] md:ml-[250px] overflow-auto">
                            {renderGamingVideos()}
                        </div>
                    </div>
                </div>
            )
        
        
        }}


    </ThemeContext.Consumer>
    )

    
}


export default GamingRoute