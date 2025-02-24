import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import Trending from './components/TrendingRoute'
import Gaming from './components/GamingRoute'
import ThemeContext  from './context/ThemeContext'
import SavedVideosRoute from './components/SavedVideosRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import {Component} from 'react'

// Replace your code here
 class App extends Component{
  state = {
    isDarkTheme: false,
    savedVideos:[],
    isSaved:false
  };

  toggleTheme = () => {
    this.setState(prevState => ({ isDarkTheme: !prevState.isDarkTheme }));
  };
  

  addVideo = (videoDetails) => {
    this.setState(prevState => {
        const isVideoAlreadySaved = prevState.savedVideos.some(video => video.id === videoDetails.id);
        if (!isVideoAlreadySaved) {
            return { savedVideos: [...prevState.savedVideos, videoDetails] };
        }
        return prevState; // Do nothing if already saved
    });
};



  render(){
    const {isDarkTheme,savedVideos}=this.state
    return(
      <ThemeContext.Provider value={{isDarkTheme,toggleTheme: this.toggleTheme,savedVideos,addVideo:this.addVideo}}>
        
  
    <BrowserRouter>
    <Routes>
    <Route exact path="/login" element={<LoginRoute/>} />
    <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
    <Route exact path="/videos/:id" element={<ProtectedRoute><VideoItemDetailsRoute/></ProtectedRoute>} />
    <Route exact path="/trending" element={<ProtectedRoute><Trending/></ProtectedRoute>} />
    <Route exact path="/gaming" element={<ProtectedRoute><Gaming/></ProtectedRoute>} />
    <Route exact path="/saved-videos" element={<ProtectedRoute><SavedVideosRoute/></ProtectedRoute>} />
    <Route path="*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter>

      </ThemeContext.Provider>
    )
  }
 }


export default App
