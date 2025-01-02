import React from "react";

export default function Hero() {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen overflow-y-hidden bg-gradient-to-r from-white via-orange-100 to-pink-200">
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Hi, Social Media User</h1>
        <p className="text-gray-600 text-center font-normal text-lg mb-5">Ready to assist you with anything you need, from answering questions<br/> to revewing your social media account. So let's get started!</p> 
      </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-6 border rounded-md">
            <h3 className="text-gray-800 text-xl font-bold">Social Media Metrics<br/> That Matter in 2025</h3>
            <p className="text-gray-400 text-xs font-normal mt-1">Key Insights for Growth</p>
          </div>
          <div className="bg-white p-6 border rounded-md">
            <h3 className="text-gray-800 text-xl font-bold">Analytics Tools: What<br/> Sets Us Apart</h3>
            <p className="text-gray-400 text-xs font-normal mt-1">Powerful Differentiators</p>
          </div>
          <div className="bg-white p-6 border rounded-md">
            <h3 className="text-gray-800 text-xl font-bold">Content Trends Driving<br/> Engagement in 2025</h3>
            <p className="text-gray-400 text-xs font-normal mt-1">Data-Backed Insights</p>
          </div>
        </div>
        <div className="mt-6">
          <input type="text" placeholder="Ask Anything..." className="w-[37rem] ml-4 flex-1 bg-white rounded-3xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"/>
          <button className="ml-2 px-4 py-2 bg-orange-400 rounded-3xl font-bold text-gray-700 hover:bg-gray-400 active:bg-gray-500">Send</button>
        </div>
    </div>
  );
}