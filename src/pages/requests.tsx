import axios from "axios";
import { useEffect, useState } from "react";

export default function Requests() {
  const [requests, setRequests] = useState({});

  async function Getincoming() {
    const all = await axios({
      url: `https://backend-j5f0.onrender.com/user/getpending?userid=${localStorage.getItem("userid")}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(all.data);
    if (all.data && all.data.obj) {
      setRequests(all.data.obj);
    }
  }

  useEffect(() => {
    Getincoming();
  }, []);

  return (
    <div className="min-h-screen flex justify-center bg-[#f3f2ef] px-4">
      <div className="flex flex-col my-10 border bg-white rounded-lg w-full max-w-3xl">
        <h1 className="flex p-3 border-b-2 text-black font-[600] pl-5 text-lg justify-start">
          Invitations {"(" + Object.keys(requests).length + ")"}
        </h1>
        <div className="flex flex-col gap-4 p-4">
          {/* rendering incoming requests */}
          {Object.entries(requests).map(([key, value]: [string, any]) => (
            <Arequest
              key={key}
              id={key}
              userid={value.id}
              desc={value.description}
              name={value.name}
              front={value.profileimg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import useSound from "use-sound";
function Arequest({ name, id, userid , desc, front }: any) {
  const [play] = useSound("/dinsound.mp3");
  const [msg, setMsg] = useState("");

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 p-4 bg-white shadow-md rounded-lg">
      {/* image, name, and description */}
      <div className="flex gap-4 items-center w-full md:w-auto">
        <img className="w-16 h-16 md:w-20 md:h-20 rounded-full" src={front || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s"} alt="" />
        <div className="flex flex-col">
          <span className="font-semibold text-lg md:text-xl">{name}</span>
          <p className="text-slate-500 text-sm md:text-base">
            {desc}
          </p>
        </div>
      </div>

      {/* ignore and accept buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <button
          onClick={async () => {
            const ignored = await axios({
              url: `https://backend-j5f0.onrender.com/user/declinereq?rowid=${id}`,
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            console.log(ignored);
            if (ignored.data.msg) {
              // Optional: Display a message
            }
          }}
          className="text-slate-700 hover:text-slate-800 transition-all duration-200"
        >
          Ignore
        </button>
        <button
          onClick={async () => {
            const accepting = await axios({
              url: `https://backend-j5f0.onrender.com/user/acceptreq?rowid=${id}`,
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            const notify = await axios({
              url: "https://backend-j5f0.onrender.com/user/sendnotification",
              method: "POST",
              data: {
                giveid: localStorage.getItem("userid"),
                userid: userid,
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            console.log(notify);
            console.log(accepting);
            if (accepting.data.msg) {
              setMsg("Accepted");
              play();
            }
          }}
          className={`px-4 py-2 rounded-full text-blue-600 font-medium border border-blue-600 hover:border-blue-800 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 ${msg ? "bg-blue-600 text-white" : ""}`}
        >
          {msg ? msg : "Accept"}
        </button>
      </div>
    </div>
  );
}
