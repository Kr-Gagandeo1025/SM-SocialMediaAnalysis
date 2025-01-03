import React from "react";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-white via-orange-100 to-pink-200 p-5 fixed w-screen z-10 top-0 left-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="Brainwave.png" alt="icon" className=""/>
          <span className="ml-2 text-gray-900 font-bold text-2xl">SocialScope</span>
        </div>
        <div className="flex items-center">
          <img src="user.png" alt="user" className="h-8 rounded-full"/>
        </div>
      </div>
    </div>
  );
}
