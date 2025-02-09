

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buffer, setBuf] = useState(false);
  const [mssg, setMsg] = useState('');
  const[name,setName] = useState('')
  const[desc,setDesc] = useState('')
  const [state, setState] = useState('password');
  const nav = useNavigate()

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center mb-20 mt-10">
      <div className="flex flex-col w-full sm:w-[450px] bg-white rounded-lg shadow-lg p-8 space-y-8">

        <h1 className="text-3xl font-semibold text-center text-gray-800">Create an Account</h1>

        
        <div className="space-y-6">
          {/* Name input  */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              id="name"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              id="email"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
            <div className="flex items-center space-x-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type={state}
                id="password"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              {state === 'password' ? (
                <FaRegEye
                  onClick={() => setState('text')}
                  className="cursor-pointer text-gray-600 text-xl"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setState('password')}
                  className="cursor-pointer text-gray-600 text-xl"
                />
              )}
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Write your bio</label>
            <textarea onChange={(e)=> setDesc(e.target.value)} className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Write about you.." rows={4}></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={async () => {
                setBuf(true);
                try {
                  const user = await axios({
                    url: 'http://localhost:3000/user/create',
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
              className={`w-full py-3 rounded-lg text-white text-lg font-medium transition-all duration-300 ${buffer ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-500"}`}
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
    </div>
  );
}
