"use client"
import Sidebar from "@/components/Sidebar";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Home() {
  const [sideBarState,setSideBarState] = useState(false);
  return (
    <>
      <Navbar sidebaraction={setSideBarState} sidebarstate={sideBarState}/>
      <Sidebar sidebarstate={sideBarState} sidebaraction={setSideBarState}/>
      <Hero/>
    </>
  );
}
