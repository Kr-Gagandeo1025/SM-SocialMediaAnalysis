"use client"
import React, { useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import Markdown from 'react-markdown';

const Sidebar = ({sidebarstate, sidebaraction}) => {
    const [SavedResponses,setSavedResponses] = useState(null);
    useEffect(() => {
        const storedResponses = localStorage.getItem('savedPrompt') || null;
        if(storedResponses){
            setSavedResponses(JSON.parse(storedResponses));
        }
        console.log(SavedResponses)
    }, []);
  return (
    <div className={`fixed h-screen bg-white right-0 top-0 ${sidebarstate?'w-[300px] p-2 ':'w-0 p-0'} transition-all ease-in-out duration-300 flex items-start justify-start z-30 overflow-hidden flex-col shadow-lg`}>
        <CgClose onClick={()=>sidebaraction(!sidebarstate)} className='text-3xl p-2 text-white bg-black rounded-full'/>
        <span className='mt-3 italic'>This is your last saved response</span>
        <div className='w-[300px] text-black mt-10 border-b border-gray-500 pb-2'>
            {SavedResponses?
                <div className=''>
                    <h1 className='font-bold text-xl '>
                        {SavedResponses?.input}
                    </h1>
                    <Markdown className='text-lg'>
                        {SavedResponses?.prompt}
                    </Markdown>
                </div>:
                <h1>
                    No Response was Saved
                </h1>
            }
        </div>
    </div>
  )
}

export default Sidebar
