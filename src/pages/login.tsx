
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
    <div className="w-screen h-screen  flex justify-center items-center">
      {/* Container */}
      <div className="flex flex-col border md:flex-row w-[90%] md:w-[60%] bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center items-center w-[40%] bg-gradient-to-t from-blue-400 to-blue-600 text-white p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center">
            Log in to access past year's question papers and enhance your
            academic preparation.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full md:w-[60%] p-8 md:p-14">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Login</h1>
          <div className="flex flex-col gap-6">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-600 text-lg">
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
              <label htmlFor="password" className="text-gray-600 text-lg">
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

            {/* check box */}
            
            {/* Login Button */}
            <button
            type="submit"
              className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-300 ${
                buffer
                  ? "bg-blue-200"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400"
              }`}
              onClick={async () => {
                
                setBuf(true);
                try {
                  const find = await axios({
                    url: "https://backend-j5f0.onrender.com/user/login",
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
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500">
                Don't have an account yet?
              </span>
              <button
                className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-bold transition-all duration-300"
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
