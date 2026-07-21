import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email,setEmail] = useState("dhoni@gmail.com");
    const [password,setPassword] = useState("dhoni@321")

    const handleLogin = async()=>{
       try {
         const res = await axios.post(BASE_URL+"/login",{
            email,
            password
        },{withCredentials:true})
        dispatch(addUser(res.data.isValid));
        navigate("/")
       } catch (error) {
        console.error(error)
       }
    }
  return (
    <>
 <div className='flex justify-center mx-1'>
     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" value={email} className="input" placeholder="Email"
  onChange={(e)=>setEmail(e.target.value)} />
  <label className="label">Password</label>
  <input type="password" value={password} className="input" placeholder="Password" 
  onChange={(e)=>setPassword(e.target.value)}/>

  <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
</fieldset>
 </div>
    </>
  )
}

export default Login