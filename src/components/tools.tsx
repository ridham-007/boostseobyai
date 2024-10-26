"use client";
import Link from "next/link";
import React from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { GiSpeedometer } from "react-icons/gi";
import { HiDatabase } from "react-icons/hi";
import { LuFileJson } from "react-icons/lu";
import { LuCode2 } from "react-icons/lu";

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
      icon: <GiSpeedometer className="text-[28px]" />,
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
      icon: <LuCode2 className="text-[28px]" />,
      title: "MetaTag Generate",
      description:
        "Effortlessly generate relevant meta tags to enhance your content’s searchability.",
      link: "/meta-tag-generate",
    },
    {
      icon: <LuFileJson className="text-[28px]" />,
      title: "Json Schema Generate",
      description:
        "Simplify the process of implementing structured data to enhance your website’s search engine results.",
      link: "/schema-generate",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-10 sm:gap-12 ">
      <div className="text-[32px] sm:text-[42px] font-semibold text-center ">
        Existing free tools
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 gap-8 md:flex-row md:gap-6  lg:gap-8 md:items-start">
        {toolsData.map((tool, index) => (
          <div
            key={index}
            className="flex flex-col gap-7 border rounded-md p-6 shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex rotate-12 justify-center items-center h-[50px] w-[50px] text-[#000] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-2">
              {tool.icon}
            </div>
            <div className="flex flex-col gap-1 h-[100px] w-full max-w-[500px]">
              <div className="text-[19px] font-semibold">{tool.title}</div>
              <div className="text-[14px] font-normal">{tool.description}</div>
            </div>
            <Link
              href={tool.link}
              className="flex text-nowrap w-fit px-3 py-1 text-[14px] font-semibold rounded-full bg-[#e5e5e5] text-[#000] hover:bg-[#e0dfdf]"
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
