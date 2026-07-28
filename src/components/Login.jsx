import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm,setLoginForm] = useState(true)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age,setAge] = useState("")
  const [gender,setGender] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password
      }, { withCredentials: true })
      dispatch(addUser(res.data.isValid));
      navigate("/")
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.msg || err.response.data.error || "Login failed");
      } else {
        setError("Login failed");
      }
      console.error(err);
    }
  }
  const handleSignUp = async()=>{
    try {
      const res = await axios.post(BASE_URL+"/signup",
      {firstName,lastName,age,gender,email,password},
    {withCredentials:true});
    console.log(res.data.data)
    dispatch(addUser(res.data.data));
    navigate("/profile");
      
    } catch (error) {
      setError(error?.response?.data||"Something went wrong")
    }
  }
  return (
    <>
      <div className='flex justify-center mx-1'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">{isLoginForm?"Login":"Signup"}</legend>
          {!isLoginForm&&<><label className="label">FirstName</label>
          <input type="text" value={firstName} className="input" placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)} />
          <label className="label">LastName</label>
          <input type="text" value={lastName} className="input" placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)} />
            <label className="label">Age</label>
          <input type="number" value={age} className="input" placeholder="Age"
            onChange={(e) => setAge(e.target.value)} />
               <label className="label">Gender</label>
          <input type="text" value={gender} className="input" placeholder="Gender"
            onChange={(e) => setGender(e.target.value)} /></>}
          <label className="label">Email</label>
          <input type="email" value={email} className="input" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
          <label className="label">Password</label>
          <input type="password" value={password} className="input" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
          <p className='text-red-500'>{error}</p>

          <button className="btn btn-neutral mt-4" onClick={isLoginForm?handleLogin:handleSignUp}>
            {isLoginForm?"Login":"SignUp"}</button>
          <p className='text-black-400 font-bold p-1 cursor-pointer mx-auto 'onClick={()=>setLoginForm((val)=>!val)}>
            {isLoginForm?"New User? SignUp Here":"Existing User? Login Here"}</p>
        </fieldset>
      </div>
    </>
  )
}

export default Login