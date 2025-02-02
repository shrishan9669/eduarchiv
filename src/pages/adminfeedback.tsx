import axios from "axios";
import { useState } from "react";

export default function FeedbackSee() {
  const [profile, setProfile] = useState([]);
  const [social, setSocial] = useState([]);
  const [upload, setUpload] = useState([]);
  let val1 = 1;
  let val2 = 1;
  let val3 = 1;

  const [paskey, setPaskey] = useState("");
  const [see, setSee] = useState(false);
  return (
    <div className="p-5 bg-[#f3f2ef] min-h-screen flex flex-col items-center">
      {/* Admin pass key */}
      {see ? (
        <div className="w-full max-w-4xl">
          {/* Profile features type */}
          <div className="bg-white rounded-lg shadow-lg py-5 px-4 mb-10">
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-full text-white font-bold bg-blue-500 hover:bg-blue-400"
                onClick={async () => {
                  try {
                    const feeds = await axios({
                      url: `https://backend-j5f0.onrender.com/user/getfeed?type=profileFeatures`,
                      method: "GET",
                    });

                    if (feeds.data && feeds.data.feeds) {
                      setProfile(feeds.data.feeds);
                    }
                  } catch (err) {
                    alert(err);
                  }
                }}
              >
                Get Feedbacks
              </button>
            </div>

            <h1 className="text-center font-bold text-2xl mt-4">Profile Features</h1>
            <div className="flex flex-col items-center gap-3 mt-5">
              {profile.map((each:any) => {
                return (
                  <div key={each.id} className="flex gap-3 w-full">
                    <span className="font-bold">{val1++}.</span>
                    <p>{each.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social features type */}
          <div className="bg-white rounded-lg shadow-lg py-5 px-4 mb-10">
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-full text-white font-bold bg-blue-500 hover:bg-blue-400"
                onClick={async () => {
                  try {
                    const feeds = await axios({
                      url: `https://backend-j5f0.onrender.com/user/getfeed?type=socialFeatures`,
                      method: "GET",
                    });

                    if (feeds.data && feeds.data.feeds) {
                      setSocial(feeds.data.feeds);
                    }
                  } catch (err) {
                    alert(err);
                  }
                }}
              >
                Get Feedbacks
              </button>
            </div>

            <h1 className="text-center font-bold text-2xl mt-4">Social Features</h1>
            <div className="flex flex-col items-center gap-3 mt-5">
              {social.map((each:any) => {
                return (
                  <div key={each.id} className="flex gap-3 w-full">
                    <span className="font-bold">{val2++}.</span>
                    <p>{each.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload features type */}
          <div className="bg-white rounded-lg shadow-lg py-5 px-4">
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded-full text-white font-bold bg-blue-500 hover:bg-blue-400"
                onClick={async () => {
                  try {
                    const feeds = await axios({
                      url: `https://backend-j5f0.onrender.com/user/getfeed?type=fileUploading`,
                      method: "GET",
                    });

                    if (feeds.data && feeds.data.feeds) {
                      setUpload(feeds.data.feeds);
                    }
                  } catch (err) {
                    alert(err);
                  }
                }}
              >
                Get Feedbacks
              </button>
            </div>

            <h1 className="text-center font-bold text-2xl mt-4">Uploading Files</h1>
            <div className="flex flex-col items-center gap-3 mt-5">
              {upload.map((each:any) => {
                return (
                  <div key={each.id} className="flex gap-3 w-full">
                    <span className="font-bold">{val3++}.</span>
                    <p>{each.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <label htmlFor="passkey" className="text-lg font-medium">
            Enter admin passkey:
          </label>
          <input
            type="text"
            id="passkey"
            onChange={(e) => setPaskey(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
          <button
            onClick={() => {
              if (paskey === "admin_ishan") {
                setSee(true);
              } else setSee(false);
            }}
            className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-400"
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
}
