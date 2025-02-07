import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Loader from "../components/loader"
import { IoMdCheckmarkCircleOutline, IoMdDownload } from "react-icons/io"
import { Circularloader } from "./show"
import { MdDelete, MdEdit, MdPreview } from "react-icons/md"

export default function Notes() {
    const [subject,setSubject]  = useState('')
    const [semester,setSemester] = useState('')
    const [course,setCourse] = useState('')
    const [data,setData] = useState([])
    const[buf,setBuffer] = useState(false)
    const[buf1,setBuf1] = useState(false)
    
    const[right,SetRight] = useState(false)
    const[uploadCourse,setUploadcourse] = useState('')
    const[uploadsemester,setUploadSemester] = useState('')
    
    const [file,setFile] = useState<File | null>(null)
    
    async function handlefileupload(){
        if(!uploadCourse || !uploadsemester || !subject){
            alert("Please select all fields!!")
            return ;
        }
        if(!file){
            alert("Please select a file");
            return ;
        }
        const formData = new FormData();
        const userid = localStorage.getItem('userid');
         console.log(file)
        formData.append('pdf',file);
        
        formData.append("course", uploadCourse.toLowerCase());
        formData.append("semester", uploadsemester);
        formData.append("subject", subject.toLowerCase());
        // formData.append('customName',`${subject.toLowerCase() + (type == 'mst' ? 'mst':'')}`)
        formData.append('studentid',userid || "")

        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

       
       
        try{

          const response = await axios({
                url:'https://backend-j5f0.onrender.com/user/postnote',
                method:"POST",
                data:formData,
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            alert(`${response.data.msg } `);
            alert(`Total contributions are ${response.data.totalcontributions}`)
            SetRight(true)
            setTimeout(()=>{
                SetRight(false)
            },5000)
        }
        catch(err){
            console.error("Error uploading file:", err);
            alert("Error uploading file!");
        }
        finally{
             setBuf1(false)
        }
    }
   
    function handleclick(e:any){
       
        setCourse(e.target.innerText.toLowerCase());
    }

    const[userdata,setUserdata] = useState([])
    const[yourbuffer,setYourbuffer]  = useState(false)
     
    function CircularLoader()  {
        return (
          <div className="flex justify-center items-center ">
            <div className="w-10  border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        );
      };
      
      const targetRef = useRef<HTMLDivElement>(null);
      const [highlight,setHighlight] = useState(false)
      const scrollToElement = () => {
        if (targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: "smooth" });
           setHighlight(true)
        }

        setTimeout(()=>{
          setHighlight(false)
        },2000)
      };

      const [background,setBackground] = useState<string | null>(null)
      const[profile,setProfile] = useState<string | null>(null)

    async function handlebackground(event:React.ChangeEvent<HTMLInputElement>){
      console.log("in function")
      const file = event.target.files?.[0]
      if(!file) return ;

      const reader = new FileReader()
      reader.onload = async(e:any)=>{
        const byteData = e.target?.result as string
        setBackground(byteData)

        await axios({
          url:'https://backend-j5f0.onrender.com/user/backimage',
          method:"POST",
          data:{
            id:localStorage.getItem('userid'),
            backimg:byteData 
          },
          headers:{'Content-Type':'application/json',"Authorization":`Bearer ${localStorage.getItem('token')}`},
          
         });
       
      }
      reader.readAsDataURL(file)

    }
    async function handleprofile(event:React.ChangeEvent<HTMLInputElement>){
      console.log("in profile")
      const file = event.target.files?.[0]
      if(!file) return ;

      const reader = new FileReader()
      reader.onload = async(e:any)=>{
        const byteData = e.target?.result as string
        setProfile(byteData)

        await axios({
          url:'https://backend-j5f0.onrender.com/user/profileimage',
          method:"POST",
          data:{
            id:localStorage.getItem('userid'),
            frontimg:byteData
          },
          headers:{'Content-Type':'application/json',"Authorization":`Bearer ${localStorage.getItem('token')}`},
          
         });
       
      }
      reader.readAsDataURL(file)

    }

    useEffect(()=>{
      async function Getimages(){
        try{
          const images =await axios({
            url:"https://backend-j5f0.onrender.com/user/getimage",
            params:{id:localStorage.getItem('userid')},
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
  
          console.log(images.data.front);
          console.log(images.data.back);
          if(images.data ){
            
          setBackground(images.data.back)
            setProfile(images.data.front)
            
          }
  
        }
        catch(err){
  
        }
      }

      Getimages()
    },[])

    const[user_desc,setDesc] = useState('')
    const[user_name,setName] = useState('')
    const[contri,setContri] = useState('')


    async function Users(){
      try{
        const user = await axios({
          url:`https://backend-j5f0.onrender.com/user/userinfo?id=${localStorage.getItem('userid')}`,
          method:'GET',
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })

        if(user.data && user.data.userinfo){
              setDesc(user.data.userinfo.description);
              setName(user.data.userinfo.name)
              setContri(user.data.userinfo.contributions)
        }
      }
      catch(err){
        console.error(err)
        alert(err)
        
      }
    }

    useEffect(()=>{
      Users()
    },[])

    return (
        <div className="w-[95%]">
          {/* Image section */}
          <div className="w-full mt-10 mb-10">
  <div className="mx-6 md:mx-24 border-[1px] transition-all duration-150 hover:border-blue-500 rounded-lg">
    {/* Background image div */}
    <div className="w-full relative rounded-t-lg h-60 sm:h-80">
      <img
        className="h-full w-full object-fill rounded-t-lg"
        src={background || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s'}
        
      />
      <MdEdit
        title="Change background image"
        className="cursor-pointer absolute top-3 left-3 text-3xl sm:text-4xl text-blue-600 border-b-2 rounded-full p-1"
        onClick={() => document.getElementById('file-input')?.click()}
      />
      <input
        type="file"
        id="file-input"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handlebackground}
      />
    </div>

    {/* Profile image and name */}
    <div className="relative -mt-20 sm:-mt-24 flex justify-center sm:justify-start px-6 sm:px-24">
      <div className="relative">
        <img
          className="w-32 h-32 sm:w-44 sm:h-44 border-4 border-black rounded-full"
          src={profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&s'}
          
        />
        <MdEdit
          title="Change profile image"
          className="cursor-pointer absolute bottom-1 right-1 text-3xl sm:text-4xl text-blue-600 shadow-lg border-b-2 rounded-full p-1"
          onClick={() => document.getElementById('file-profile')?.click()}
        />
        <input
          type="file"
          id="file-profile"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleprofile}
        />
      </div>
    </div>

    {/* User Info */}
    <div className="mt-12 px-6 sm:px-24 flex flex-col sm:flex-row justify-between items-center sm:items-start">
      <div>
        <span style={{ fontFamily: '"Roboto Mono", serif' }} className="font-serif font-bold text-2xl sm:text-3xl flex items-center gap-3">
          {user_name}
          <span className="text-sm font-normal font-sans text-slate-400">(He/Him)</span>
        </span>
        <p className="text-slate-500 text-center sm:text-left">{user_desc}</p>
      </div>

      {/* Reward Points */}
      <div className="flex flex-col items-center mt-6 sm:mt-0">
        <div className="animate-rotate-3d">
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-white text-2xl sm:text-3xl font-serif bg-black rounded-full mb-3">
            {contri}
          </div>
        </div>
        <span style={{ fontFamily: '"Roboto Mono", serif' }} className="text-lg sm:text-2xl font-serif">Total Points</span>
      </div>
    </div>
  </div>
</div>

                    <div className="h-auto mt-16 px-6 md:px-24 flex flex-col md:flex-row w-full gap-5">
  {/* Course div */}
  <div className="flex hover:border-blue-500 transition-all duration-100 justify-center flex-col items-center p-4 md:p-6 rounded-lg shadow-lg w-full md:w-1/2 border">
    <span className="text-lg md:text-2xl font-bold  text-black mb-4 md:mb-6">
      Courses:
    </span>
    <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
      <button
        onClick={handleclick}
        className="py-2 px-3 md:px-5 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        BCA
      </button>
      <button
        onClick={handleclick}
        className="py-2 px-3 md:px-5 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        MCA
      </button>
      <button
        onClick={handleclick}
        className="py-2 px-3 md:px-5 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        MSC
      </button>
      <button
        onClick={handleclick}
        className="py-2 px-3 md:px-5 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        MTECH
      </button>
    </div>
  </div>

  {/* Semester div */}
  <div className="flex hover:border-blue-500 transition-all duration-100 justify-center flex-col items-center p-4 md:p-6 rounded-lg shadow-lg w-full md:w-1/2 border">
    <span className="text-lg md:text-2xl font-bold  text-black mb-4">
      Semester:
    </span>
    <input
      onChange={(e) => setSemester(e.target.value)}
      type="number"
      className="w-full md:max-w-sm border-2 border-gray-300 rounded-lg py-2 px-3 md:px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
      placeholder="Enter semester number..."
    />
  </div>
</div>

{/* Responsive2 */}

<div className="flex mt-32 flex-col lg:flex-row items-start pr-10  md:pr-10 md:ml-4 gap-6 p-4 md:p-6">
{/* Left Section */}
<div className="w-full hover:border-yellow-500 transition-all duration-100 lg:w-[30%] mx-4 lg:ml-10 border p-6 rounded-lg shadow-lg flex flex-col">
  <div className="mb-4">
    <span className="text-lg font-bold text-gray-700">
      {"Subject: " + course}
    </span>
    <br />
    <span className="text-lg font-bold text-gray-700">
      {"Semester: " + semester}
    </span>
  </div>
  <button
    onClick={async () => {
      if (!semester || !course) {
        alert("Please fill course and semester fields!");
      } else {
        setBuffer(true);
        try {
          const data = await axios({
            url: `https://backend-j5f0.onrender.com/user/findnotes?semester=${Number(
              semester
            )}&course=${course}`,
            method: "GET",
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log(data.data);
          if (data.data) {
            setData(data.data.notes);
          }
        } catch (err) {
          console.error("Error in frontend while getting PDFs! ->", err);
          alert("Failed to fetch PDFs. Please try again later.");
        } finally {
          setBuffer(false);
        }
      }
    }}
    className={`text-white py-3 ${
      buf ? "bg-blue-400" : "bg-green-500 hover:bg-green-400"
    } rounded-full font-bold transition duration-300`}
  >
    {buf ? <Loader /> : "Find Notes"}
  </button>
</div>

{/* Right Section */}
<div
  ref={targetRef}
  className={`w-full lg:w-[70%] hover:border-yellow-500  transition-all duration-100 mx-4 lg:mr-10 p-6 rounded-lg shadow-lg grid grid-cols-1 border md:grid-cols-2 gap-6 ${
    highlight
      ? "bg-slate-600 border-4 border-slate-500"
      : ""
  }`}
>
  {/* Type Selection */}
  

  {/* Semester Input */}
  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6" title="Semester number">
    <label htmlFor="semester" className="text-gray-700 font-medium">
      Semester:
    </label>
    <input
      type="number"
      id="semester"
      max="10"
      placeholder="Enter semester..."
      onChange={(e) => setUploadSemester(e.target.value)}
      className="w-full md:w-auto border border-gray-400 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </div>

  {/* Course Selection */}
  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6" title="Select course">
    <label htmlFor="course" className="text-gray-700 font-medium">
      Course:
    </label>
    <select
      id="course"
      onChange={(e) => setUploadcourse(e.target.value.toLowerCase())}
      className="w-full md:w-auto border border-gray-400 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    >
      <option value="none">None</option>
      <option value="bca">BCA</option>
      <option value="mca">MCA</option>
      <option value="msc">MSC</option>
      <option value="mtech">MTECH</option>
    </select>
  </div>

  {/* Subject Selection */}
  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6" title="Select subject">
    <label htmlFor="subject" className="text-gray-700 font-medium">
      Subject:
    </label>
    <select
      id="subject"
      onChange={(e) => {
        console.log(e.target.value);
        setSubject(e.target.value.toLowerCase());
      }}
      className="w-full md:w-auto border border-gray-400 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    >
      <option value="none">None</option>
      <option value="dsa">DSA</option>
      <option value="mis">MIS</option>
      <option value="accounts">ACCOUNTS</option>
      <option value="dm">DM</option>
      <option value="stats">STATS</option>
    </select>
  </div>

  {/* File Upload */}
  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
    <label htmlFor="file" className="text-gray-700 font-medium">
      Select PDF:
    </label>
    <input
      type="file"
      id="file"
      accept="application/pdf"
      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      className="mt-2 w-full md:w-auto  rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
  </div>

  {/* Upload Button */}
  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 mt-4">
    <button
      onClick={() => {
        setBuf1(true);
        handlefileupload();
      }}
      className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
    >
      {buf1 ? <Loader /> : "Upload File"}
    </button>
    {right && (
      <IoMdCheckmarkCircleOutline className="text-green-600 text-3xl" />
    )}
  </div>
</div>
</div>

{/* Responsive3 */}
<div className="mt-6 flex justify-start">
<button
  onClick={async () => {
    setYourbuffer(true);
    try {
      const data = await axios({
        url: `https://backend-j5f0.onrender.com/user/yournotes?id=${localStorage.getItem("userid")}`,
        method: "GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      });

      if (data.data.all) {
         
        console.log(data.data.all);
        
        setUserdata(data.data.all);
        
      }
     
    } catch (err) {
      alert(err);
    } finally {
      setYourbuffer(false);
    }
  }}
  className="py-3 px-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-bold shadow-lg hover:from-orange-600 hover:to-red-700 transition duration-300 ml-10"
>
  {yourbuffer ? <CircularLoader /> : "Your Notes"}
</button>
</div>

   
   <div className="border border-t-0 border-b-2 border-l-0 border-r-0 mt-20">

   </div>

   {/* Users cards */}
   <div className="flex flex-col mx-4 md:mx-10 lg:mx-14 gap-6 md:gap-8 lg:gap-10 mt-5 md:mt-7 p-4 md:p-6 bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg rounded-lg">
{/* Title Section */}
<span className="text-lg bg-blue-200 text-blue-900 w-fit px-3 md:px-4 py-2 rounded-lg font-bold  shadow-md hover:scale-105 transform transition duration-300">
  <span className="text-blue-950 underline">Your</span> Docs Stay Here
</span>

{/* Cards Section */}
<div className="flex flex-wrap gap-4 md:gap-6 justify-center">
  {userdata.map((each: any) => (
    <Cardyours

      key={each.id}
      subject={each.subject}
      pdfid={each.id}
      type={each.type}
      drivelink={each.pdf}
    />
  ))}
</div>
</div>




     {/* Cards div */}
     <div className="pl-6 mb-10  md:pl-10 lg:pl-14 gap-7 mt-6 md:mt-10 mx-6 md:mx-10 lg:mx-14 py-4 md:py-5 flex flex-col bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl shadow-xl">
{/* Title Section */}
<span className="text-lg bg-blue-100 text-blue-900 w-fit px-4 py-2 rounded-lg font-bold  shadow-md hover:scale-105 transform transition duration-300">
  <span className="text-blue-950 underline">All</span> Docs Stay Here
</span>

{/* Docs Grid */}
<div className="flex flex-wrap pr-10 gap-4 md:gap-6 justify-center">
  {data.length > 0 ? (
    data.map((e: any) => (
      <div
        key={e.id}
        className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
      >
        <Cardall subject={e.subject} type={e.type} pdfid={e.id} drivelink={e.pdf} />
      </div>
    ))
  ) : (
    <span className="text-gray-500 italic text-center w-full">
      No documents available.
    </span>
  )}
</div>

{/* Add PDFs Button */}
{data.length > 0 && (
  <div className="flex pr-14 md:pr-0 justify-center w-full mt-8 md:mt-10">
    <button
      onClick={scrollToElement}
      className="font-bold text-white bg-green-500 hover:bg-green-400 py-3 px-10 md:px-12 rounded-lg shadow-md transition duration-300"
    >
      Add PDFs +
    </button>
  </div>
)}
</div>


        </div>
    )
}
function Cardyours({ subject, pdfid, type ,drivelink}: any) {
    const [delbuffer, setDelBuffer] = useState(false);
    
  
   
  
    return (
      <div className="w-64 h-80 shadow-lg rounded-xl flex flex-col bg-gradient-to-b from-white to-gray-100 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition duration-300">
        <div
          className={`h-48 rounded-t-xl flex flex-col justify-center items-center ${
            type === 'mst' ? 'bg-yellow-400' : 'bg-blue-500'
          } text-white text-center`}
        >
          {delbuffer ? (
            <Circularloader />
          ) : (
            <MdDelete
              onClick={async () => {
                if (delbuffer) {
                  setDelBuffer(false);
                } else setDelBuffer(true);
                try {
                  const res1 = await axios({
                    url: `https://backend-j5f0.onrender.com/user/deletenotes?id=${pdfid}`,
                    method: 'DELETE',
                    headers:{
                      Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                  });
  
                  const res2 = await axios({
                    url: `https://backend-j5f0.onrender.com/user/reduceContrinew?userid=${localStorage.getItem('userid')}`,
                    method: 'GET',
                    headers:{
                      Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                  });
  
                  alert(
                    `${res1.data.msg} and updated contributions are ${res2.data.totalcontributions}`
                  );
                } catch (err) {
                  alert(`Error while deleting-> ${err}`);
                } finally {
                  setDelBuffer(false);
                }
              }}
              className="mb-3 hover:text-red-600 cursor-pointer text-3xl transition duration-300"
              title="Delete Document"
            />
          )}
          <span className="font-bold text-lg">{subject.toUpperCase()}</span>
          <span className="text-sm mt-1">
            {"Type: "}
            <span className="font-medium">{type}</span>
          </span>
        </div>
        <div className="flex justify-around items-center h-24 bg-gray-50 rounded-b-xl">
          {/* Priveiw anchor tag */}
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
                          document.getElementById(`downloadnote-${pdfid}`)?.click()
                      }}
                      className="text-2xl text-gray-600 cursor-pointer hover:text-green-500 transition duration-300"
                    />
                      <a href={drivelink} id={`downloadnote-${pdfid}`} download target="_blank" className="hidden"></a>
          
                   </div>
        </div>
  
     
      </div>
    );
}
 function Cardall({ subject, pdfid, type ,drivelink}: any) {
  
  return (
    <div className="w-64 h-80 shadow-lg rounded-xl flex flex-col bg-gradient-to-b from-white to-gray-100 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <div
        className={`h-48 rounded-t-xl flex flex-col justify-center items-center ${
          type === 'mst' ? 'bg-yellow-400' : 'bg-blue-500'
        } text-white text-center`}
      >
        <span className="font-bold text-lg">{subject.toUpperCase()}</span>
        <span className="text-sm mt-1">
          {"Type: "}
          <span className="font-medium">{type}</span>
        </span>
      </div>
      <div className="flex justify-around items-center h-24 bg-gray-50 rounded-b-xl">
      <div className="flex flex-col">
                      <MdPreview
                        onClick={() => {
                           document.getElementById(`previewnote-${pdfid}`)?.click()
                        
                        }}
                        title="See Preview"
                        className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500 transition duration-300"
                      />
                      <a href={drivelink} id={`previewnote-${pdfid}`} target="_blank" className="hidden"></a>
                    </div>
                    <div>
                  <IoMdDownload
                      title="Download"
                      onClick={async () => {
                          document.getElementById(`downloadnote-${pdfid}`)?.click()
                      }}
                      className="text-2xl text-gray-600 cursor-pointer hover:text-green-500 transition duration-300"
                    />
                      <a href={drivelink} id={`downloadnote-${pdfid}`} download target="_blank" className="hidden"></a>
          
                   </div>
      </div>

      
    </div>
  );
}
