import { useLocation } from 'react-router-dom';
import Docimage from '/Eduarchive.webp';
import { FaHamburger } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { IoIosPeople } from 'react-icons/io';
import axios from 'axios';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { GiThreeFriends } from 'react-icons/gi';
import { MdOutlineCircleNotifications } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';

export default function Header() {
  const location = useLocation();
  const [ham, setHam] = useState(false);
  const [countup, setCountup] = useState('');
  const [countreq, setCountreq] = useState('');

  async function Countnotify() {
    const count = await axios({
      url: `http://localhost:3000/user/countnotify?userid=${localStorage.getItem('userid')}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const counti = await axios({
      url: `http://localhost:3000/user/counting?id=${localStorage.getItem('userid')}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (count) setCountup(count.data.count);
    if (counti) setCountreq(counti.data.count);
  }

  useEffect(() => {
    if (location.pathname === '/show') {
      Countnotify();
    }
  }, [location.pathname]);


  // scroll to that element..
  function scrollToSection(id:any){
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  }
  return (
    <div className=" mx-20 border-b   border-slate-500 bg-white">
      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-4 lg:px-32">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img src={Docimage} className="w-20 h-20 rounded-full shadow-lg" alt="EduArchive Logo" />
          <span style={{fontFamily:'"Bebas Neue", serif'}} className="text-2xl  lg:text-3xl tracking-widest font-extrabold font-serif cursor-pointer">
            <span className="text-blue-300 tracking-widest flex flex-col " style={{fontFamily:'"Bebas Neue", serif'}}>Edu </span>Archive
          </span>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <FaHamburger
          onClick={() => setHam((prev) => !prev)}
          className="sm:hidden text-3xl text-black block cursor-pointer"
        />

        {/* Desktop Navigation */}
        <div style={{ fontFamily: '"Roboto Mono", serif' }} className="hidden sm:flex items-center gap-6">
          {location.pathname.includes('/people') ||
          location.pathname.includes('/notify') ||
          location.pathname.includes('/requests') ||
          location.pathname.includes('/show')  || location.pathname.includes('/friends') || location.pathname.includes('/notifyto') || location.pathname.includes('/contributors') || location.pathname.includes('/notes') ? (
            <div className="flex gap-7" style={{ fontFamily: '"Roboto Mono", serif' }}>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => (window.location.href=('/show'))}
              >
                <RiHome2Line className="p-1 text-blue-600 border-2 border-blue-600 text-4xl rounded-full hover:text-white hover:bg-blue-600 transition-all duration-200" />
                <span className="text-slate-500 font-medium hover:text-black">Home</span>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => (window.location.href=('/people'))}
              >
                <IoIosPeople className="p-1 text-blue-600 border-2 border-blue-600 text-4xl rounded-full hover:text-white hover:bg-blue-600 transition-all duration-200" />
                <span className="text-slate-500 font-medium hover:text-black">People</span>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => (window.location.href=('/friends'))}
              >
                <LiaUserFriendsSolid className="p-1 text-blue-600 border-2 border-blue-600 text-4xl rounded-full hover:text-white hover:bg-blue-600 transition-all duration-200" />
                <span className="text-slate-500 font-medium hover:text-black">Friends</span>
              </div>
              <div
                className="flex relative flex-col items-center cursor-pointer"
                onClick={() => (window.location.href=('/requests'))}
              >
                <GiThreeFriends className="p-1 text-blue-600 border-2 border-blue-600 text-4xl rounded-full hover:text-white hover:bg-blue-600 transition-all duration-200" />
                <span className="text-slate-500 font-medium hover:text-black">Requests</span>
                {countreq ? (
                  <span className="w-5 h-5 absolute -top-1 right-2 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {countreq}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

       {location.pathname === '/' ?  <div className='hidden sm:flex gap-16 mr-12 items-center'>
            <span className='text-md cursor-pointer transition-all duration-300 hover:text-pink-600' onClick={()=>{
              scrollToSection('about')
            }}>About Us</span>
            <span onClick={()=>{
              scrollToSection('overview')
            }} className='text-md cursor-pointer transition-all duration-300 hover:text-pink-600'>Overview</span>
          </div>:''}
         

          {location.pathname !== '/' &&
          location.pathname !== '/login' &&
          location.pathname !== '/signup' &&
          location.pathname !== '/adminfeed' && location.pathname !== '/forgetpassword' ? (
            <div style={{ fontFamily: '"Roboto Mono", serif' }}
              onClick={() => {
                setCountup('');
                window.location.href=('/notify');
              }}
              className="flex relative items-center gap-5 cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <MdOutlineCircleNotifications className="p-1 text-blue-600 border-2 border-blue-600 text-4xl rounded-full hover:text-white hover:bg-blue-600 transition-all duration-200" />
                <span className="text-slate-500 font-medium hover:text-black">Notifications</span>
              </div>
              {countup ? (
                <span className="w-5 h-5 absolute -top-1 left-16 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {countup}
                </span>
              ) : null}
            </div>
          ) : null}

          <span style={{ fontFamily: '"Roboto Mono", serif' }}
            onClick={() => {
              if (['/show', '/notify', '/people', '/requests'].includes(location.pathname)) {
                localStorage.removeItem('userid');
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                window.location.href=('/');
              } else {
                window.location.href=('/login');
              }
            }}
            className=" border-2 border-black transition-all duration-300 px-4 py-2 rounded-md cursor-pointer hover:bg-black  hover:text-white"
          >
            {['/show', '/notify', '/people', '/requests','/friends','/notifyto','/contributors'].includes(location.pathname)
              ? 'Log Out'
              : 'Log In'}
          </span>
        </div>
      </div>

      {/* Mobile Menu (Hamburger Options) */}
      {ham && (
        <div className="sm:hidden animate-newheader border-t-2 border-slate-500  bg-slate-100 py-3 flex flex-col items-center gap-3">
          {/* Home */}
          <div
            onClick={() => {
              if(['/login','/signup','/','/forgetpassword'].includes(location.pathname)){
                window.location.href=('/')
                setHam(false);
              }
              else  {
                window.location.href = ('/show');
                setHam(false);
              }
             
               // Close menu after selection
            }}
            className="text-lg font-semibold text-black hover:text-blue-600 transition-all duration-200"
          >
            Home
          </div>

          {location.pathname === '/' ?  <div className='flex flex-col justify-center  ml-12  gap-4 mr-12 items-center'>
            <span className='text-md cursor-pointer hover:text-pink-600' onClick={()=>{
              scrollToSection('about')
            }}>About Us</span>
            <span onClick={()=>{
              scrollToSection('overview')
            }} className='text-md cursor-pointer hover:text-pink-600'>Overview</span>
          </div>:''}


          {/* People */}
          {location.pathname === '/signup' || location.pathname === ('/login') || location.pathname === ('/') || location.pathname === ('/adminfeed') || location.pathname === ('/forgetpassword')  ? '':<div 
            onClick={() => {
              window.location.href=('/people');
              setHam(false); // Close menu after selection
            }}
            className="text-lg font-semibold text-black hover:text-blue-600 transition-all duration-200"
          >
            People
          </div>}
          

          {location.pathname === '/signup' || location.pathname === ('/login') || location.pathname === ('/') || location.pathname === ('/adminfeed')  ? '':<div
            onClick={() => {
              window.location.href=('/friends');
              setHam(false); // Close menu after selection
            }}
            className="text-lg font-semibold text-black hover:text-blue-600 transition-all duration-200"
          >
            Friends
          </div>}
          {/* Friends */}
          

          {location.pathname === '/signup' || location.pathname === ('/login') || location.pathname === ('/') || location.pathname === ('/adminfeed')  ?   '': <div
            onClick={() => {
              window.location.href=('/requests');
              setHam(false); // Close menu after selection
            }}
            className="text-lg flex gap-3  font-semibold text-black hover:text-blue-600 transition-all duration-200"
          >
            Requests {countreq ? <span className='bg-red-500 w-7 h-7 items-center justify-center flex text-white rounded-full'>{countreq}</span>:''}
          </div>}
          {/* Requests */}
       

          {location.pathname === '/signup' || location.pathname === ('/login') || location.pathname === ('/') || location.pathname === ('/adminfeed') ? '':<div
            onClick={() => {
              window.location.href = ('/notify');
              setHam(false); // Close menu after selection
            }}
            className="text-lg font-semibold flex gap-3 text-black hover:text-blue-600 transition-all duration-200"
          >
            Notifications {countup ? <span className='bg-red-500 w-7 h-7 items-center justify-center flex text-white rounded-full'>{countup}</span>:''}
          </div>}
          {/* Notifications */}
          

          {/* Log In / Log Out */}
          <button
            onClick={() => {
              if (['/show', '/notify', '/people', '/requests','/friends','/notifyto'].includes(location.pathname)) {
                localStorage.removeItem('userid');
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                window.location.href = ('/');
                setHam(false);
              } else {
                window.location.href = '/login';
                setHam(false);
              }
            }}
            className="py-2 px-6 text-lg font-semibold bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            {['/show', '/notify', '/people', '/requests','/friends','/notifyto'].includes(location.pathname)
              ? 'Log Out'
              : 'Log In'}
          </button>
        </div>
      )}
    </div>
  );
}
