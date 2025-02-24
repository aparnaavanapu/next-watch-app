import ThemeContext from "../../context/ThemeContext"
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {useNavigate} from 'react-router-dom'
import { PiSignOutBold } from "react-icons/pi";
import Cookies from 'js-cookie'
import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { RiPlayListAddFill } from "react-icons/ri";
import {Link} from 'react-router-dom'


const Navbar=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen,setIsPopupOpen]=useState(false);
    const navigate=useNavigate()

    const logoutUser=()=>{
        Cookies.remove('jwt_token')
        navigate("/login")

    }

    return(
        <ThemeContext.Consumer>
        {value=>{
            const {isDarkTheme,toggleTheme}=value
            
            const onToggleTheme=()=>{
                toggleTheme()
            };

            const logo=isDarkTheme?'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png':'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png';
            const themeImg=isDarkTheme?<CiLight className="text-3xl text-[#ffffff]"/>:<FaMoon className="text-3xl"/>;

            // Theme-based class names
            const navBgClass = isDarkTheme ? "bg-[#212121]" : "bg-[#f9f9f9]";
            const buttonBorderClass = isDarkTheme? "border-[#f8fafc] text-[#fafafc]":"border-[#3b82f6] text-[#3b82f6]";
            const textcolor=isDarkTheme?"text-[#ffffff]":"text-[#0f0f0f]";



            return(
            <nav className={`${navBgClass} h-[10vh] p-6 flex justify-between items-center fixed w-full top-0 z-50`}>
                <img src={logo} alt="logo" className="h-8" />
                <div className="hidden md:flex flex-row items-center space-x-4">
                    <button onClick={onToggleTheme} className="border-none focus:outline-none">{themeImg}</button>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className="h-8 w-8 rounded-full"/>
                    <button className={`py-2 px-6 rounded-md border ${buttonBorderClass} font-md text-sm`} onClick={() => setIsPopupOpen(true)}>Logout</button>
                </div>
                {/* Hamburger Menu (Visible in Small Screens) */}
                <button className={`${textcolor} md:hidden text-2xl focus:outline-none`} onClick={() => setIsMenuOpen(!isMenuOpen)}><GiHamburgerMenu /></button>

                {/* Dropdown Menu (Visible on Click in Small Screens) */}
                {isMenuOpen && (
                            <div className={`${navBgClass} absolute top-[10vh] right-0 w-[200px] shadow-lg p-6 flex flex-col space-y-4 md:hidden mr-4`}>
                                <Link to='/' className={` ${textcolor} flex items-center p-2`}>
                                    <AiFillHome className="mr-3"/>
                                    <p>Home</p>
                                </Link>
                                <Link to='/trending' className={` ${textcolor} flex items-center p-2`}>
                                    <HiFire className="mr-3"/>   
                                    <p>Trending</p>
                                </Link>
                                <Link to='/gaming' className={` ${textcolor} flex items-center p-2`}>
                                    <SiYoutubegaming className="mr-3"/>
                                    <p>Gaming</p>
                                </Link>
                                <Link to='/saved-videos' className={` ${textcolor} flex items-center p-2 `}>
                                    <RiPlayListAddFill className="mr-3" />
                                    <p>Saved Videos</p>
                                </Link>
                                <button onClick={onToggleTheme} className="border-none flex items-center p-2">{themeImg}<span className={`${textcolor} ml-3 text-md`}>Mode</span></button>
                                <div className="flex items-center p-2">
                                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className="h-6 w-6 rounded-full"/>
                                    <p className={`${textcolor} ml-3 text-md`}>Profile</p>
                                </div>
                                <div className={`${textcolor} flex items-center p-2`}>
                                <PiSignOutBold className=" text-2xl"/>
                                <p className="ml-3 text-md" onClick={() => setIsPopupOpen(true)}>Logout</p>
                                </div>   
                            </div>
                        )}

                {/* Logout Confirmation Popup */}
                {isPopupOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <p className="text-lg font-semibold text-[#212121]">Are you sure you want to logout?</p>
                                    <div className="flex justify-center mt-4 space-x-4">
                                        <button className="px-4 py-2 bg-gray-300 text-black rounded-md" onClick={() => setIsPopupOpen(false)}>Cancel
                                        </button>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={logoutUser}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        )}
            </nav>
        );
    
            
        
        }
        
        }
    </ThemeContext.Consumer>
    )

    

}

export default Navbar