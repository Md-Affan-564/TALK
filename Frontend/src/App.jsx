import React, { useEffect, useState } from 'react'
import apiRequest from './services/api';
import {Routes,Route,useNavigate, Navigate} from 'react-router-dom'
import RegisterForm from './components/auth/RegisterForm';
import Home from './components/Home';
import Login from './components/auth/Login';



function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const authorize = async () => {
      try{const result = await apiRequest("GET",null,"/api/auth/me")
      if (result.ok === true){
        setUser(result.data.user)
      }else{
        console.log(result.data?.message || result.message)
      }
    }catch(error){
        console.log(error.message)
    }finally{
    setLoading(false)
    }
  }

    authorize()
  },[])
  useEffect(()=>{
    if(user){
    navigate("/home")
    }
  },[user])
  if(loading){
    return <div>Loading....</div>
  }
  return <>
  <Routes>
  <Route path="/" element={(user ? <Home/>:<RegisterForm/>)} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<RegisterForm/>} />
  <Route path="/home" element={(user ? <Home/>:<Navigate to={"/login"} />)} />
  </Routes>
  </>
}
export default App