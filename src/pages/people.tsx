import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoMdPersonAdd, IoMdTime } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { MdGroups2, MdOutlineEmojiEvents } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function People() {
  const [data, setData] = useState([]);

  async function Getnonfriends() {
    const data = await axios({
      url: `https://backend-j5f0.onrender.com/user/getpeople?userid=${localStorage.getItem(
        "userid"
      )}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(data.data);
    if (data.data && data.data.nonfriends) {
      setData(data.data.nonfriends);
    }
  }

  useEffect(() => {
    Getnonfriends();
  }, []);

  const [withdraw, setWithdraw] = useState(false);

  return (
    <div
      className={`p-10 ${
        withdraw ? "backdrop-blur-lg" : ""
      } relative w-full h-auto bg-[#f3f2ef] flex justify-center`}
    >
      {withdraw && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50" />
          {/* Withdraw Element */}
          <Withdraw setWithdraw={setWithdraw} />
        </>
      )}

      <div className="w-full md:w-[80%] flex gap-10 z-30 flex-col md:flex-row">
        {/* left div */}
        <div className="max-h-[300px] border-2 bg-white shadow-lg rounded-xl py-2 w-full md:w-[30%]">
          <h1 className="border-b p-3 ml-2 text-slate-500 text-md">
            Manage my network
          </h1>
          {/* elements */}
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

        {/* right div */}
        <div className="w-full md:w-[70%] border-2 h-auto bg-white pl-5 pr-5 py-2 rounded-xl flex-col">
          <h1 className="border mb-5 rounded-lg flex justify-center font-[500] text-slate-500 py-2 text-lg">
            To follow
          </h1>
          <div
            className={`${
              data.length === 0
                ? "flex text-slate-500 italic justify-center items-center"
                : "sm:grid flex flex-col items-center grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-11"
            }`}
          >
            {data.length > 0
              ? data.map((each: any) => {
                  return (
                    <Followcard
                      setWithdraw={setWithdraw}
                      front={each.profileimg}
                      back={each.backimg}
                      name={each.name}
                      desc={each.description    }
                      id={each.id}
                    />
                  );
                })
              : "No data yet"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Followcard({ name, id,desc, setWithdraw, front, back }: any) {
  const [got, setGot] = useState(false);

  return (
    <div key={id} className=" w-[230px] border rounded-lg">
      {/* backimage */}
      <div className="h-[33%] relative">
        <img
          className="object-cover rounded-t-lg w-full h-full"
          src={back || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s'}
          alt=""
        />
        <img
          className="absolute w-24 rounded-full left-16 bottom-4 top-14 h-24"
          src={front}
          alt=""
        />
      </div>

      {/* down div */}
      <div className="h-[85%] py-14 flex flex-col justify-between">
        <div className="flex flex-col justify-start">
          <span className="font-bold text-xl ml-4">{name}</span>
          <p className="text-slate-500 ml-4 w-auto">{desc}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={async () => {
              if (!got) {
                const sending = await axios({
                  url: "https://backend-j5f0.onrender.com/user/sendreq",
                  method: "POST",
                  data: {
                    sender: localStorage.getItem("userid"),
                    receiver: id,
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
              }
            }}
            className={`px-14 rounded-full mt-4 hover:border-2 font-[600] hover:bg-blue-100 hover:text-blue-900 transition-all duration-100 border-blue-700 border ${
              got
                ? "hover:border-2 hover:border-slate-800 hover:bg-slate-200"
                : ""
            } text-blue-700 items-center flex py-1`}
          >
            {!got ? (
              <span className="flex hover:text-blue-800 gap-2 items-center">
                <IoMdPersonAdd />
                Connect
              </span>
            ) : (
              <span
                onClick={() => setWithdraw(true)}
                className="flex w-full h-full gap-2 hover:text-slate-900 items-center text-slate-500 "
              >
                <IoMdTime className="text-xl" />
                Pending
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Withdraw({ setWithdraw }: any) {
  return (
    <div
      style={{ transform: "translate(-50%,-50%)" }}
      className="bg-white fixed top-[50%] left-[50%] z-50 flex flex-col gap-20 shadow-xl p-3 rounded-lg"
    >
      <div className="flex justify-between items-center gap-10">
        <span className="text-xl border-b-2 font-[600] px-4">
          Withdraw invitation
        </span>
        <RxCross2
          onClick={() => setWithdraw(false)}
          className="rounded-full transition-all duration-150 p-1 text-4xl text-slate-700 cursor-pointer hover:text-black hover:bg-slate-100 "
        />
      </div>

      <div className="flex justify-end">
        <div className="flex gap-3">
          <button
            onClick={() => setWithdraw(false)}
            className="px-3 rounded-full hover:border-2 hover:bg-blue-100 hover:text-blue-900 transition-all duration-100 border-blue-700 border text-blue-700 items-center flex py-1"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                const deleted = await axios({
                  url: `https://backend-j5f0.onrender.com/user/declinereq?rowid=${localStorage.getItem(
                    "profileid"
                  )}`,
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });

                if (deleted.data && deleted.data.msg) {
                  alert(deleted.data.msg);
                  window.location.href = "/people";
                }
              } catch (err) {
                alert(err);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-3 text-white font-[600]"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
