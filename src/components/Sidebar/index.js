import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { RiPlayListAddFill } from "react-icons/ri";
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {useLocation} from 'react-router-dom'

const Sidebar=()=>{

    const location=useLocation()

    

    return(
        <ThemeContext.Consumer>
        {value=>{
            const {isDarkTheme}=value

            

            const sidebarBg=isDarkTheme?"bg-[#212121]" : "bg-[#f9f9f9]";
            const textColor=isDarkTheme?"text-[#ebebeb]":"text-[#0f0f0f]";
            const iconColor=isDarkTheme?"text-[#f8fafc]":"text-[#000000]";

            const getLinkStyles = (path) => {
                return location.pathname === path
                    ? "bg-[#cccccc] text-red-600 font-bold"
                    :textColor ;
            };
        
            const getIconStyles = (path) => {
                return location.pathname === path ? "text-red-600" : iconColor;
            };
            

            return(
                <div className={`fixed top-[10vh] left-0 h-[90vh] w-[250px] ${sidebarBg} flex flex-col justify-between`}>
                    {/* top section */}
                    <div className="p-2 ml-2">
                        <Link to='/' className={`flex items-center p-2 ${getLinkStyles('/')} `}>
                            <AiFillHome className={`${getIconStyles('/')} mr-2`}/>
                            <p>Home</p>
                        </Link>
                        <Link to='/trending' className={`flex items-center p-2 ${getLinkStyles('/trending')}`}>
                            <HiFire className={`${getIconStyles('/trending')} mr-2`}/>   
                            <p>Trending</p>
                        </Link>
                        <Link to='/gaming' className={`flex items-center p-2 ${getLinkStyles('/gaming')}`}>
                            <SiYoutubegaming className={`${getIconStyles('/gaming')} mr-2`}/>
                            <p>Gaming</p>
                        </Link>
                        <Link to='/saved-videos' className={`flex items-center p-2 ${getLinkStyles('/saved-videos')}`}>
                            <RiPlayListAddFill className={`${getIconStyles('/saved-videos')} mr-2`} />
                            <p>Saved Videos</p>
                        </Link>
        
                    </div>
                    {/*bottom section */}
                    <div className="p-2 ml-2 mb-5">
                        <h1 className={`${textColor} text-[#000000] text-xl font-semibold`}>CONTACT US</h1>
                        <div className="flex items-center justify-space-between mt-2 mb-2">
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" className="w-9 m-1"/>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter logo" className="w-9 m-1"/>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linkedin logo" className="w-9 m-1"/>
                        </div>
                        <p className={`${textColor} text-sm`}>Enjoy! now you can see your recomendations</p>
        
                    </div>
        
                </div>
            )

        }}
    </ThemeContext.Consumer>

    )
   

}
export default Sidebar