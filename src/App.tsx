import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import Header from './components/header'
import Login from './pages/login'
import Signup from './pages/signup'

import Home from './pages/home'
import Footer from './components/footer'
import Show from './pages/show'
import Notification from './pages/notifications'
import Notifyto from './pages/notifyto'
import People from './pages/people'
import Requests from './pages/requests'
import { MdFeedback } from 'react-icons/md'
import ReactDOM from 'react-dom';

import {  useState } from "react";
import axios from 'axios'
import { CiCircleCheck } from 'react-icons/ci'


import FeedbackSee from './pages/adminfeedback'
import Friends from './pages/friends'


function Feedpopup({setPopup}:any){
  return (
    
    <div className='flex flex-col text-black text-sm animate-comeleft font-[600] border-2 border-slate-300    bg-white rounded-2xl  fixed bottom-3 left-3 justify-center items-center p-4 shadow-lg gap-3 '>
      <div onClick={()=> setPopup(false)} className='font-bold cursor-pointer hover:text-blue-400' title='close popup'>X</div>
      <div className='flex gap-4 items-center'>
      Your feedback is submitted ..
      <CiCircleCheck className='text-green-500 text-4xl font-bold ' />
      </div>
    </div>
  )
}

function Feedback({ setOpen,setPopup }: any) {
  const [feedback, setFeedback] = useState('');
  const [featureType, setFeatureType] = useState('');
  
  

  return ReactDOM.createPortal(
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
        className="max-w-lg mx-4 sm:mx-auto p-6  border border-slate-300 bg-white rounded-lg shadow-lg"
      >
       
          
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          We care for your feedback
        </h2>
        <form  className=" space-y-4">
          <div>
            <label className="block text-lg text-slate-500 mb-2">Select Feedback Type</label>
            <select
              value={featureType}
              onChange={(e) => setFeatureType(e.target.value)}
              className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select...</option>
              <option value="profileFeatures">Profile Features</option>
              <option value="socialFeatures">Social Features (e.g., Friend Making)</option>
              <option value="fileUploading">File Uploading Features</option>
            </select>
          </div>

          <div>
            <label className="block text-lg text-slate-500 mb-2">Your Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              
              placeholder="Enter your feedback here..."
            ></textarea>
          </div>

          <div className="text-center">
            
            <button
            onClick={async(e)=>{
              e.preventDefault()
              try{
                const submitted = await axios({
                  url:"https://backend-s1z7.onrender.com/user/createfeedback",
                  method:"POST",
                  data:{
                    feedby:localStorage.getItem('userid'),
                    type:featureType,
                    feedback:feedback
                  },
                  headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
                })
                console.log(submitted)
                 if(submitted.data.msg){
                  setOpen(false)
                  setPopup(true)
                 }
                 
              }
              catch(err){
                alert(err)
              }
            }}
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body // Render the modal at the root of the document
  );
}
function App() {
  const[popup,setPopup] = useState(false)
  const [isopen,setOpen] = useState(false)
  
  
  // useEffect(()=>{
  //    const token = localStorage.getItem('token');
  //    if(token){
  //       try{
  //         const decoded = jwt.verify(token,SECRET_KEY) 
  //         if(decoded){
  //           setAuthenticated(true)
  //         }
  //       }
  //       catch(er){
  //         console.error("Invalid or expired token")
  //         localStorage.removeItem('token')
  //       }
  //    }
  // },[])

  

  const PrivateRoute = ({children}:{children:JSX.Element}) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to={'/login'} />
  }
 
  return (
    <div style={{ fontFamily: '"Roboto Mono", serif' }} className={`overflow-x-hidden flex  flex-col min-h-screen ${isopen  ? "blur-sm":''}`}>
      
      <BrowserRouter>
      <Header/>

      
      {location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/adminfeed' ? '':<div className='fixed bottom-3 right-3  z-50 '>
      <button onClick={()=> setOpen(true)} className='bg-white shadow-xl sm:px-5 px-2 py-1 sm:py-3 flex items-center gap-4 sm:text-xl font-[700] hover:bg-blue-500 hover:text-white transition-all duration-100  text-blue-500 border border-slate-300 rounded-lg'>Feedback <MdFeedback /></button>
      
      </div>}

      {popup ? <Feedpopup setPopup={setPopup}/>:''}
      
     
      <main className='flex-grow'>
      <Routes>
         <Route path='/login' element={<Login/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/' element = {<Home/>} />
         <Route path='/show' element = {<PrivateRoute><Show/></PrivateRoute>} />
         <Route path='/notify' element = {<PrivateRoute><Notification/></PrivateRoute>} />
         <Route path='/notifyto' element = {<PrivateRoute><Notifyto/></PrivateRoute>} />
         <Route path='/people' element = {<PrivateRoute><People/></PrivateRoute>} />
         <Route path='/requests' element = {<PrivateRoute><Requests/></PrivateRoute>} />
        
         <Route path='/adminfeed' element={<FeedbackSee/>} />
         <Route path='/friends' element={<PrivateRoute><Friends/></PrivateRoute>} />
         
         
       </Routes>
      </main>
     
       <Footer/>
      </BrowserRouter>

       {isopen && <Feedback setPopup={setPopup} setOpen = {setOpen}/>}  
    </div>
  )
}

export default App
