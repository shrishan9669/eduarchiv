import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { WiDirectionUpRight } from "react-icons/wi";
import { useInView } from "react-intersection-observer";

export default function Home() {
  

  

  const { ref, inView } = useInView({ threshold: 0.9 });
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.9 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.9 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.9 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.9 });

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <div className="flex flex-col w-screen items-center relative justify-between">
      {visible && (
        <div onClick={scrollToTop} className="cursor-pointer">
          <FaArrowUp className="fixed right-6 bottom-5 cursor-pointer bg-orange-400 rounded-full w-8 p-2 text-white h-8" />
        </div>
      )}

      {/* Hero Section */}
      <div
      
      className="flex flex-col  h-auto w-full mt-10 md:mt-3 items-center justify-between  ">
        {/* Left Section - Text */}
        <div className="relative mb-10 bg-cover bg-center bg-[url(https://themewagon.github.io/Mentor/assets/img/hero-bg.jpg)] flex flex-col p-8 items-center md:items-start h-[580px] text-center space-y-8 w-full">
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/35"></div>

  <h1
    style={{ fontFamily: '"Roboto Mono", serif' }}
    className="text-2xl sm:text-3xl md:text-5xl absolute top-36 max-w-[90%] md:max-w-[490px] text-white left-5 sm:left-10 md:left-20 font-extrabold leading-tight z-10"
  >
    Access past years papers and notes.
  
  </h1>

  <p
    style={{ fontFamily: '"Roboto Mono", serif' }}
    className="text-xs sm:text-sm md:text-lg top-60 md:top-72 max-w-[90%] md:max-w-[680px] text-slate-200 ml-5 sm:ml-10 absolute z-10"
  >
    Streamline your preparation with a comprehensive collection of previous semester papers.
  </p>

  <div className="flex justify-center md:justify-start absolute top-80 md:top-96 left-1/2 md:left-[100px] transform -translate-x-1/2 md:translate-x-0 w-full z-10">
    <button
      onClick={() => {
        window.location.href = "/login";
      }}
      className="px-6 py-3 rounded-full bg-inherit border border-white hover:bg-black/45  text-white font-semibold text-xs sm:text-sm md:text-lg shadow-lg hover:shadow-xl transition-all duration-500"
      style={{ fontFamily: '"Roboto Mono", serif' }}
    >
      Get Started
    </button>
  </div>
</div>



        {/* Right Section - Image and About Us */}
        <div className="relative w-full md:w-[1200px] mb-10 md:mb-96 transition-all duration-200">
          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1461710727236-2366afa21725?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGRmfGVufDB8fDB8fHww"
            className="w-full h-auto md:h-[650px]  transition-all duration-300 shadow-2xl drop-shadow-lg"
            alt="PDF Illustration"
          />

          {/* About Us Section */}
          <div
          
            id="about"
            className="absolute md:mx-36 md:p-20 p-6 border border-r-0 hover:border-b-pink-600 border-l-0 mb-3 transition-all duration-200 md:-bottom-[420px] -bottom-[550px] bg-white w-full md:w-auto"
          >
            <h1
              className="flex justify-center text-3xl font-bold tracking-wider mb-10"
              style={{ fontFamily: '"Bebas Neue", serif' }}
            >
              About Us
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              Welcome to{" "}
              <span className="text-blue-400 font-bold">EDU ARCHIVE</span>, a dynamic
              platform designed to empower students by making academic resources
              accessible, organized, and collaborative. Our mission is to create a
              centralized hub where students can upload, share, and access past year
              question papers and notes with ease.
            </p>
            <br />
            <p className="text-slate-600 text-sm md:text-base">
              At EDU ARCHIVE, we believe in the power of peer-driven learning. By
              creating an account, students can contribute valuable study materials,
              stay updated on new uploads, and connect with friends to enhance their
              academic experience. Our platform fosters a community-driven approach,
              ensuring that knowledge is shared, preserved, and easily available for
              everyone.
            </p>
            <br />
            <p className="text-slate-600 text-sm md:text-base">
              Join us in reshaping the way students collaborate and prepare for
              exams—because learning is better when we do it together! 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div
        id="overview"
        style={{ fontFamily: '"Roboto Mono", serif' }}
        className="w-full flex mt-[540px] flex-col gap-20 sm:py-10 sm:mt-10"
      >
        {/* Side Lines of Overview */}
        <div className="flex items-center justify-center">
          <div className="h-1 w-[20%] sm:w-[30%] md:w-[500px] mr-4 sm:mr-20 border-t border-slate-500"></div>
          <h1 className="flex justify-center font-bold text-2xl underline text-blue-400">
            Overview
          </h1>
          <div className="h-1 w-[20%] sm:w-[30%] md:w-[500px] ml-4 sm:ml-20 border-t border-slate-500"></div>
        </div>

        {/* Cards Section */}
        <div ref={ref} className="px-5  md:px-20 md:mb-10">
          <div
            className={`transition-all duration-300 ${
              inView ? "opacity-100 shadow-blue-200 border-blue-800 border translate-x-0" : "opacity-0 -translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Make account and get ready to leverage{" "}
              <span className="text-blue-500">Notes</span> and{" "}
              <span className="text-blue-500">Papers</span>.
            </p>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="mt-5 border-2 flex items-center px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-200 text-sm md:text-lg"
            >
              Make My Account <WiDirectionUpRight className="text-[24px] ml-2" />
            </button>
          </div>
        </div>

        <div ref={ref1} className="flex justify-center md:px-10">
          <div
            className={`transition-all duration-300 ${
              inView1 ? "opacity-100 shadow-blue-200 border-blue-800 border translate-x-0" : "opacity-0 -translate-x-10"
            } h-[240px] flex flex-col items-center justify-center mx-5 md:mx-0 text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Upload your <span className="text-blue-500">File</span> by filling the fields like
              semester, course, and subject.
            </p>
            <div className="flex gap-3 items-center mt-5 border-2 rounded-lg transition-all duration-200 px-2 py-2 hover:bg-black hover:text-white">
              <button
                onClick={() => {
                  if (localStorage.getItem("token") !== "") {
                    window.location.href = "/show";
                  } else {
                    window.location.href = "/login";
                  }
                }}
                className="cursor-pointer"
              >
                Upload
              </button>
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>

        <div ref={ref2} className="px-5 md:px-20 md:mt-10 md:mb-10">
          <div
            className={`transition-all duration-300 ${
              inView2 ? "opacity-100 shadow-blue-200 border-blue-800 border translate-x-0" : "opacity-0 -translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              See Uploaded papers and notes related to{" "}
              <span className="text-blue-500">Courses</span> and{" "}
              <span className="text-blue-500">Semester</span>.
            </p>
          </div>
        </div>

        <div ref={ref3} className="flex justify-center px-5 md:px-10">
          <div
            className={`transition-all duration-300 ${
              inView3 ? "opacity-100 shadow-blue-200 border-blue-800 border translate-x-0" : "opacity-0 translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Contribute to the Archive and increase your{" "}
              <span className="text-blue-500">Reward points</span>.
            </p>
          </div>
        </div>

        <div ref={ref4} className="px-5 md:px-20">
          <div
            className={`transition-all duration-300 ${
              inView4 ? "opacity-100 shadow-blue-200 border-blue-800 border translate-x-0" : "opacity-0 -translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Connect with your <span className="text-blue-500">Friends</span> and get{" "}
              <span className="text-blue-500">Updates</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
