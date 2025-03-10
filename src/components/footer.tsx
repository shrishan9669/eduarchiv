

export default function Footer() {

  return (
    <footer
      style={{ fontFamily: '"Roboto Mono", serif' }}
      className="flex flex-col items-center justify-between bg-white   text-black border-t border-slate-300 md:space-y-0"
    >

      <div className="w-full h-16  flex justify-center text-white items-center bg-violet-500 ">
         &copy; 2025 Copyright : Ishan Shrivastava
      </div>

      <div className="flex px-4 md:px-6 md:flex-row flex-col gap-5 items-center bg-slate-800 text-white py-6    justify-between w-full">
{/* Left Section: Logo and Tagline */}
<div className="flex flex-col justify-start md:justify-center items-center md:items-start space-y-4  md:space-y-7">
        <h1
          style={{ fontFamily: '"Roboto Mono", serif' }}
          className="text-3xl text-white font-bold"
        >
          <span className="text-blue-600">Edu</span>Archive
        </h1>
        <p className="text-sm text-gray-400 max-w-96  text-center md:text-left">
        Your one-stop platform for past papers, study resources, and academic archives. Access, learn, and excel with ease! 🚀
        </p>
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-5 md:space-x-8">
        <h1 className="font-bold text-slate-500 ml-0 md:ml-7 border-b-2 py-2 hover:border-b-pink-600 transition-all duration-200">
          Links
        </h1>
        <div className="flex flex-col items-center md:items-start gap-4">
          <p
            onClick={() => {
              if(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/adminfeed' || location.pathname==='/forgetpassword'){
                window.location.href = '/'
              }
              else{
                window.location.href = '/show'
              }
            }}
            className="cursor-pointer hover:text-pink-600 transition-all duration-300 font-medium"
          >
            Home
          </p>
          <p className="cursor-pointer hover:text-pink-600 transition-all duration-300 font-medium">
            Contact Us
          </p>
          <p className="cursor-pointer hover:text-pink-600 transition-all duration-300 font-medium">
            Terms
          </p>
          <p onClick={()=> {
            if(localStorage.getItem('token') != ''){
              window.location.href = '/contributors'
            }
            else{
              window.location.href = '/login'
            }
          }} className="cursor-pointer hover:text-pink-600 transition-all duration-300 font-medium">
            Contributors
          </p>
          <p className="cursor-pointer hover:text-pink-600 transition-all duration-300 font-medium">
            College
          </p>
        </div>
      </div>

      {/* Right Section: Social Links */}
      <div className="flex flex-col items-center md:items-start space-y-4">
        <p className="text-sm text-slate-500 border-b-2 py-2 hover:border-b-pink-600 transition-all duration-200">
          Follow Us
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="#"
            className="hover:text-pink-400  transition-all duration-300"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-pink-400  transition-all duration-300"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-pink-400  transition-all duration-300"
          >
            Instagram
          </a>
        </div>
      </div>
      </div>

      
    </footer>
  );
}
