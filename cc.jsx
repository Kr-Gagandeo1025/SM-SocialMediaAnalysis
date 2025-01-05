"use client";
import React, { useState, useRef, useEffect } from "react";
import { GrSave, GrSend } from "react-icons/gr";
import { VscGraphLine } from "react-icons/vsc";
import { FaCopy, FaLink, FaMagnifyingGlassChart } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import { gsap } from "gsap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mockResponse from "./utils/mockResponse"; // Import mock response

export default function Hero() {
  const [showOutput, setShowOutput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionButtons, setActionButtons] = useState(false);

  const contentRef = useRef(null);
  const outputRef = useRef(null);

  const GetResponse = async () => {
    if (inputText !== "") {
      setLoading(true);

      // If in development, use the mock response, otherwise call the real API
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => {
          setOutputText(mockResponse.outputs[0].outputs[0].text);
          setActionButtons(true);
          setLoading(false);
        }, 1000); // Mock delay
      } else {
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/get-response" // Local development URL
            : "https://your-production-url/api/get-response"; // Production URL

        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputValue: inputText }),
          });

          if (!response.ok) throw new Error("API call failed.");

          const data = await response.json();
          if (data?.success) {
            setOutputText(data?.output);
            setActionButtons(true);
          } else {
            setOutputText("Sorry, I am not able to process your request right now. Please try again later.");
          }
        } catch (error) {
          console.error("Error fetching response:", error);
          setOutputText("An error occurred while fetching the response. Please try again later.");
        }

        setLoading(false);
      }
    } else {
      setOutputText("Hello, *I am your assistant*. How can I help you today?");
      setActionButtons(true);
    }
  };

  const handleSendClick = async () => {
    GetResponse();
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -100,
      scale: 1,
      animation: "ease-in-out",
      duration: 0.3,
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
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [showOutput]);

  return (
    <div className="flex flex-col items-center justify-center py-10 px-10 min-h-screen bg-gradient-to-r from-white via-orange-100 to-pink-200 w-screen pb-5">
      {!showOutput ? (
        <div ref={contentRef} className="content flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center md:w-[70%] w-full mt-10 gap-5">
            <h1 className="md:text-2xl text-xl font-bold text-gray-600">Hi👋 user,</h1>
            <h1 className="md:text-4xl text-2xl font-bold text-black text-wrap text-center">
              Want help with your Social Media Insights?
            </h1>
            <p className="text-gray-600 text-center font-thin text-lg mb-5">
              Ready to assist you with anything you need, from answering questions to reviewing your social media account.
              So let's get started!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center md:w-[70%] w-full mt-20">
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
          <div
            className="w-[90%] md:w-[70%] h-[380px] p-4 text-lg border rounded-lg shadow-md bg-white overflow-y-scroll"
          >
            {loading ? (
              <p className="animate-pulse text-gray-600 text-left text-lg">getting response...</p>
            ) : (
              <Markdown rehypePlugins={[remarkGfm]}>{outputText}</Markdown>
            )}
          </div>
        </div>
      )}

      {actionButtons && (
        <div className="flex items-center justify-end gap-3 h-fit p-2 mt-1 rounded-full w-[100%] md:w-[70%]">
          <button>
            <FaCopy className="text-3xl text-white bg-gray-800 p-2 rounded-xl" />
          </button>
          <button>
            <GrSave className="text-3xl text-white bg-gray-800 p-2 rounded-xl" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between bg-white h-fit p-2 mt-5 rounded-full w-[100%] md:w-[70%]">
        <input
          type="text"
          placeholder="Ask Anything..."
          className="w-full flex-1 bg-white rounded-3xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {!loading ? (
          <button
            onClick={handleSendClick}
            className="flex text-xl items-center justify-center ml-2 px-4 py-2 bg-orange-400 rounded-3xl font-bold text-white hover:text-gray-700 hover:bg-gray-400 active:bg-gray-500 transition-all duration-500 ease-in-out w-[50px] group hover:w-[120px]"
          >
            <GrSend className="text-xl" />
            <span className="text-[0px] text-gray-700 transition-all duration-500 ease-in-out group-hover:text-lg group-hover:ml-2">
              send
            </span>
          </button>
        ) : (
          <button className="bg-gray-700 p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <CgSpinner className="animate-spin text-2xl text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
