
import axios from "axios";
import {  useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [buffer, setBuf] = useState(false);
  const [password, setPassword] = useState("");
  const [state, setState] = useState("password");

 const nav = useNavigate()

  
  return (
    <div
    style={{

      backgroundImage:'url(https://images.unsplash.com/photo-1508780709619-79562169bc64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D)',
      backgroundPosition:"center",
      backgroundSize:'cover'
    }}
    className="w-screen h-screen  flex justify-center items-center">
      {/* Container */}
      <div className="flex flex-col md:justify-center border md:flex-row w-[90%] md:w-[60%] bg-inherit rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        {/* <div className="hidden md:flex flex-col justify-center items-center w-[40%] bg-gradient-to-t from-red-500 to-pink-600 text-white p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center">
            Log in to access past year's question papers and enhance your
            academic preparation.
          </p>
        </div> */}

        {/* Right Section */}
        <div className="flex flex-col w-full md:w-[60%] p-8 md:p-14">
          <h1 className="text-3xl font-bold mb-8 text-white">Login</h1>
          <div className="flex flex-col gap-6">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white text-md">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white text-md">
                Password
              </label>
              <div className="relative flex ">
                <input
                  type={state}
                  id="password"
                  required
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="p-3 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {state === "password" ? (
                  <FaRegEye
                    className="absolute top-4 right-3 text-gray-500 cursor-pointer"
                    onClick={() => setState("text")}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute top-4 right-3 text-gray-500 cursor-pointer"
                    onClick={() => setState("password")}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
            <span onClick={()=> window.location.href = '/forgetpassword'} className="text-sm ml-2 text-white hover:underline hover:text-pink-500 cursor-pointer">Forget password</span>
            </div>
            

            {/* check box */}
            
            {/* Login Button */}
            <button
            type="submit"
              className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-300 ${
                buffer
                  ? "bg-blue-200"
                  : "bg-gradient-to-r from-red-500  to-pink-600  focus:ring-4 focus:ring-blue-400"
              }`}
              onClick={async () => {
                if(!email || !password){
                  alert("Please fill out all fields!!")
                  return ;
                }
                setBuf(true);
                try {
                  const find = await axios({
                    url: "http://localhost:3000/user/login",
                    method: "POST",
                    data: {
                      email: email,
                      password: password,
                    },
                  });

                  setMsg(find.data.msg);
                  if (find.data.msg === "User found!!") {
                    localStorage.setItem("userid", find.data.id);
                    localStorage.setItem("email", email);
                    localStorage.setItem("token",find.data.token)
                    nav("/show");
                  }
                } catch (err) {
                  console.error("Error in frontend while logging in:", err);
                } finally {
                  setBuf(false);
                }
              }}
            >
              {buffer ? <Loader /> : "Login"}
            </button>

            {/* Sign Up Section */}
            <div className="flex  gap-3 items-center mt-4">
              <span className="text-white">
                Don't have an account yet?
              </span>
              <button
                className=" text-pink-700 hover:underline rounded-lg font-medium transition-all duration-300"
                onClick={() => nav("/signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Message */}
            <div className="text-center text-pink-600 font-medium animate-bounce">
              {msg}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
