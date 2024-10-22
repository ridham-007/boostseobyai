"use client";
import Link from "next/link";
import React from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { FiLink } from "react-icons/fi";
import { PiRobotLight } from "react-icons/pi";

const Tools = () => {
  const toolsData = [
    {
      icon: <VscSymbolKeyword className="text-[28px]" />,
      title: "Find Keyword",
      description:
        "Find the most relevant keywords from any text within seconds with this free & powerful keyword finder.",
      link: "/find-keyword",
    },
    {
      icon: <FiLink className="text-[28px]" />,
      title: "InShorten",
      description:
        "With InShorten, it is possible to create an intuitive tool for creating personalized QR codes.",
      link: "https://inshorten.com/",
    },
    {
      icon: <PiRobotLight className="text-[28px]" />,
      title: "AIHumanInsights",
      description:
        "AiHumanInsights the most Advanced and Reliable Chat GPT, GPT4 & AI Content Detector",
      link: "https://aihumaninsights.com/",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-10 sm:gap-12 lg:px-16">
      <div className="text-[32px] sm:text-[42px] font-bold text-center">
        Existing free tools
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:flex-row md:gap-6  lg:gap-10 md:items-start">
        {toolsData.map((tool, index) => (
          <div
            key={index}
            className="flex flex-col gap-7 border rounded-md p-6 shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex rotate-12 justify-center items-center h-[50px] w-[50px] text-[#7237b6] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-2">
              {tool.icon}
            </div>
            <div className="flex flex-col gap-1 h-[100px] w-full max-w-[500px]">
              <div className="text-[19px] font-semibold">{tool.title}</div>
              <div className="text-[14px] font-normal">{tool.description}</div>
            </div>
            <Link
              href={tool.link}
              className="flex text-nowrap w-fit px-3 py-1 text-[14px] font-semibold rounded-full bg-[#f1e9fa] text-[#7237b6] hover:bg-[#e3d7e6]"
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
