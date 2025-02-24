import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { RiPlayListAddFill } from "react-icons/ri";
import ThemeContext from '../../context/ThemeContext'

const SavedVideosRoute = () => {
    const { isDarkTheme, savedVideos } = useContext(ThemeContext);
    const navigate = useNavigate();

    const openVideoItem = (id) => {
        navigate(`/videos/${id}`);
    };

    const trendingRouteBg = isDarkTheme ? "bg-[#000000]" : "bg-[#f4f4f4]";
    const textColor = isDarkTheme ? "text-[#ffffff]" : "text-[#0f0f0f]";
    const trendingHead = isDarkTheme ? "bg-[#181818]" : "bg-[#f4f4f4]";
    const logoBg=isDarkTheme?"bg-[#383838]":"bg-[#d7dfe9]";
    

    const renderVideosList = savedVideos.length === 0 ? (
        <div className={`${trendingRouteBg} flex flex-col items-center justify-center w-full h-screen`}>
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="no-saved-videos" className="md:w-[40%]  sm:w-[50%] mb-4" />
        <p className={`text-2xl font-bold ${textColor} mt-2 text-center w-[30%] sm:w-[90%] md:w-[50%] max-w-[400px]`}>No Saved Videos Found</p>
        <p className="text-[#475569] text-xl font-semibold mt-2 text-center w-[30%] sm:w-[90%] md:w-[50%] max-w-[400px]">Try saving some videos.</p>
       </div>
    ) : (
        <div className={`${trendingRouteBg} w-full min-h-screen`}>
            <div className={`${trendingHead} p-4 flex items-center w-full m-0 mb-3`}>
                <div className={` ${logoBg} rounded-full p-3 flex items-center justify-center mr-3`}>
                    <RiPlayListAddFill className="text-[#ff0000] text-xl" />
                </div>
                <p className={`${textColor} text-3xl font-bold text-[#212121]`}>Saved Videos</p>
            </div>
            <div>
                {savedVideos.map(eachItem => (
                    <div key={eachItem.id} onClick={() => openVideoItem(eachItem.id)} className="flex flex-row  items-start p-4 cursor-pointer">
                        <img src={eachItem.thumbnailUrl} alt={eachItem.title}  className="w-[30%] sm:w-[80%] md:w-[25%] lg:w-[20%] h-[150px] object-cover rounded-lg"/>

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
    );

    return (
        <div>
            <Navbar />
            <div className="flex mt-[10vh]">
                <div className="hidden sm:block">
                <Sidebar />
                </div>
                <div className="w-full md:ml-[250px] sm:w-[calc(100%-250px)]">{renderVideosList}</div>
            </div>
        </div>
    );
};

export default SavedVideosRoute;
