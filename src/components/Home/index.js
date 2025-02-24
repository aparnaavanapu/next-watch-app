import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { IoSearchOutline } from "react-icons/io5";
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import HomeVideoItem from '../HomeVideoItem'
import { RxCross2 } from "react-icons/rx";
import ThemeContext from '../../context/ThemeContext'



const apiStatus={
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    loading:'LOADING'
}

const Home=()=>{
    const [status,setStatus]=useState(apiStatus.initial)
    const [videosList,setVideosList]=useState([])
    const [searchInput,setSearchInput]=useState('')
    const [showBanner,setShowBanner]=useState(true)

    useEffect(()=>{
        getHomeVideos();

    },[])

    const removeBanner=()=>{

        setShowBanner(prevState=>!prevState)
    }

    const renderBanner = () => {
        if (!showBanner) return null;
        
        return (
            
                <div className="bg-cover bg-center flex justify-between items-start p-6 md:p-8 w-full" style={{ backgroundImage: "url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')" }}>
                {/* Left Content */}
                <div className="flex flex-col max-w-md">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="w-28 md:w-32 mb-3"/>
                    <p className="text-gray-900 font-sm text-lg md:text-lg mb-2">Buy Next Watch Premium prepaid plans with UPI</p>
                    <button  className="bg-transparent border border-gray-800 text-gray-800 font-semibold px-4 py-2 hover:bg-gray-800 hover:text-white transition w-[130px] h-10 mt-5">GET IT NOW</button>
                </div>
    
                {/* Close Icon */}
                <button className="text-gray-700 hover:text-gray-900 text-xl md:text-xl" onClick={removeBanner}>
                    <RxCross2 />
                </button>
            </div>
            
        );
    };



    const getHomeVideos=async()=>{
        setStatus(apiStatus.loading);
        const jwtToken=Cookies.get('jwt_token');
        const url=`https://apis.ccbp.in/videos/all?search=${searchInput}`;
        const options={
            headers:{
                Authorization:`Bearer ${jwtToken}`,

            },

            method:'GET'
        };
        try{
            const response=await fetch(url,options);
            if (!response.ok) {
                throw new Error("Failed to fetch trending videos") // ❌ Forces failure case
            }
    
        
            const data=await response.json();
            const formattedData=data.videos.map(eachItem=>({
                id:eachItem.id,
                title:eachItem.title,
                thumbnailUrl:eachItem.thumbnail_url,
                channel:eachItem.channel,
                viewCount:eachItem.view_count,
                publishedAt:eachItem.published_at
                
            }))
            setVideosList(formattedData);
            setStatus(apiStatus.success)
        }
        
        catch (error) {
            console.error("API Fetch Error:", error) // ✅ Logs error in console
            setStatus(apiStatus.failure) // ✅ Sets status to FAILURE
        }
        
    }

    const handleSearch = () => {
        getHomeVideos();
        
    };
    const handleRetry=()=>{
        getHomeVideos();
    }



    return(
        <ThemeContext.Consumer>
            {value=>{
                const {isDarkTheme}=value

                const homeBg=isDarkTheme?"bg-[#000000]" : "bg-[#f4f4f4]";
                const textColor=isDarkTheme?"text-[#ffffff]":"text-[#0f0f0f]";
                const failureViewImg=isDarkTheme?"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";






                const loadingView=()=>{
                    return(
                        <div className={`flex justify-center items-center ${homeBg} w-full`}>
                            <ThreeDots color="#4f46e5" height={80} width={80} /> 
                        </div>
                    )
                }
            
                const failureView=()=>{
                    return(
                        <div className={`flex flex-col justify-center items-center ${homeBg} w-full p-5`}>
                            <img src={failureViewImg} alt="failure-view" className="w-[20%] sm:[70%] mb-2" />
                            <p className={` text-2xl font-bold ${textColor} mt-2`}>Oops! Something Went Wrong</p>
                            <p className="text-[#475569] text-md font-semibold mt-2">We are having some trouble completing your request.</p>
                            <p className="text-[#475569] text-md font-semibold mt-2">Please Try again.</p>
                            <button className="bg-[#4f46e5] border border-none rounded-sm text-[#ffffff] w-[130px] h-[30px] mt-2" onClick={handleRetry}>Retry</button>
                        </div>
                    )
                }
            
                const renderHomeVideos=()=>{
                    switch(status){
                        case apiStatus.loading:
                            return loadingView();
                        case apiStatus.success:
                            if (videosList.length === 0) {
                                return (
                                    <div className="flex flex-col items-center p-2">
                                        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no-videos" className="w-[30%]" />
                                        <p className={`${textColor} text-2xl font-bold mt-2`}>No Search Results Found</p>
                                        <p className="text-[#475569] text-md font-semibold mt-2">Try different keywords or remove the search filter.</p>
                                    </div>
                                );
                            }
                            return (
                                <ul className="flex flex-row flex-wrap">
                                    {videosList.map(eachItem => (
                                        <HomeVideoItem key={eachItem.id} details={eachItem} />
                                    ))}
                                </ul>
                            );
                        case apiStatus.failure:
                            return failureView();
                        default:
                            return null;
                    }
                }
            
                return(
                    <div className="h-screen w-screen">
                        <Navbar/>
                    <div className="flex h-[calc(100vh-60px)]">
                    
                        <div className="hidden sm:block">
                        <Sidebar/>
                        </div>
                   
                    <div className={`${homeBg} w-full md:ml-[250px] mt-[10vh] overflow-y-auto sm:w-[calc(100%-250px)] p-4 h-[90vh]`}>
                        {renderBanner()}
                        <div className=" flex items-center border border-[#313131] rounded-md overflow-hidden w-full max-w-md m-3">
                            <input type="search" placeholder="Search" onChange={e => setSearchInput(e.target.value)} className={`${homeBg} w-full p-2 h-full outline-none text-gray-700 placeholder-gray-500`}/>
                            <button   className="bg-[#909090] p-3 flex items-center justify-center transition" onClick={handleSearch}>
                            <IoSearchOutline className="text-sm"/>
                            </button>
                        </div>
                        <div>
                             {renderHomeVideos()}
                        </div>
            
                    </div>
                    </div>
                    </div>
                  
                )
            


            }}
        </ThemeContext.Consumer>
    )

    
}

export default Home