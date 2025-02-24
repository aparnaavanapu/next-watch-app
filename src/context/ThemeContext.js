import React from 'react'

const ThemeContext=React.createContext({
    isDarkTheme:false,
    toggleTheme:()=>{},
    savedVideos:[],
    addVideo:()=>{},
    

})

export default ThemeContext