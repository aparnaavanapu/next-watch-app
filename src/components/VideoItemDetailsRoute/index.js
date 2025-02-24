import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import { formatDistanceToNow } from 'date-fns';
import {ThreeDots} from 'react-loader-spinner'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import VideoPlayer from '../VideoPlayer'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RiPlayListAddLine } from "react-icons/ri";
import ThemeContext from '../../context/ThemeContext'

const apiStatus={
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    loading:'LOADING'
}
const VideoItemDetails=()=>{
    const {id}=useParams()
    const [videoDetails,setVideoDetails]=useState(null)
    const [status,setStatus]=useState(apiStatus.initial)
    const [likeStatus,setLikeStatus]=useState(false)
    const [disLikeStatus,setDisLikeStatus]=useState(false)
    const [isSaved,setIsSaved]=useState(false)
    





    const handleLikeClick = () => {
        setLikeStatus(!likeStatus);
        setDisLikeStatus(false) 
    };

    const handleDislikeClick=()=>{

        setDisLikeStatus(!disLikeStatus)
        setLikeStatus(false)

    }

    

    const getVideoDetails=async()=>{
        setStatus(apiStatus.loading)
        const jwtToken=Cookies.get('jwt_token')
        const url=`https://apis.ccbp.in/videos/${id}`;
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
            const formattedData= {
            id: data.video_details.id,
            title: data.video_details.title,
            videoUrl: data.video_details.video_url,
            thumbnailUrl: data.video_details.thumbnail_url,
            channel: data.video_details.channel,
            viewCount: data.video_details.view_count,
            publishedAt: data.video_details.published_at,
            description: data.video_details.description,
            }


            setVideoDetails(formattedData)
            setStatus(apiStatus.success)
        }
        catch (error) {
            console.error("API Fetch Error:", error) // ✅ Logs error in console
            setStatus(apiStatus.failure) // ✅ Sets status to FAILURE
        }
        
    }

    useEffect(()=>{
        getVideoDetails()
    },[id])




    return (
        <ThemeContext.Consumer>
            {value => {
                const { isDarkTheme,addVideo} = value;
    
                const videoDetailsBg = isDarkTheme ? "bg-[#000000]" : "bg-[#f4f4f4]";
                const textColor = isDarkTheme ? "text-[#ffffff]" : "text-[#0f0f0f]";
                const descrptionColor = isDarkTheme ? "text-[#ffffff]" : "text-[#0f0f0f]";
                const failureViewImg = isDarkTheme
                    ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                    : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";


                  
                     const handleAddVideo=(videoDetails)=>{
                        
                        addVideo(videoDetails)
                        setIsSaved(!isSaved)
                        

                    }
    
                const renderVideoDetails = () => (
                    <div className={`${videoDetailsBg} w-full h-full p-4 m-0`}>
                        <VideoPlayer videoUrl={videoDetails.videoUrl} />
    
                        <p className={`${textColor} text-lg sm:text-xl font-semibold mt-3`}>
                            {videoDetails.title}
                        </p>
    
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 mb-4">
                            <div className="flex items-center text-sm sm:text-md">
                                <p className="text-[#475569]">{videoDetails.viewCount} views</p>
                                <span className="mr-2 ml-2 text-[#475569]">•</span>
                                <p className="text-[#475569]">
                                    {formatDistanceToNow(new Date(videoDetails.publishedAt), { addSuffix: true })}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                                <div className={`flex items-center ${likeStatus ? 'text-blue-500' : 'text-[#475569]'} cursor-pointer`} onClick={handleLikeClick}>
                                    <AiOutlineLike className="text-xl" />
                                    <p className="ml-2">Like</p>
                                </div>
                                <div className={`flex items-center ${disLikeStatus ? 'text-blue-500' : 'text-[#475569]'} cursor-pointer`} onClick={handleDislikeClick}>
                                    <AiOutlineDislike className="text-xl" />
                                    <p className="ml-2">Dislike</p>
                                </div>
                                <div className={`flex items-center ${isSaved ? 'text-blue-500' : 'text-[#475569]'} cursor-pointer`} onClick={() => handleAddVideo(videoDetails)}>
                                    <RiPlayListAddLine className="text-md" />
                                    <p className="ml-2">Save</p>
                                </div>
                            </div>
                        </div>
                        <hr className="border-[#000000] w-full" />
    
                        <div className="flex items-start mt-3">
                            <img
                                src={videoDetails.channel.profile_image_url}
                                alt={videoDetails.channel.name}
                                className="w-10 h-10"
                            />
                            <div className="flex flex-col justify-start ml-3">
                                <p className={`${textColor} text-md font-semibold`}>
                                    {videoDetails.channel.name}
                                </p>
                                <p className="text-[#475569] text-sm">
                                    {videoDetails.channel.subscriber_count} Subscribers
                                </p>
                                <p className={`${descrptionColor} text-md mt-5`}>
                                    {videoDetails.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
    
                const failureView = () => (
                    <div className={`${videoDetailsBg} flex flex-col items-center justify-center w-full h-full`}>
                        <img src={failureViewImg} alt="failure-view" className="w-[30%] sm:[70%] mb-2" />
                        <p className={` text-2xl font-bold ${textColor} mt-2`}>Oops! Something Went Wrong</p>
                        <p className="text-[#475569] text-md font-semibold mt-2">We are having some trouble completing your request.</p>
                        <p className="text-[#475569] text-md font-semibold mt-2">Please Try again.</p>
                        <button className="bg-[#4f46e5] border border-none rounded-sm text-[#ffffff] w-[130px] h-[30px] mt-2">
                            Retry
                        </button>
                    </div>
                );
    
                const loadingView = () => (
                    <div className={`${videoDetailsBg} flex justify-center items-center w-full h-full`}>
                        <ThreeDots color="#4f46e5" height={80} width={80} />
                    </div>
                );
    
                const renderContent = () => {
                    switch (status) {
                        case apiStatus.loading:
                            return loadingView();
                        case apiStatus.success:
                            return renderVideoDetails();
                        case apiStatus.failure:
                            return failureView();
                        default:
                            return null;
                    }
                };
    
                return (
                    <div className="h-screen w-screen flex flex-col overflow-hidden box-border">
                        {/* Fixed Navbar at the top */}
                        <Navbar className="fixed top-0 left-0 w-full h-[10vh] z-10" />
    
                        {/* Sidebar and Main Content Wrapper */}
                        <div className="flex flex-1 pt-[10vh] overflow-hidden">
                            {/* Sidebar (fixed) */}
                            <div className="hidden sm:block">
                            <Sidebar className="fixed left-0 top-[10vh] h-[90vh] w-[250px] bg-gray-800" />
                            </div>
    
                            {/* Main Content (fills remaining space) */}
                            <div className="w-full md:ml-[250px] sm:w-[calc(100%-250px)] h-full overflow-auto p-0">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                );
            }}
        </ThemeContext.Consumer>
    );
    


    
}

export default VideoItemDetails