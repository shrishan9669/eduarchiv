import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdGroups2, MdOutlineEmojiEvents } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";

export default function Friends() {
  const [friends, setFriends] = useState({});

  async function fetchFriends() {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/takefriends?id=${localStorage.getItem("userid")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
 console.log(response.data.friends)
      if (response.data && response.data.friends) {
        setFriends(response.data.friends);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching friends.");
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="p-5 md:p-10 w-full bg-[#f3f2ef] flex justify-center">
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row gap-5 md:gap-10">
        {/* Left Section */}
        <div className="w-full md:w-[30%] bg-white shadow-lg rounded-xl p-4">
          <h1 className="border-b p-3 text-gray-600 text-md">Manage my network</h1>
          <div className="flex flex-col space-y-2">
            <NetworkItem icon={<FaUserFriends />} label="Connections" value="720" />
            <NetworkItem icon={<IoPersonSharp />} label="Followers" />
            <NetworkItem icon={<MdOutlineEmojiEvents />} label="Events" />
            <NetworkItem icon={<RiPagesLine />} label="Pages" />
            <NetworkItem icon={<MdGroups2 />} label="Groups" />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[70%] bg-white shadow-lg p-5 rounded-xl">
          <h1 className="border mb-5 rounded-lg text-center font-medium text-gray-600 py-2 text-lg">
            All my friends
          </h1>
          <div className={`${
              Object.entries(friends).length === 0
                ? "flex text-slate-500 italic justify-center items-center"
                : "sm:grid flex flex-col items-center grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6"
            }`}>
          {Object.entries(friends).map(([key, value]: [string, any]) => (
              <FollowCard
                desc={value?.description}
                id={key}
                key={key}
                name={value?.name}
                front={value?.profileimg}
                back={value?.backimg}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NetworkItem({ icon, label, value }: { icon: JSX.Element; label: string; value?: string }) {
  return (
    <div className="flex justify-between text-gray-600 px-4 py-2">
      <div className="flex items-center gap-3">
        {icon} <span>{label}</span>
      </div>
      {value && <span>{value}</span>}
    </div>
  );
}

function FollowCard({ id, name, desc, front, back }: any) {
  const [unfriended, setUnfriended] = useState(false);

  async function handleUnfriend() {
    try {
      const response = await axios.put(
        "http://localhost:3000/admin/unfriend",
        { id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.msg) {
        setUnfriended(true);
      }
    } catch (error) {
      console.error("Unfriend Error:", error);
      alert("Failed to unfriend");
    }
  }

  return (
    <div className="w-full sm:w-[240px] border rounded-xl shadow-lg bg-white flex flex-col h-[320px]">
      {/* Profile Header */}
      <div className="relative h-[80px]">
        <img className="object-cover w-full h-full rounded-t-lg" src={back || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s"} alt="Cover" />
        <img
          className="absolute w-20 h-20 rounded-full left-1/2 transform -translate-x-1/2 -bottom-8 border-4 border-white"
          src={front || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s"}
          alt="Profile"
        />
      </div>

      {/* Profile Content */}
      <div className="mt-10 text-center px-4 pb-4">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-gray-500 text-sm">{desc}</p>

        <button
          onClick={handleUnfriend}
          className={`w-full mt-3 py-2 rounded-lg font-semibold transition-all duration-150 ${
            unfriended
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
          disabled={unfriended}
        >
          {unfriended ? "Unfriended" : "Unfriend"}
        </button>
      </div>
    </div>
  );
}
