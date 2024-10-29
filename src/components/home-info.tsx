"use client";
import React from "react";
import Image from "next/image";

const HomeInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 sm:gap-12 p-2">
      <div className="flex flex-col gap-4 w-full max-w-1/2 justify-center items-center ">
        <div className="text-[30px] sm:text-[42px] lg:text-[50px] text-center lg:text-start font-medium">
          Free SEO software will allow you to do many SEO operations.
        </div>
        <div className="text-[16px] lg:text-[18px] text-gray-600 text-center lg:text-start">
          Such as Keyword research, Page speed checker, MetaData Generator,
          MetaTag Generator, Json Schema Generator and more.
        </div>
      </div>
      <div className="flex w-full max-w-1/2 justify-center lg:justify-end">
        <Image
          src="/images/seo.jpg"
          width={600}
          height={600}
          alt="Picture of the author"
          className="rounded-l-[120px] h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[550px] md:w-[550px] lg:h-[600px] lg:w-[600px] justify-end"
        />
      </div>
    </div>
  );
};

export default HomeInfo;
