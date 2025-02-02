import { FaFilePdf } from "react-icons/fa";
import { TbPdf } from "react-icons/tb";
import { useEffect, useState } from "react";
import { WiDirectionUpRight } from "react-icons/wi";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [displayedText, setDisplayedText] = useState(""); // Track displayed text
  const fullText = "AAccess Past Year Question Papers and Notes"; // Full text to display

  const [newtext, setNewtext] = useState(""); // Track displayed text
  const fullTextnew =
    "Streamline your preparation with a comprehensive collection of previous semester papers.";

    useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length-1) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        
        let newindx = -1// Stop interval once the full text is displayed
        const newinterval = setInterval(()=>{
          if (newindx < fullTextnew.length-1) {
            setNewtext((prev) => prev + fullTextnew[newindx]);
            newindx++;
          } 
          else{
            clearInterval(newinterval)
          }
        },50)
      }
    }, 50); // Adjust speed of appearance (in milliseconds)

    return () => clearInterval(interval); // Clean up on unmount
  }, []);


  const { ref, inView } = useInView({ threshold: 0.9 });
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.9 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.9 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.9 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.9 });

  const nav = useNavigate()
  return (
    <div className="flex flex-col w-screen items-center justify-between">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row border border-b-2 border-t-0 w-full mt-20 items-center justify-between px-5 md:px-16">
        <div className="flex flex-col p-8 items-center md:items-start text-center md:text-left space-y-8 max-w-2xl">
          <h1
            style={{ fontFamily: '"Roboto Mono", serif' }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            {displayedText}{" "}
            <span style={{ fontFamily: '"Roboto Mono", serif' }} className="text-blue-500">
              {displayedText === fullText && <TbPdf className="inline-block ml-3 text-black" />}
            </span>
          </h1>
          <p
            style={{ fontFamily: '"Roboto Mono", serif' }}
            className="text-sm md:text-lg text-slate-500"
          >
            {newtext}{" "}
          </p>
          <button
            onClick={() => {
             nav('/login')
            }}
            className="px-6 py-3 rounded-full bg-blue-500 hover:bg-red-600 text-white font-semibold text-sm md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ fontFamily: '"Roboto Mono", serif' }}
          >
            Get Started
          </button>
        </div>
        {/* Right Section */}
          <div className="relative " >
        <div className="flex items-center  justify-center h-[300px] md:h-[500px] mt-10 md:mt-0">
            <FaFilePdf className="text-blue-600   text-[100px] md:text-[250px] drop-shadow-lg" />
            <div className="absolute top-[40%] left-[15%] bg-white rounded-full w-6 h-6 md:w-10 md:h-10 opacity-25 blur-xl" />
            <div className="absolute top-[70%] left-[30%] bg-red-500 rounded-full w-4 h-4 md:w-6 md:h-6 opacity-50 blur-xl" />
          </div>
        </div>  
      </div>

      {/* Cards Section */}
      <div style={{ fontFamily: '"Roboto Mono", serif' }} className="w-full flex flex-col gap-24 py-20 mt-20">
        {/* First Card */}
        <div ref={ref} className="px-5  md:px-20 mb-20">
          <div
            className={`transition-all duration-300 ${
              inView ? "opacity-100 shadow-blue-200 translate-x-0" : "opacity-0 -translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Make account and get ready to leverage <span className="text-blue-500">Notes</span>{" "}
              and <span className="text-blue-500">Papers</span>.
            </p>
            <button
              onClick={() => (nav ("/signup"))}
              className="mt-5 bg-blue-500 flex items-center px-4 py-2 rounded-full text-white text-sm md:text-lg"
            >
              Make My Account <WiDirectionUpRight className="text-[24px] ml-2" />
            </button>
          </div>
        </div>

        {/* Second Card */}
        <div ref={ref1} className="flex justify-center md:px-10">
          <div
            className={`transition-all duration-300 ${
              inView1 ? "opacity-100 shadow-blue-200 translate-x-0" : "opacity-0 translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Upload your <span className="text-blue-500">File</span> by filling the fields like
              semester, course, and subject.
            </p>
          </div>
        </div>

        {/* Third Card */}
        <div ref={ref2} className="px-5 md:px-20 mt-20 mb-20">
          <div
            className={`transition-all duration-300 ${
              inView2 ? "opacity-100 shadow-blue-200 translate-x-0" : "opacity-0 -translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              See Uploaded papers and notes related to{" "}
              <span className="text-blue-500">Courses</span> and{" "}
              <span className="text-blue-500">Semester</span>.
            </p>
          </div>
        </div>

        {/* Fourth Card */}
        <div ref={ref3} className="flex justify-center px-5 md:px-10">
          <div
            className={`transition-all duration-300 ${
              inView3 ? "opacity-100 shadow-blue-200 translate-x-0" : "opacity-0 translate-x-10"
            } h-[240px] flex flex-col items-center justify-center text-center shadow-xl rounded-3xl border border-slate-300 bg-white`}
          >
            <p className="w-[90%] font-bold text-lg md:text-xl">
              Contribute to the Archive and increase your{" "}
              <span className="text-blue-500">Reward points</span>.
            </p>
          </div>
        </div>

        {/* Fifth Card */}
        <div ref={ref4} className="px-5 md:px-20 ">
          <div
            className={`transition-all duration-300 ${
              inView4 ? "opacity-100 shadow-blue-200 translate-x-0" : "opacity-0 -translate-x-10"
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
