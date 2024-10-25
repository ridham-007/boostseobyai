"use client";
import Link from "next/link";
import React from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { IoMdSpeedometer } from "react-icons/io";
import { HiDatabase } from "react-icons/hi";
import { PiRobotLight } from "react-icons/pi";

const Tools = () => {
  const toolsData = [
    {
      icon: <VscSymbolKeyword className="text-[28px]" />,
      title: "Find Keyword",
      description:
        "Discover high-impact keywords that resonate with your target audience and boost your content strategy.",
      link: "/keyword-generate",
    },
    {
      icon: <IoMdSpeedometer className="text-[28px]" />,
      title: "Speed Checker",
      description:
        "Analyze your website’s performance with our speed checker, ensuring optimal load times for a better user experience.",
      link: "/speed-checker",
    },
    {
      icon: <HiDatabase className="text-[28px]" />,
      title: "MetaData Generate",
      description:
        "Create compelling metadata that attracts clicks and improves your site’s visibility on search engines.",
      link: "/meta-data-generate",
    },
    {
      icon: <PiRobotLight className="text-[28px]" />,
      title: "MetaTag Generate",
      description:
        "Effortlessly generate relevant meta tags to enhance your content’s searchability.",
      link: "/meta-tag-generate",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-10 sm:gap-12 ">
      <div className="text-[32px] sm:text-[42px] font-bold text-center ">
        Existing free tools
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:flex-row md:gap-6  lg:gap-8 md:items-start">
        {toolsData.map((tool, index) => (
          <div
            key={index}
            className="flex flex-col gap-7 border rounded-md p-6 shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex rotate-12 justify-center items-center h-[50px] w-[50px] text-[#0B80E0] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-2">
              {tool.icon}
            </div>
            <div className="flex flex-col gap-1 h-[100px] w-full max-w-[500px]">
              <div className="text-[19px] font-semibold">{tool.title}</div>
              <div className="text-[14px] font-normal">{tool.description}</div>
            </div>
            <Link
              href={tool.link}
              className="flex text-nowrap w-fit px-3 py-1 text-[14px] font-semibold rounded-full bg-[#e4f3ff] text-[#0B80E0] hover:bg-[#cfe7fa]"
            >
              Try this feature for free
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
