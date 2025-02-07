import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const nav = useNavigate();

  async function Getnotifications() {
    const all = await axios({
      url: `https://backend-j5f0.onrender.com/user/getNotifications?userid=${localStorage.getItem("userid")}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(all.data.all)
    if (all.data) {
      setNotifications(all.data.all);
    }
  }

  useEffect(() => {
    Getnotifications();
  }, []);

  function dateConversion() {
    const a = "2024-12-31T15:43:00.111Z";
    const arr = a.split("-");
    const number = new Date().getDate();
    const created = Number(arr[2].substring(0, 2));
    return number >= 1 && created <= 31
      ? 31 - created + number
      : number - created;
  }

  const [dot, setDot] = useState(0);

  function Deletenotification(id:any) {
    return (
      <div className="absolute h-[60px] flex items-center transition-all bg-white shadow-xl duration-300 justify-center left-4 sm:left-14 rounded-lg">
        <div className="flex items-center justify-center gap-3 sm:gap-5 w-full">
          <MdDeleteOutline
            onClick={async () => {
              const deleted = await axios({
                url: `https://backend-j5f0.onrender.com/user/deletenotification?id=${id}`,
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              if (deleted.data.msg) {
                alert(deleted.data.msg);
                nav("/notify");
              }
            }}
            className="text-2xl sm:text-3xl hover:text-slate-600"
          />
          <h1 className="w-[100px] sm:w-[140px] text-slate-400 text-sm sm:text-base">
            Delete notification
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#f3f2ef] px-2 sm:px-6">
      {/* Notification Div */}
      <div
        className={`flex flex-col ${
          notifications?.length === 0
            ? "justify-center items-center italic font-bold"
            : ""
        } my-10 border bg-white rounded-lg w-full max-w-[95%] sm:max-w-3xl lg:max-w-4xl`}
      >
        {notifications?.length > 0
          ? notifications.map((each:any) => (
              <div
                key={each.id}
                className={`flex rounded-t-lg p-2 sm:p-4 cursor-pointer items-center border-b-2 border-slate-200 ${
                  each.seen ? "bg-white" : "bg-blue-200"
                } justify-between`}
              >
                {/* Blue Dot */}
                {!each.seen && (
                  <div className="h-2 w-2 sm:h-3 sm:w-3 mr-2 sm:mr-3 bg-blue-600 rounded-full"></div>
                )}

                <img
                  onClick={async () => {
                    await axios({
                      url: `https://backend-j5f0.onrender.com/user/changeseen?id=${each.id}`,
                      method: "PUT",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    });

                    nav("/notifyto", {
                      state: {
                        contenttype: each.contenttype,
                        contentid: each.contentid,
                        giveid: each.giveid,
                      },
                    });
                  }}
                  className="w-14 h-14 sm:w-20 sm:h-20 ml-2 sm:ml-5 rounded-full"
                  src={each.profileimg}
                  alt="Sender's Profile"
                />
                <p
                  onClick={async () => {
                    await axios({
                      url: `https://backend-j5f0.onrender.com/user/changeseen?id=${each.id}`,
                      method: "PUT",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    });

                    nav("/notifyto", {
                      state: {
                        contenttype: each.contenttype,
                        contentid: each.contentid,
                        giveid: each.giveid,
                      },
                    });
                  }}
                  className="flex text-center justify-center px-2 sm:px-14 w-full p-2 sm:p-4 rounded-lg text-sm sm:text-base"
                >
                  {each.content}
                </p>
                {/* Time and Options */}
                <div className="flex relative justify-center flex-col items-center">
                  <span className="text-slate-500 text-xs sm:text-sm">
                    {dateConversion() >= 7
                      ? `${Math.floor(dateConversion() / 7)}w`
                      : `${dateConversion()}d`}
                  </span>
                  <PiDotsThreeCircleLight
                    onClick={() =>
                      dot === each.id ? setDot(0) : setDot(each.id)
                    }
                    className="text-3xl sm:text-4xl hover:bg-slate-100 transition-all duration-150 rounded-full p-1 cursor-pointer"
                  />

                  {dot === each.id && <Deletenotification id={each.id} />}
                </div>
              </div>
            ))
          : "No notifications yet"}
      </div>
    </div>
  );
}
