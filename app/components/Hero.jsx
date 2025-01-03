"use client";
import React, { useState, useRef, useEffect } from "react";
import { GrSend } from "react-icons/gr";
import { VscGraphLine } from "react-icons/vsc";
import { FaLink, FaMagnifyingGlassChart } from "react-icons/fa6";
import { gsap } from "gsap";

export default function Hero() {
  const [showOutput, setShowOutput] = useState(false);

  const contentRef = useRef(null);
  const outputRef = useRef(null);

  const handleSendClick = () => {
    console.log("Send button clicked!");

    
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      onComplete: () => {
        setShowOutput(true);
      },
    });
  };

  useEffect(() => {
    if (showOutput) {
    
      gsap.fromTo(
        outputRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [showOutput]);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-10 min-h-screen bg-gradient-to-r from-white via-orange-100 to-pink-200 w-screen pb-5">
      
      {!showOutput ? (
        <div ref={contentRef} className="content flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out">
          <div className="flex flex-col items-center justify-center md:w-[70%] w-full mt-24 gap-5">
            <h1 className="md:text-3xl text-xl font-bold text-gray-600">Hi👋 user,</h1>
            <h1 className="md:text-5xl text-3xl font-bold text-black text-wrap text-center">
              Want help with your Social Media Insights?
            </h1>
            <p className="text-gray-600 text-center font-thin text-lg mb-5">
              Ready to assist you with anything you need, from answering questions to reviewing your social media account.
              So let's get started!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:w-[60%] w-full mt-32">
            <div className="flex w-full items-center justify-between overflow-x-scroll gap-4">
              <div className="bg-white p-6 border rounded-2xl h-[200px] md:w-[250px] min-w-[250px] flex flex-col items-start justify-between">
                <VscGraphLine className="text-5xl text-white bg-gray-800 p-2 rounded-xl" />
                <h3 className="text-gray-800 text-xl font-normal">Social Media Metrics That Matter in 2025</h3>
                <p className="text-gray-400 text-xs font-normal mt-1">Key Insights for Growth</p>
              </div>
              <div className="bg-white p-6 border rounded-2xl h-[200px] md:w-[250px] min-w-[250px] flex flex-col items-start justify-between">
                <FaMagnifyingGlassChart className="text-5xl text-white bg-gray-800 p-2 rounded-xl" />
                <h3 className="text-gray-800 text-xl font-normal">Analytics Tools: What Sets Us Apart</h3>
                <p className="text-gray-400 text-xs font-normal mt-1">Powerful Differentiators</p>
              </div>
              <div className="bg-white p-6 border rounded-2xl h-[200px] md:w-[250px] min-w-[250px] flex flex-col items-start justify-between">
                <FaLink className="text-5xl text-white bg-gray-800 p-2 rounded-xl" />
                <h3 className="text-gray-800 text-xl font-normal">Content Trends Driving Engagement in 2025</h3>
                <p className="text-gray-400 text-xs font-normal mt-1">Data-Backed Insights</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={outputRef}
          className="output w-full flex flex-col items-center justify-center h-full mt-0 opacity-100 transition-all duration-500 ease-in-out"
        >
          <textarea
            className="w-[90%] md:w-[70%] h-[280px] p-4 text-lg placeholder-gray-500 border rounded-lg shadow-md opacity-100 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Output prompt will appear here..."
          ></textarea>
        </div>
      )}

  
      <div className="flex items-center justify-between bg-white h-fit p-2 mt-10 rounded-full w-[80%] md:w-[50%]">
        <input
          type="text"
          placeholder="Ask Anything..."
          className="w-full flex-1 bg-white rounded-3xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          onClick={handleSendClick}
          className="flex text-xl items-center justify-center ml-2 px-4 py-2 bg-orange-400 rounded-3xl font-bold text-white hover:text-gray-700 hover:bg-gray-400 active:bg-gray-500 transition-all duration-500 ease-in-out w-[50px] group hover:w-[120px]"
        >
          <GrSend className="text-xl" />
          <span className="text-[0px] text-gray-700 transition-all duration-500 ease-in-out group-hover:text-lg group-hover:ml-2">
            send
          </span>
        </button>
      </div>
    </div>
  );
}
