import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Loader from "../components/loader";
import axios from "axios";

export default function () {
  const [email, setEmail] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [newstate, setnewState] = useState("password");
  const [confirmstate, setconfirmState] = useState("password");
  const [buffer, setBuf] = useState(false);
  const [mssg, setMsg] = useState("");

  async function Updatepassword() {
    setBuf(true);
    if (
      email === "" ||
      newpassword === "" ||
      confirmpassword === "" ||
      newpassword !== confirmpassword
    ) {
      return;
    }

    try {
      const response = await axios.put("http://localhost:3000/admin/changepassword", {
        email: email,
        newpass: confirmpassword,
      });

      console.log(response.data);
      if (response.data && response.data.msg) {
        setMsg(response.data.msg);
        if (response.data.msg === "Password updated!!") {
          await new Promise((r) => setTimeout(r, 3000));
          window.location.href = "/login";
        }
      }
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setBuf(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f3f2ef] flex justify-center items-center px-4">
      <div className="flex flex-col w-full max-w-md border bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-xl font-semibold text-center text-gray-800">Update your password</h1>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              id="email"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your account email..."
            />
          </div>

          {/* New Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              New Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setnewPassword(e.target.value)}
                required
                type={newstate}
                id="password"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl"
                onClick={() => setnewState(newstate === "password" ? "text" : "password")}
              >
                {newstate === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setconfirmPassword(e.target.value)}
                required
                type={confirmstate}
                id="password"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl"
                onClick={() => setconfirmState(confirmstate === "password" ? "text" : "password")}
              >
                {confirmstate === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          {/* Passwords match */}
          {newpassword === confirmpassword ? (
            newpassword === "" && confirmpassword === "" ? (
              ""
            ) : (
              <span className="text-green-500 text-sm mt-3">Passwords match.</span>
            )
          ) : (
            <span className="text-red-500 text-sm mt-6">Both fields should match!</span>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={Updatepassword}
              className={`w-full py-3 rounded-lg text-white text-lg ${
                email === "" || newpassword === "" || confirmpassword === "" || newpassword !== confirmpassword
                  ? "cursor-not-allowed"
                  : ""
              } font-medium transition-all duration-300 ${
                buffer ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {buffer ? <Loader /> : "Update password"}
            </button>
            <span className="text-center">{mssg}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
