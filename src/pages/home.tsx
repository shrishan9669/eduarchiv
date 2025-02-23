import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";


export default function Home() {
  

  

  // const { ref, inView } = useInView({ threshold: 0.9 });
  // const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.9 });
  // const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.9 });
  // const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.9 });
  // const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.9 });

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


  useEffect(() => {
    const handleScroll = () => {
      const overview = document.getElementById('feature');
      const cards = document.querySelectorAll('.card');
      const rect = overview?.getBoundingClientRect();
  
      if (rect &&  rect.top < window.innerHeight * 0.75) {
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('opacity-100', 'scale-100');
          }, index * 100); // Delay each card animation
        });
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  id="feature"
  style={{ fontFamily: '"Roboto Mono", serif' }}
  className="w-full flex flex-col gap-10 mb-10 sm:mb-0 sm:py-10 mt-[540px] sm:mt-10"
>
  {/* Side Lines of Overview */}
  <div className="flex items-center justify-center">
    <div className="h-1 w-[20%] sm:w-[30%] md:w-[500px] mr-4 sm:mr-20 border-t border-slate-500"></div>
    <h1 className="font-bold text-2xl underline text-blue-400">Features</h1>
    <div className="h-1 w-[20%] sm:w-[30%] md:w-[500px] ml-4 sm:ml-20 border-t border-slate-500"></div>
  </div>

  {/* Cards Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5" id="cards-container">
    {[
      {
        text: "Make account and get ready to leverage Notes and Papers.",
        buttonText: "Make My Account",
        link: "/signup",
        bgImage: "https://images.unsplash.com/photo-1622993361017-180360aea82c?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        text: "Upload your File by filling the fields like semester, course, and subject.",
        buttonText: "Upload",
        link: "/show",
        bgImage: "https://plus.unsplash.com/premium_photo-1664300791530-6461a618c0a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVwbG9hZCUyMGZpbGVzfGVufDB8fDB8fHww"
      },
      {
        text: "See Uploaded papers and notes related to Courses and Semester.",
        bgImage: "https://images.unsplash.com/photo-1603053847153-65b11031a6fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhZCUyMHBhcGVyc3xlbnwwfHwwfHx8MA%3D%3D"
      },
      {
        text: "Contribute to the Archive and increase your Reward points.",
        bgImage: "https://images.unsplash.com/photo-1671469899829-8c1c400f5866?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbnRyaWJ1dGUlMjBhbmQlMjByZXdhcmR8ZW58MHx8MHx8fDA%3D"
      },
      {
        text: "Connect with your Friends and get Updates.",
        bgImage: "https://plus.unsplash.com/premium_photo-1664440922744-5ecdf4907b0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29ubmVjdHxlbnwwfHwwfHx8MA%3D%3D"
      }
    ].map((card, index) => (
      <div key={index} className="w-full flex justify-center opacity-0 transform scale-90 transition-all duration-700 delay-[${index * 200}ms] card">
        <div
          style={{
            backgroundImage: `url(${card.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className={`h-[300px] w-full max-w-[500px] flex flex-col items-center justify-center text-center shadow-xl border border-slate-300 bg-white p-5 rounded-lg `}
        >
          <p className="w-[90%] font-bold text-2xl text-white">{card.text}</p>
          {card.buttonText && (
            <button
              onClick={() => (window.location.href = card.link)}
              className="mt-5 border-2 px-4 py-3 rounded-full text-white hover:bg-black hover:text-white transition-all duration-200 text-lg"
            >
              {card.buttonText}
            </button>
          )}
        </div>
      </div>
    ))}
  </div></div>

    </div>
  );
}
