"use client";
import React, { useState } from "react";
import InputField from "./ui/inputFields";
import CustomButton from "./ui/custom-button";
import Spinner from "./loader";
import { FetchMetaData } from "@/app/actions";
import Link from "next/link";
import { HiChevronDown, HiChevronUp, HiLightBulb } from "react-icons/hi2";

interface Result {
  existingTitle?: string;
  newTitle?: string;
  existingDescription?: string;
  newDescription?: string;
}

const MetadataGenerator = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | string>("");

  const [isNewTitleOpen, setNewTitleOpen] = useState(false);
  const [isNewDescriptionOpen, setNewDescriptionOpen] = useState(false);

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
      setError("");

      try {
        const response = await FetchMetaData({ url });

        if (response) {
          setResult(response);
        } else {
          setError("Failed to analyze the website.");
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

  return (
    <>
      <div className="flex flex-col w-full gap-10  sm:gap-16 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md py-10 lg:py-14 px-6 lg:px-10">
        <div className="flex flex-col gap-20 w-full">
          <div className="flex flex-col gap-1">
            <div className="text-[30px] sm:text-[40px] font-bold text-center">
              Meta Data Generate
            </div>

            <div className="text-[13px] sm:text-[15px] text-gray-400 text-center">
              Enter a website URL and Generate New meta title and meta
              description.
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
              label={loading ? <Spinner /> : "Generate"}
              className="flex justify-center items-center h-[45px] w-[150px] "
              onClick={handleAnalyzeClick}
            />
          </div>

          {error && <div className="text-red-500 text-[14px]">{error}</div>}
        </div>

        {/* Conditional rendering of suggestion section */}
        {!loading && result && (
          <div className="">
            <div className="flex gap-2 text-[16px] sm:text-[20px] font-medium">
              Report for:
              <Link
                href={url}
                target="_blank"
                className="flex gap-2 text-[16px] sm:text-[20px] items-center  text-[#000] hover:text-blue-600 hover:underline cursor-pointer"
              >
                {url}
              </Link>
            </div>
            <div className="flex flex-col w-full rounded-md bg-[#F8F9FA] mt-10 ">
              <div className="flex gap-2 items-center py-3 sm:py-6 px-4 sm:px-8 ">
                <HiLightBulb className="text-[18px] text-[#727274]" />
                <div className="text-[16px] sm:text-[18px] font-medium text-[#727274]">
                  Suggestion
                </div>
              </div>

              <div className="flex flex-col gap-5 p-4 sm:p-8 border-t">
                {typeof result === "object" && result !== null && (
                  <>
                    <div
                      className="flex flex-col sm:flex-row w-full gap-2 sm:gap-5 justify-between cursor-pointer"
                      onClick={() => setNewTitleOpen(!isNewTitleOpen)}
                    >
                      <div className="text-[15px] sm:text-[16px] font-medium w-full max-w-[170px]">
                        Existing Title
                      </div>
                      <div className="text-[14px] sm:text-[15px] w-full ">
                        {result.existingTitle || "N/A"}
                      </div>
                      <div className="flex  justify-end text-[18px]">
                        {isNewTitleOpen ? (
                          <HiChevronUp className="!text-[18px]" />
                        ) : (
                          <HiChevronDown className="!text-[18px]" />
                        )}
                      </div>
                    </div>
                    {isNewTitleOpen && (
                      <div className="flex mt-2 p-4 border-l-2 bg-white rounded-md border-gray-300 ">
                        <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-5">
                          <div className="text-[15px] sm:text-[16px] font-medium w-full max-w-[170px]">
                            New Title
                          </div>
                          <div className="text-[14px] sm:text-[15px] w-full">
                            {result.newTitle}
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className="flex  flex-col sm:flex-row w-full gap-2  sm:gap-5 cursor-pointer"
                      onClick={() =>
                        setNewDescriptionOpen(!isNewDescriptionOpen)
                      }
                    >
                      <div className="text-[15px] sm:text-[16px] font-medium w-full max-w-[170px]">
                        Existing Description
                      </div>
                      <div className="text-[14px] sm:text-[15px] w-full ">
                        {result.existingDescription || "N/A"}
                      </div>
                      <div className="flex justify-end text-[18px]">
                        {isNewDescriptionOpen ? (
                          <HiChevronUp className="text-[18px]" />
                        ) : (
                          <HiChevronDown className="text-[18px]" />
                        )}
                      </div>
                    </div>
                    {isNewDescriptionOpen && (
                      <div className="flex flex-col mt-2 p-4 border-l-2 border-gray-300 bg-white  rounded-md">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 ">
                          <div className="font-medium w-full max-w-[170px] text-[15px] sm:text-[16px]">
                            New Description
                          </div>
                          <div className="text-[14px] sm:text-[15px] w-full">
                            {result.newDescription}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MetadataGenerator;
