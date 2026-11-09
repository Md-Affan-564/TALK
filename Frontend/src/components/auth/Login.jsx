import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiRequest from '../../services/api'



const Login = () => {
  const navigate = useNavigate()
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")  
  const [inputs, setInputs] = useState({
    email:"",
    password:""
  })
  async function handleSubmit(e){
    e.preventDefault()
    setSuccess("")
    setError("")
    try{const result = await apiRequest("POST",inputs,"/api/auth/login")
    if(result.ok){
      setSuccess(result.data.message || "Login Successful")
      setInputs({
        email:"",
        password:""
      })
      
      navigate("/home")
      return
    }else{
    setError(result.data.message || "Login Failed")
    }
    }catch(err){
      setError(err.message || "Login Failed")
    }
  }
  return (
    <div className="bg-[#090E1A] min-h-screen flex justify-center items-center w-full text-[#F1F5F9] p-4">
  
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl p-6 w-full max-w-sm border border-[#263248] bg-[#111827] shadow-2xl">
  
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[#94A3B8] text-xs mt-1">
            Sign in to continue to Talk.
          </p>
        </div>
        {error && (
  <p className="bg-red-500/10 border border-red-400/30 text-[#F87171] px-3 py-2 rounded-lg text-xs">
    {error}
  </p>
)}

{success && (
  <p className="bg-green-500/10 border border-green-400/30 text-[#22C55E] px-3 py-2 rounded-lg text-xs">
    {success}
  </p>
)}
  
        <input
          className="outline-none bg-[#1E293B] border border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 px-3 py-2.5 w-full rounded-lg text-sm transition-all placeholder:text-[#64748B]"
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e)=>{
            setInputs(old => ({
              ...old,email:e.target.value
            }))
          }}
          required
        />
  
        <input
          className="outline-none bg-[#1E293B] border border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 px-3 py-2.5 w-full rounded-lg text-sm transition-all placeholder:text-[#64748B]"
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e)=>{
            setInputs(old => ({
              ...old,password:e.target.value
            }))
          }}
          required
        />
  
        <div className="flex justify-end">
          <span className="text-xs text-[#38BDF8] hover:text-[#22D3EE] cursor-pointer transition-colors">
            Forgot password?
          </span>
        </div>
  
        <input
          className="outline-none hover:cursor-pointer hover:bg-[#0EA5E9] active:scale-[0.98] bg-[#0284C7] text-white font-semibold px-3 py-2.5 w-full rounded-lg text-sm transition-all"
          type="submit"
          value="Login"
        />
  
        <p className="text-center text-xs text-[#94A3B8]">
          Don't have an account?
          <span onClick={()=>{
            navigate("/register")
          }} className="text-[#38BDF8] hover:text-[#22D3EE] cursor-pointer ml-1 transition-colors">
            Register
          </span>
        </p>
  
      </form>
    </div>
  )
}

export default Login