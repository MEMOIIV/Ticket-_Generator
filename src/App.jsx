
// import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Ticket from "./Components/Ticket/Ticket";
function App() {
  const savedData = localStorage.getItem("formData");
const [data, setData] = useState([]);

    // Fetch data from localStorage
    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);
  return (
    <div className={`back_Ground  relative  ${savedData ? "h-lvh" : ""}`}>
      <div className={`line   ${savedData ? "h-lvh" : ""}`}>
      <div className=" lg:pt-8 md:pt-8 sm:pt-12 xs:pt-20 ">
          {savedData ? (
            <div className="text-white">
              <div className="w-[60%] mx-auto text-center">
              <div className="w-full">
            <img
              src="/images/logo-full.svg"
              className="w-32 mb-6 mt-2 mx-auto"
            />
          </div>

          <div className="lg:text-2xl md:text-2xl sm:text-2xl xs:text-[1.2rem] xs:font-semibold   text-white">
            <p>Congrats, <span className="bg-gradient-to-r from-colorLogo to-customGradientWhite  bg-clip-text text-transparent">
              {data.username} !</span></p>
            <p> your ticket is ready. </p>
          </div>
              <p className="pt-5 lg:w-[34%] md:w-[75%] sm:w-[85%] xs:w-[90%] mx-auto text-gray-400 text-sm">
                We&apos;ve emailed your ticket to <span className="text-colorLogo cursor-pointer"><a href={`mailto:${data.email}`} target="_blank">{data.email}</a></span> and will send updates in the
                run up to the event
              </p>
              </div>
              
            </div>
          ) : (
            <div className="text-white">
            <div className="w-[60%] mx-auto   text-center">
            <div className="w-full">
          <img
            src="/images/logo-full.svg"
            className="w-32 mb-6 mx-auto"
          />
        </div>

        <div className="lg:text-2xl md:text-2xl sm:text-2xl xs:text-1xl xs:font-semibold   text-white">
          <h1>Your Journey to Coding Conf</h1>
          <p>20<span className="text-colorLogo">25</span> Starts Here!</p>
        </div>
        
            <p className="pt-3 lg:w-[70%] md:w-[75%] sm:w-[85%] xs:w-full mx-auto">
              Secure your spot at year&apos;s biggest coding conference
            </p>
            </div>
            
          </div>
          )}
        
      </div>
      {savedData ? <Ticket /> : <Home />}
      </div>
      
      
        <img src="../public/images/pattern-squiggly-line-bottom.svg" alt="line"
        className="w-[30%] absolute bottom-0 left-0 "/>
      
        <img src="../public/images/pattern-squiggly-line-top.svg" alt="line"
        className="w-[25%] absolute top-16 left-[70%]"/>
      
      
      
        <img src="../public/images/pattern-circle.svg" alt="line"
        className="w-[12%] absolute top-[50%] left-[65%] bg-transparent"/>
      
    </div>
  );
}

export default App;