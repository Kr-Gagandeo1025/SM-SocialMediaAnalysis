'use client'
import React, { useEffect, useState } from "react";
import { generateUsername } from "unique-username-generator";
import { FiSidebar } from "react-icons/fi";


export default function Navbar({sidebaraction, sidebarstate}) {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    const user = generateUsername("-");
    setUsername(user)
  },[])
  return (
    <div className="bg-gradient-to-r from-white via-orange-100 to-pink-200 px-5 py-1 fixed w-screen z-10 top-0 left-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="Brainwave.png" alt="icon" className=""/>
          <div className="ml-2 text-gray-900 font-bold text-2xl flex flex-col items-start justify-center">
            <h1 className="text-2xl">Social Scope</h1>
            <h1 className="text-sm font-bold text-gray-600">Hi👋 {username}</h1>
          </div>
        </div>
        <div className="flex items-center justify-center p-2 bg-white rounded-full cursor-pointer" onClick={()=>sidebaraction(!sidebarstate)}>
          <FiSidebar className="text-2xl"/>
        </div>
      </div>
    </div>
  );
}
