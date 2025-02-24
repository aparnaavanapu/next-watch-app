import { formatDistanceToNow } from 'date-fns';
import {useNavigate} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
 
 const HomeVideoItem=(props)=>{

    const {details}=props;
    const {id,title,thumbnailUrl,channel,viewCount,publishedAt}=details;
    const navigate=useNavigate()

    const openVideoItem=()=>{
        navigate(`/videos/${id}`)

    }

    return(

        <ThemeContext.Consumer>

            {value=>{

                const {isDarkTheme}=value


                const textColor=isDarkTheme?"text-[#ffffff]":"text-[#0f0f0f]";


                return(
                    <li className="flex flex-col md:flex-col items-start gap-6 sm:w-[90%] md:w-[45%] lg:w-[30%] p-4 m-3" onClick={openVideoItem}>
                        <img src={thumbnailUrl} alt={title} className="w-full  object-cover" />
                        <div className="flex">
                            <img src={channel.profile_image_url} alt={channel.name} className="w-10 h-10 rounded-full mr-2"/>
                            <div className="flex flex-col">
                                <p className={` ${textColor} text-md text-[#212121]`}>{title}</p>
                                <p className="text-[#475569]">{channel.name}</p>
                                <div className="flex">
                                    <p className="text-[#475569]">{viewCount} views</p>
                                    <span className="mr-2 ml-2 text-[#212121]">•</span>
                                    <p className="text-[#475569]">{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            }}
        </ThemeContext.Consumer>
        
    )
   
    

 }

 export default HomeVideoItem