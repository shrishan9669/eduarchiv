import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdGroups2, MdOutlineEmojiEvents } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";

export default function Friends() {
  const [freinds, setFriends] = useState({});

  async function Friends() {
    try {
      const Comingobj = await axios({
        url: `https://backend-j5f0.onrender.com/user/takefriends?id=${localStorage.getItem("userid")}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(Comingobj.data.friends);

      if (Comingobj.data && Comingobj.data.friends) {
        setFriends(Comingobj.data.friends);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  useEffect(() => {
    Friends();
  }, []);

  return (
    <div className="p-5 md:p-10 relative w-full bg-[#f3f2ef] flex justify-center">
      <div className="w-full max-w-screen-xl flex gap-5 md:gap-10 z-30">
        {/* Left div */}
        <div className="max-h-[300px] border-2 bg-white shadow-lg rounded-xl py-4 w-full md:w-[30%]">
          <h1 className="border-b p-3 text-slate-500 text-md">Manage my network</h1>
          {/* Elements */}
          <div className="flex flex-col">
            <div className="flex text-slate-500 justify-between mx-4 p-2">
              <div className="flex items-center gap-4">
                <FaUserFriends />
                <span>Connections</span>
              </div>
              <span>720</span>
            </div>
            <div className="flex text-slate-500 justify-between mx-4 p-2">
              <div className="flex items-center gap-4">
                <IoPersonSharp />
                <span>Followers</span>
              </div>
            </div>
            <div className="flex text-slate-500 justify-between mx-4 p-2">
              <div className="flex items-center gap-4">
                <MdOutlineEmojiEvents />
                <span>Events</span>
              </div>
            </div>
            <div className="flex text-slate-500 justify-between mx-4 p-2">
              <div className="flex items-center gap-4">
                <RiPagesLine />
                <span>Pages</span>
              </div>
            </div>
            <div className="flex text-slate-500 justify-between mx-4 p-2">
              <div className="flex items-center gap-4">
                <MdGroups2 />
                <span>Groups</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right div */}
        <div className="w-full md:w-[70%] border-2 h-auto bg-white px-5 py-4 rounded-xl flex-col">
          <h1 className="border mb-5 rounded-lg flex justify-center font-[500] text-slate-500 py-2 text-lg">
            To follow
          </h1>
          <div className="text-slate-500 italic justify-center items-center flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-11">
            {Object.entries(freinds).map(([key, value]: [string, any]) => (
              <Followcard
                desc={value.description}
                id={key}
                key={key}
                name={value.name}
                front={value.profileimg}
                back={value.backimg}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Followcard({ name, desc ,id, front, back }: any) {
  const [got, setGot] = useState(false);

  return (
    <div key={id} className="h-[300px] w-[230px] md:w-[200px] lg:w-[230px] border rounded-lg">
      {/* Backimage */}
      <div className="h-[33%] relative">
        <img
          className="object-cover rounded-t-lg w-full h-full"
          src={back || "https://via.placeholder.com/150"}
          alt=""
        />
        <img
          className="absolute w-24 rounded-full left-16 bottom-4 top-10 h-24"
          src={front || "https://via.placeholder.com/150"}
          alt=""
        />
      </div>
      {/* Down div */}
      <div className="h-[80%] py-10 flex flex-col justify-between">
        <div className="flex flex-col justify-start">
          <span className="font-bold text-xl ml-4">{name}</span>
          <p className="text-slate-500 ml-4">{desc}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              
                const sending = await axios({
                  url: "https://backend-j5f0.onrender.com/admin/unfriend",
                  method: "PUT",
                  data: {
                   id:id
                  },
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
                console.log(sending.data);

                if (sending.data.msg) {
                  setGot(true);
                  localStorage.setItem("profileid", sending.data.id);
                }
              
            }}
            className={`px-14 rounded-full hover:border-2 mb-3 font-[600] hover:bg-blue-100 hover:text-blue-900 transition-all duration-100 border-blue-700 border ${
              got ? "hover:border-2 hover:border-slate-800 hover:bg-slate-200" : ""
            } text-blue-700 items-center flex py-1`}
          >
            {"Unfriend"}
          </button>
        </div>
      </div>
    </div>
  );
}
