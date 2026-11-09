import React, { useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import apiRequest from '../../services/api'

function RegisterForm() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (inputs.password !== inputs.confirmPassword) {
      setError("passwords does not match")
      return
    }

    try {
      const res = await apiRequest("POST", inputs, "/api/auth/register")

      if (!res.ok) {
        setError(res.data.message || "registration failed")
        return
      }

      setSuccess(res.data.message || "registration successful")
      navigate("/home")
      setInputs({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      })

    } catch (err) {
      setError(err.message || " registration failed")
    }
  }

  return (
    <div className="bg-[#090E1A] min-h-screen flex justify-center items-center w-full text-[#F1F5F9] p-4">
  
      <form
        className="flex flex-col gap-3 rounded-2xl p-6 w-full max-w-sm border border-[#263248] bg-[#111827] shadow-2xl"
        onSubmit={handleSubmit}
      >
  
        <div className="text-center mb-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Create Account
          </h1>
          <p className="text-[#94A3B8] text-xs mt-1">
            Welcome to Talk. Stay connected.
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
          name="username"
          onChange={(e) => {
            setInputs((old) => ({ ...old, username: e.target.value }))
          }}
          value={inputs.username}
          placeholder="Username"
          required="required"
          type="text"
        />
  
        <input
          className="outline-none bg-[#1E293B] border border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 px-3 py-2.5 w-full rounded-lg text-sm transition-all placeholder:text-[#64748B]"
          name="email"
          onChange={(e) => {
            setInputs((old) => ({ ...old, email: e.target.value }))
          }}
          value={inputs.email}
          placeholder="Email"
          required="required"
          type="email"
        />
  
        <input
          className="outline-none bg-[#1E293B] border border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 px-3 py-2.5 w-full rounded-lg text-sm transition-all placeholder:text-[#64748B]"
          name="password"
          onChange={(e) => {
            setInputs((old) => ({ ...old, password: e.target.value }))
          }}
          value={inputs.password}
          placeholder="Password"
          required="required"
          type="password"
        />
  
        <input
          className="outline-none bg-[#1E293B] border border-[#334155] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 px-3 py-2.5 w-full rounded-lg text-sm transition-all placeholder:text-[#64748B]"
          name="confirmPassword"
          onChange={(e) => {
            setInputs((old) => ({ ...old, confirmPassword: e.target.value }))
          }}
          value={inputs.confirmPassword}
          placeholder="Confirm Password"
          required="required"
          type="password"
        />
  
        <input
          className="outline-none hover:cursor-pointer hover:bg-[#0EA5E9] active:scale-[0.98] bg-[#0284C7] text-white font-semibold px-3 py-2.5 w-full rounded-lg text-sm transition-all mt-1"
          value="Create Account"
          type="submit"
        />
  
        <p className="text-center text-xs text-[#94A3B8]">
          Already have an account?
          <span className="text-[#38BDF8] hover:text-[#22D3EE] cursor-pointer ml-1 transition-colors" onClick={()=>{
            navigate("/login")
          }}>
            Login
          </span>
        </p>
  
      </form>
    </div>
  )
}

export default RegisterForm