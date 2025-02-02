import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { MdPreview } from "react-icons/md";
import { useLocation } from "react-router-dom";

export default function Notifyto() {
  const location = useLocation();
  const { contentid, contenttype, giveid }: any = location.state || {};
  const [name, setName] = useState("");
  const [front, setFront] = useState<string | null>(null);
  const [content, setContent] = useState({
    subject: "",
    id: "",
    type: "",
  });

  async function Profiledetails() {
    const profile = await axios({
      url: `https://backend-j5f0.onrender.com/user/getprofile?id=${giveid}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (profile.data) {
      setName(profile.data.profile.name);
      setFront(profile.data.profile.profileimg);
    }
  }

  async function Contentdetails() {
    if (contenttype === "papers") {
      const content = await axios({
        url: `https://backend-j5f0.onrender.com/user/getpaper?id=${contentid}`,
        method: "GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(content.data.content)
      if (content.data) {
        setContent(content.data.content);
      }
    } else {
      const content = await axios({
        url: `https://backend-j5f0.onrender.com/user/getnote?id=${contentid}`,
        method: "GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });
      if (content.data) {
        setContent(content.data.content);
      }
    }
  }

  useEffect(() => {
    if (contenttype !== "req") {
      Contentdetails();
    }
    Profiledetails();
  }, []);

  return (
    <div className="min-h-screen flex justify-center bg-[#f3f2ef] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col my-10 border bg-white rounded-lg w-full max-w-4xl">
        {contenttype === "req" ? (
          <h1 className="flex justify-center items-center text-2xl sm:text-3xl font-bold mt-10 text-slate-500">
            Person who accepted your request
          </h1>
        ) : (
          <h1 className="flex justify-center items-center text-2xl sm:text-3xl font-bold text-slate-500 mt-4">
            Post
          </h1>
        )}

        {contenttype === "req" ? (
          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="p-2 bg-blue-500 rounded-full">
              <img
                className="w-24 h-24 sm:w-40 sm:h-40 rounded-full"
                src={front || undefined}
                alt="Profile image"
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-bold">{name || ""}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                className="w-24 h-24 sm:w-40 sm:h-40 rounded-full"
                src={front || undefined}
                alt="Profile"
              />
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-slate-500 text-lg">Uploader:</span>
                <span className="text-2xl sm:text-4xl font-bold">{name}</span>
              </div>
            </div>

            <div className="mt-8 w-full flex justify-center">
              <Cardall subject={content?.subject} pdfid={content?.id} type={contenttype} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Cardall({ subject, pdfid, type }: any) {
  
  
  const[drivelink,setDrivelink] = useState('')
  if(type ==='papers'){
    async function Findpdf(){
      try{
        const The_pdf = await axios({
          url:`https://backend-j5f0.onrender.com/admin/findpdflink?id=${pdfid}`,
          method:"GET",
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(The_pdf.data.link)
        setDrivelink(The_pdf.data.link)
  
      }
      catch(err){
        console.log(err)
        alert(err)
      }
    }
    useEffect(()=>{
      if(pdfid) Findpdf()
    },[])
  }
  else{
    console.log("Pdf is here",pdfid)
    async function Findpdf(){
      if (!pdfid) {
        console.error("PDF ID is missing!");
        return;
      }
      try{
        const The_pdf = await axios({
          url:`https://backend-j5f0.onrender.com/admin/findnotelink?id=${pdfid}`,
          method:"GET",
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(The_pdf.data.link)
        setDrivelink(The_pdf.data.link)
  
      }
      catch(err){
        console.log(err)
        alert(err)
      }
    }
    useEffect(()=>{
      if(pdfid){
        Findpdf()
      }
    },[])
  }
  return (
    <div className="w-full max-w-xs sm:max-w-sm shadow-lg rounded-xl flex flex-col bg-gradient-to-b from-white to-gray-100 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <div
        className={`h-32 sm:h-48 rounded-t-xl flex flex-col justify-center items-center ${
          type === "mst" ? "bg-yellow-400" : "bg-blue-500"
        } text-white text-center`}
      >
        <span className="font-bold text-lg sm:text-xl">{subject?.toUpperCase()}</span>
        <span className="text-sm mt-1">
          {"Type: "}
          <span className="font-medium">{type}</span>
        </span>
      </div>
      <div className="flex justify-around items-center h-20 sm:h-24 bg-gray-50 rounded-b-xl">
      <div className="flex flex-col">
                      <MdPreview
                        onClick={() => {
                           document.getElementById('previewnote-click')?.click()
                        
                        }}
                        title="See Preview"
                        className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500 transition duration-300"
                      />
                      <a href={drivelink} id="previewnote-click" target="_blank" className="hidden"></a>
                    </div>
                    <div>
          <IoMdDownload
                      title="Download"
                      onClick={async () => {
                          document.getElementById('downloadnote-click')?.click()
                      }}
                      className="text-2xl text-gray-600 cursor-pointer hover:text-green-500 transition duration-300"
                    />
                      <a href={drivelink} id="downloadnote-click" download target="_blank" className="hidden"></a>
          
                   </div>
      </div>

      
    </div>
  );
}
