"use client";
import Link from "next/link";
import Logo from "@/components/logo";
import { useRouter } from "next/navigation";
import { RiFacebookFill, RiLinkedinFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { FaRegCopyright, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const router = useRouter();
  const navData = [
    { title: "Blog", href: "/blog" },
    { title: "Disclaimer", href: "/disclaimer" },
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      title: "Terms & Condition",
      href: "/terms-conditions",
    },
  ];
  const socialLink = [
    {
      socialIcon: <RiFacebookFill />,
      ariaLabel: "facebook",
    },
    {
      socialIcon: <BsInstagram />,
      ariaLabel: "instagram",
    },
    {
      socialIcon: <FaXTwitter />,
      ariaLabel: "twitter",
    },
    {
      socialIcon: <FaYoutube />,
      ariaLabel: "youtube",
    },
    {
      socialIcon: <RiLinkedinFill />,
      ariaLabel: "youtube",
    },
  ];
  const features = [
    { label: "Static URL", url: "static-url" },
    { label: "Dynamic URL", url: "dynamic-url" },
    { label: "QR Code", url: "qr-code" },
  ];
  return (
    <footer
      key={Math.random()}
      id="footer"
      className={`flex flex-col h-auto w-full bg-[#fff] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-7`}
    >
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:sm:grid-cols-4 w-full lg:justify-between gap-5 lg:gap-16 ">
          <div className="flex flex-col gap-1 md:gap-2 items-start">
            <div className="text-[18px] sm:text-[20px] font-semibold self-start">
              About Us
            </div>
            <div className="text-[14px] sm:text-[16px]">
              We provide a simple and efficient tool to shorten link, Long URLs
              convert to short link.Our platform makes it easier to share, and
              manage urls more...
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-2 items-start">
            <div className="text-[18px] font-semibold self-start">
              Popular Features
            </div>
            <div className="flex flex-row md:flex-col gap-5 sm:gap-10 md:gap-0 text-[15px] ml-1 text-nowrap ">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:text-[#0B80E0] hover:underline"
                  onClick={() => router.push(feature.url)}
                >
                  {feature.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-2 items-start">
            <div className="text-[18px] sm:text-[20px] font-semibold self-start">
              Quick Link
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 text-[15px] sm:text-[16px] gap-2 sm:gap-2 md:gap-0 lg:gap-0  ">
              {navData.slice(0, 4).map((link: any, index) => (
                <Link
                  href={link.href}
                  target="_blank"
                  key={index}
                  className=" hover:text-[#0B80E0] hover:underline !text-nowrap "
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      location.href = `${link.href}`;
                    }
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-2 items-start">
            <div className="text-[18px] sm:text-[20px] font-semibold self-start">
              Contact
            </div>
            <div className="text-[14px] md:text-[16px]">
              e-mail: contact@inshorten.com
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full justify-center items-center relative mt-10">
          <div className="border-[1px] border-[#eeeff0] w-full"></div>
          <div className="flex gap-3 md:gap-6 absolute bottom-[90px] bg-white px-4">
            {socialLink.map((socialLink: any, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-full h-full p-2 bg-gradient-to-br from-[#196091] to-[#99cdf3] transition duration-300 ease-in-out rounded-full hover:scale-110 cursor-pointer"
              >
                <Link
                  aria-label={socialLink.ariaLabel}
                  href={""}
                  className="text-[16px] md:text-[20px] text-white"
                >
                  {socialLink.socialIcon}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-[20px] md:text-[22px] mt-10">
            <Logo />
          </div>
          <div className="flex w-full justify-center text-[12px] md:text-[14px] text-nowrap">
            <FaRegCopyright className="mr-2 text-[16px]" /> 2024 by InShorten.
            All Right Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
