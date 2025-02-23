import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/loader";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buffer, setBuf] = useState(false);
  const [mssg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [state, setState] = useState('password');

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className="w-full h-screen flex justify-center items-center p-4 sm:p-10"
    >
      <div className="w-full max-w-3xl bg-inherit rounded-3xl p-8 sm:p-10 flex flex-col justify-center items-center">
        <div className="w-full bg-inherit rounded-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-white">Create an Account</h1>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-bold pl-4 text-white">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                id="name"
                className="mt-2 p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-light pl-4 text-white">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                id="email"
                className="mt-2 p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-light pl-4 text-white">Password</label>
              <div className="flex items-center pr-3 mt-2 border bg-white justify-between rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type={state}
                  id="password"
                  className="w-full p-3 rounded-3xl focus:ring-2 focus:ring-indigo-500"
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
            <div className="flex flex-col">
              <label className="text-sm font-light pl-4 text-white">Write your bio</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write about you.."
                rows={4}
              ></textarea>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={async () => {
                  if (!email || !password || !name || !desc) {
                    alert('Please fill out all fields');
                    return;
                  }
                  setBuf(true);
                  try {
                    const user = await axios.post('http://localhost:3000/user/create', {
                      email,
                      password,
                      name,
                      description: desc
                    });
                    setMsg(user.data.msg);
                    if (user.data.msg === 'User created!!') {
                      window.location.href = '/login';
                    }
                  } catch (err) {
                    console.log("Error occurred from frontendSide..->", err);
                  } finally {
                    setBuf(false);
                  }
                }}
                className={`w-full py-3 rounded-3xl text-black font-medium text-lg transition-all duration-300 ${buffer ? "bg-gray-300" : "bg-yellow-400 hover:bg-yellow-600"}`}
              >
                {buffer ? <Loader /> : "Create Account"}
              </button>
              <span>{mssg}</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <span className="text-sm text-white">Already have an account?</span>
              <button
                onClick={() => window.location.href = '/login'}
                className="text-sm text-white font-bold hover:text-pink-600 transition-all duration-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
