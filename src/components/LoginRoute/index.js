import { useState } from "react";
import Cookies from 'js-cookie'
import {Navigate,useNavigate} from 'react-router-dom'

const LoginRoute = () => {
  const [username, setUsername] = useState("rahul");
  const [password, setPassword] = useState("rahul@2021");
  const [showErrorMsg,setShowErrorMsg]=useState("");
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()

  const loginSuccess=(jwt_token)=>{
    Cookies.set('jwt_token',jwt_token,{expires:1})
    navigate('/')
  }

  const loginFailure=(error_msg)=>{
    setShowErrorMsg(error_msg)
  }
  
  const submitForm= async (event)=> {
    event.preventDefault();
    const url=" https://apis.ccbp.in/login";
    const userDetails={username,password}
    const options={
        method:'POST',
        body:JSON.stringify(userDetails)
    }
    const response=await fetch(url,options)
    const data=await response.json()
    console.log(data)
    if (response.ok===true){
        loginSuccess(data.jwt_token)
    }else{
        loginFailure(data.error_msg)
    }

  }

  const onShowPassword=()=>{
    setShowPassword((prevState) => !prevState);
  }

  const renderUsername = () => {
    return (
      <div className="flex flex-col w-full">
        <label
          htmlFor="username"
          className="mb-1 text-[#94a3b8] font-medium text-xs"
        >
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={onChangeUsername}
          value={username}
          className="p-3 border rounded-md focus:outline-none mb-4 w-full"
        />
      </div>
    );
  };

  const renderPassword = () => {
    return (
      <div className="flex flex-col w-full">
        <label
          htmlFor="password"
          className="mb-1 font-medium text-xs text-[#94a3b8]"
        >
          PASSWORD
        </label>
        <input
           type={password === "" || showPassword ? "text" : "password"}
          placeholder="Password"
          id="password"
          onChange={onChangePassword}
          value={password}
          className="p-3 border rounded-md focus:outline-none mb-4 w-full"
        />
      </div>
    );
  };

  const renderShowPassword = () => {
    return (
      <div className="flex items-center mb-6 w-full">
        <input type="checkbox" id="checkbox" className="mr-2 text-[#000000]" onChange={onShowPassword}/>
        <label className="font-sm text-xs" htmlFor="checkbox">Show password</label>
      </div>
    );
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const jwtToken=Cookies.get('jwt_token')
        if (jwtToken){
            return <Navigate to="/" replace/>
        }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <form className="bg-white p-10 rounded-md shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-lg max-w-xl flex flex-col items-center" onSubmit={submitForm}>
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo" className="w-32 h-auto mb-6"
        />
        {renderUsername()}
        {renderPassword()}
        {renderShowPassword()}
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">Login</button>
        {showErrorMsg&&<p className="text-[#ff0000] text-xs font-sm">{showErrorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginRoute;
