

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/loader";


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buffer, setBuf] = useState(false);
  const [mssg, setMsg] = useState('');
  const[name,setName] = useState('')
  const[desc,setDesc] = useState('')
  const [state, setState] = useState('password');


  return (
    <div className="w-full h-screen  flex justify-center bg-gradient-to-b   from-slate-400 to-slate-600 items-center">

      <div className="w-[80%]  bg-gradient-to-r from-slate-300  rounded-3xl h-[94%]  to-orange-200 p-10 flex justify-around">

        {/* signup component */}
      <div className="flex flex-col w-full sm:w-[450px] bg-inherit  rounded-lg  px-8  space-y-6">

<h1 className="text-3xl font-thin text-center text-gray-800">Create an Account</h1>


<div className="space-y-6">
  {/* Name input  */}
  <div className="flex flex-col">
    <label htmlFor="name" className="text-sm font-light pl-4 text-gray-600">Name</label>
    <input
      onChange={(e) => setName(e.target.value)}
      required
      type="text"
      id="name"
      className="mt-2 p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter your name"
    />
  </div>
  {/* Email Input */}
  <div className="flex flex-col">
    <label htmlFor="email" className="text-sm font-light pl-4 text-gray-600">Email</label>
    <input
      onChange={(e) => setEmail(e.target.value)}
      required
      type="email"
      id="email"
      className="mt-2 p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter your email"
    />
  </div>

  {/* Password Input */}
  <div className="flex flex-col">
    <label htmlFor="password" className="text-sm font-light pl-4 text-gray-600">Password</label>
    <div className="flex items-center space-x-2 mt-2 p-3 border bg-white justify-between rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <input
        onChange={(e) => setPassword(e.target.value)}
        required
        type={state}
        id="password"
        className=""
        placeholder="Enter your password"
      />
      {state === 'password' ? (
        <FaRegEye
          onClick={() => setState('text')}
          className="cursor-pointer text-blue-500 text-xl"
        />
      ) : (
        <FaRegEyeSlash
          onClick={() => setState('password')}
          className="cursor-pointer text-blue-500 text-xl"
        />
      )}
    </div>
  </div>

  {/* description */}
  <div className="flex flex-col">
    <label className="text-sm font-light pl-4 text-gray-600">Write your bio</label>
    <textarea onChange={(e)=> setDesc(e.target.value)} className="mt-2 p-3 border border-gray-300 rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Write about you.." rows={4}></textarea>
  </div>

  {/* Submit Button */}
  <div className="flex flex-col items-center">
    <button
      onClick={async () => {
        if(!email || !password || !name || !desc){
          alert('Please fill out all fields')
          return ;
        }
        setBuf(true);
        try {
          const user = await axios({
            url: 'https://backend-j5f0.onrender.com/user/create',
            method: "POST",
            data: {
              email: email,
              password: password,
              name:name,
              description:desc
            }
          });
          setMsg(user.data.msg);
          if(user.data.msg === 'User created!!'){
            window.location.href = ('/login')
          }
        } catch (err) {
          console.log("Error occurred from frontendSide..->", err);
        } finally {
          setBuf(false);
        }
      }}
      className={`w-full py-3 rounded-3xl text-black font-medium text-lg  transition-all duration-300 ${buffer ? "bg-gray-300" : "bg-yellow-400 hover:bg-yellow-600"}`}
    >
      {buffer ? <Loader /> : "Create Account"}
    </button>
    <span>{mssg}</span>
  </div>

  {/* Login Link */}
  <div className="flex justify-center items-center space-x-2">
    <span className="text-sm text-gray-500">Already have an account?</span>
    <button
      onClick={() => window.location.href = ('/login')}
      className="text-sm text-indigo-600 hover:text-indigo-500 font-semibold"
    >
      Login
    </button>
  </div>
</div>
</div>
         

{/* ai generated image */}
        <div >
              <img src="./signupai.webp" className="h-[620px] w-[550px] rounded-3xl"   alt="" />
        </div>
      </div>
      
    </div>
  );
}
