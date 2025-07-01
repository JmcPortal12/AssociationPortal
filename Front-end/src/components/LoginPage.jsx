import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

function LoginPage() {
const[username,setUsername] = useState("");
const[password,setPassword] = useState("");
const [ type , setType] = useState('password');
const eyeOff = 'images/eyeOff.png'
const eye = 'images/eye.png'
const [ icon ,setIcon] = useState(eyeOff);
const navigate = useNavigate();

const handleLogin = async(e)=>{
e.preventDefault();
try {
  console.log(username,password)
  const data = {username:username,password:password}
  const responds = await axios.post('https://associationportal-backend.onrender.com/',
    {data : data}
  )
  console.log(responds.data.message);
 
  if(responds.data.message === "Login in successfully !..."){
    
    navigate('/homePage');
    
  }
} catch (error) {
  toast.error("Invalid Username & Password")
}}

const handleToggle = ()=>{
    if(type === 'password'){
      setIcon(eye);
      setType('text')
    }
    else{
      setIcon(eyeOff)
      setType('password')
    }
}

  return ( 
   <div
  className="flex items-center justify-center min-h-screen"
  style={{ 
    backgroundImage: "url('images/images.jpeg')",backgroundRepeat : "no-repeat" ,
    backgroundPosition:"center",
    backgroundSize :"100% 100%"
  }}>
    <ToastContainer autoClose={900} />
    <form
  className="p-6 rounded-xl bg-white border border-gray-300 shadow-md max-w-xl mx-auto"
  onSubmit={handleLogin}
  action="http://localhost:3001/"
>
 
  <div className="flex justify-center mb-1">
    <img
      src="images/jmc_logo.png"
      alt="JMC Logo"
      className="w-64   md:w-72 lg:w-full"
    />
  </div>

 
  <h2 className="text-center text-xl md:text-2xl lg:text-2xl text-blue-900 font-bold mb-2">Login</h2>

  
  <div className="mb-4 flex justify-center">
    <input
      className="border border-gray-300 focus:border-300 focus:ring-0 focus:outline-none rounded-2xl w-full max-w-md p-3 pl-5 placeholder-gray-400 "
      placeholder="Username"
      onChange={(event) => setUsername(event.target.value)}
      name="username"
    />
  </div>

 
  <div className="mb-6 flex justify-center">
    <input
      className="border border-gray-300 focus:border-300 focus:ring-0 focus:outline-none rounded-2xl w-full max-w-md p-3 pl-5 relative"
      placeholder="Password"
      type={type}
      onChange={(event) => setPassword(event.target.value)}
      name="password"
    />

  <span className="flex justify-around items-center" >
      <img src={icon} className='w-10 absolute me-14' alt='show/hide eye logo'
      onClick={()=>handleToggle()}/>
    </span>
  </div>


  <div className="flex justify-center">
    <button
      type="submit"
      className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-10 py-3 rounded-3xl border border-blue-700"
    >
      Submit
    </button>
  </div>
</form>

   
    </div>
  )
}

export default LoginPage       

