"use client";
import React, { useState } from "react";
import InputField from "./ui/inputField";
import CustomButton from "./ui/custom-button";
import Spinner from "./loader";
import { FetchMetaData, SpeedTesting } from "@/app/actions";

const SpeedChecker = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (!value || urlPattern.test(value)) {
      setError("");
    } else {
      setError("Enter a valid URL");
    }
  };

  const handleAnalyzeClick = async () => {
    if (url) {
      setLoading(true);

      try {
        const response = await SpeedTesting({ url });

        if (response) {
          if (response) {
            setResult(response);
          } else {
            setError("Failed to analyze the website.");
          }
        } else {
          setError("No response from the server.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("An error occurred while testing speed.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a URL.");
    }
  };

  const gradientColors = [
    "linear-gradient(135deg,#d4e9bc 0,#f2f5c0 100%)",
    "linear-gradient(135deg,#fbd0b8 0,#fcdcbe 48%,#fcdcbe 49%,#fceac3 100%)",
    "linear-gradient(218deg,#c9dae7 0,#ebeff9 100%)",
    "linear-gradient(135deg,#ffafbd 0,#ffc3a0 100%)",
    "linear-gradient(135deg,#1c92d2 0,#f2fcfe 100%)",
    "linear-gradient(33deg,#e2c8df,#f2ced8)",
  ];
  return (
    <>
      <div className="flex flex-col w-full gap-10  sm:gap-20 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md py-10 lg:py-14 px-6 lg:px-10">
        <div className="flex flex-col gap-20 w-full">
          <div className="flex flex-col gap-1">
            <div className="text-[30px] sm:text-[40px] font-bold text-center">
              Page Speed Checker
            </div>

            <div className="text-[13px] sm:text-[15px] text-gray-400 text-center">
              Enter a website URL to test page speed and see how to make it
              faster.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <InputField
              name={"questions"}
              placeholder="Enter a web page URL"
              type="text"
              value={url}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            <CustomButton
              label={loading ? <Spinner /> : "Analyze"}
              className="flex justify-center items-center h-[45px] w-[150px] "
              onClick={handleAnalyzeClick}
            />
          </div>

          {error && <div className="text-red-500 text-[14px]">{error}</div>}
        </div>

        {/* result */}
        {result && (
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col border rounded-md py-8 p-5 md:p-10 gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 justify-center items-center px-5">
                {Object.entries(result)
                  .filter(([key]) =>
                    ["performance", "seo", "cumulativeLayoutShift"].includes(
                      key
                    )
                  )
                  .map(([key, value], index) => {
                    const borderColor =
                      typeof value === "number"
                        ? value > 90
                          ? "border-green-500 text-green-600 opacity-80"
                          : value > 50
                          ? "border-yellow-500 text-yellow-500 opacity-80"
                          : "border-red-500 text-red-500 opacity-80"
                        : "border-gray-500 text-gray-600 opacity-80";

                    const backgroundColor =
                      typeof value === "number"
                        ? value > 90
                          ? "bg-[#E5FAEF] opacity-50"
                          : value > 50
                          ? "bg-[#FFF6E9] opacity-50"
                          : "bg-red-200 opacity-50"
                        : "bg-gray-200 opacity-50";

                    const animationClass =
                      index % 2 === 0
                        ? "animate-pulse"
                        : index % 2 === 1
                        ? "animate-fadeIn"
                        : "animate-fadeIn";
                    const capitalizeFirstLetter = (str: any) =>
                      str.charAt(0).toUpperCase() + str.slice(1);
                    return (
                      <div
                        key={index}
                        className={`flex  flex-col w-full  gap-2 justify-center items-center `}
                      >
                        <div
                          className={`flex flex-col justify-center items-center h-[90px] w-[90px] sm:h-[100px] sm:w-[100px] border-[4px] rounded-full ${animationClass} ${borderColor} ${backgroundColor} `}
                        >
                          <div className="flex text-[20px] sm:text-[25px] font-medium p-4">
                            {typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : value}
                          </div>
                        </div>
                        <div className="flex text-[14px] md:text-[18px] font-medium">
                          {capitalizeFirstLetter(key)}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex justify-center items-center mt-5 gap-3">
                <div className="flex gap-3 sm:gap-5">
                  <div className="flex gap-2 justify-center items-center">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-green-600"></div>
                    <div className="text-[14px]">90-100</div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="bg-yellow-500 w-5 h-5 rounded-full"></div>
                    <div className="text-[14px]">50-90</div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="bg-red-500 w-4 h-4"></div>
                    <div className="text-[14px]">0-50</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mt-8">
                <div className="flex w-full gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 w-full ">
                    {Object.entries(result)
                      .filter(([key]) =>
                        [
                          "firstContentfulPaint",
                          "interactive",
                          "speedIndex",
                          "totalBlockingTime",
                        ].includes(key)
                      )
                      .map(([key, value], index) => {
                        const background =
                          gradientColors[index % gradientColors.length];
                        const capitalizeFirstLetter = (str: any) =>
                          str.charAt(0).toUpperCase() + str.slice(1);

                        return (
                          <div
                            key={index}
                            className={`flex flex-col w-full p-3 gap-2 justify-center items-center `}
                          >
                            <div
                              className={`flex flex-col  w-full max-w-[250px] p-3 justify-center items-center `}
                              style={{
                                background: background,
                                boxShadow:
                                  "0px 8px 24px 4px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.1)",
                              }}
                            >
                              <div className="flex text-[25px] font-semibold p-4">
                                {typeof value === "object"
                                  ? JSON.stringify(value, null, 2)
                                  : value}
                              </div>
                              <div className={`flex text-[18px] font-medium `}>
                                {capitalizeFirstLetter(key)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SpeedChecker;
