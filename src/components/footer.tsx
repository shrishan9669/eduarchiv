import { useNavigate } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();
  return (
    <footer
      style={{ fontFamily: '"Roboto Mono", serif' }}
      className="flex flex-col md:flex-row items-center justify-between bg-white py-6 px-4 md:px-10 text-black border-t border-slate-300 space-y-6 md:space-y-0"
    >
      {/* Left Section: Logo and Tagline */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <h1
          style={{ fontFamily: '"Roboto Mono", serif' }}
          className="text-3xl text-black font-bold"
        >
          <span className="text-blue-600">Edu</span>Archive
        </h1>
        <p className="text-sm text-gray-400 text-center md:text-left">
          Your one-stop platform for past papers.
        </p>
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-5 md:space-x-8">
        <h1 className="font-bold text-slate-500 ml-0 md:ml-7 border-b-2 py-2 hover:border-b-pink-600 transition-all duration-200">
          Links
        </h1>
        <div className="flex flex-col items-center md:items-start gap-4">
          <p
            onClick={() => nav("/")}
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
          <p className="cursor-pointer hover:text-pink-600 transition-all duration-300 font-medium">
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
            className="hover:text-pink-400 text-black transition-all duration-300"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-pink-400 text-black transition-all duration-300"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-pink-400 text-black transition-all duration-300"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}