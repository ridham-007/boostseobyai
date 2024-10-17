"use client";
import React from "react";
import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";

const blogPosts = [
  {
    id: 1,
    title: "All about InShorten",
    description:
      "Are you frustrated with lengthy, unattractive links taking up space in your social media posts, emails, and other online communications? If that sounds familiar, you might want to try a short URL service like InShorten. In this....",
    image: "/images/url-shortener.jpg",
    logo: "/images/logo.png",
  },
  {
    id: 2,
    title: "Infinite possibilities with Short",
    description:
      "Short Link is a website that enables users to create and share shortened links. This service is free and...",
    image: "/images/urlShorten.jfif",
    logo: "/images/logo.png",
  },
  {
    id: 3,
    title: "Link Shortening Advantages",
    description:
      "Link shortening, also referred to as URL shortening, is a method used to reduce the length of a URL or website link. This can be...",
    image: "/images/short.jfif",
    logo: "/images/logo.png",
  },
];

const Blog = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap justify-center w-full  gap-10 px-5 lg:px-0">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col w-full max-w-[400px] bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md "
        >
          <Image
            src={post.image}
            width={400}
            height={200}
            alt="Picture of the author"
            className="rounded-t-md h-[200px] w-[400px] "
          />
          <div className="flex flex-col gap-5 py-5 px-6">
            <div className="flex flex-col">
              <div className="text-[20px] font-semibold text-center">
                {post.title}
              </div>
              <div className="flex items-center gap-2 text-[15px] font-medium text-gray-700 h-[50px]">
                <MdOutlineCalendarMonth className="text-[18px]" />
                {currentDate}
              </div>
            </div>
            <div className="text-[15px] h-[170px]">{post.description}</div>
            <div className="flex gap-2 text-[15px] font-semibold items-center">
              <Image
                src={post.logo}
                width={20}
                height={20}
                alt="InShorten logo"
                className="rounded-full"
              />
              InShorten
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
