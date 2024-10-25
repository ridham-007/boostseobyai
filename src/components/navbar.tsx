"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const navData = [
    { title: "Speed Checker", href: "/speed-checker" },
    { title: "Schema Generator", href: "/" },
    { title: "Keyword Generator", href: "/keyword-generate" },
    { title: "MetaData Generator", href: "meta-data-generate" },
    { title: "MetaTag Generator", href: "/meta-tag-generate" },
  ];

  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    // Function to handle clicks outside the wrapper
    const handleClickOutside = (event: any) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="flex flex-col w-full h-[80px] justify-center relative z-[1000] bg-white shadow-lg md:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
      <div className="flex w-full justify-between items-center px-5">
        <Logo />
        <div className="flex items-center blog-list font-medium">
          {/* Desktop Navigation */}
          {navData.map((tab, index) => (
            <Link
              key={`desktop-nav-${index}`}
              href={tab.href}
              target="_blank"
              className="hidden md:flex p-2 mr-5 rounded-md capitalize hover:text-[#0B80E0] cursor-pointer"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  location.href = tab.href;
                }
              }}
            >
              {tab.title}
            </Link>
          ))}

          {/* Hamburger for Mobile */}
          <RxHamburgerMenu
            size={24}
            className="md:hidden ml-5 cursor-pointer"
            onClick={handleOpen}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={hamburgerRef}
        className={`absolute bg-white top-[80px] left-0 w-full overflow-hidden transition-all duration-300 ease-in-out shadow-lg rounded-b-md ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col mt-2">
          {navData.map((item, index) => (
            <Link
              key={`mobile-nav-${index}`}
              href={item.href}
              target="_blank"
              className="flex justify-center w-full py-2 text-center capitalize hover:text-[#0B80E0] cursor-pointer"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  location.href = item.href;
                }
              }}
            >
              <label className="font-medium text-[14px]">{item.title}</label>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
