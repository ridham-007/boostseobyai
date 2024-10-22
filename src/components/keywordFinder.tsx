"use client";

import React, { useState } from "react";
import CustomButton from "./ui/custom-button";
import CustomTextField from "./ui/customTextField";
import Spinner from "./loader";
import _ from "lodash";

interface FormData {
  text: string;
}

const FindKeyword = () => {
  const [formData, setFormData] = useState<FormData>({ text: "" });
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount <= 1000) {
      setFormData({ text: inputText });
      setError("");
    } else {
      setError("You can enter up to a maximum of 1000 words.");
    }
    setWordCount(wordCount);
  };
  const handleSubmit = () => {
    if (formData.text.trim() === "") {
      setError("Enter a Content.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const commonWordsRegex =
        /\b(any|i|you|your|me|he|she|it|we|our|they|am|is|are|it's|can|could|would|the|up|in|at|of|a|an|and|on|to|for|with|this|that|be|from|or|by|as|will|were|where|when|what|how|know|about|all|it's|'s)\b/gi;

      const words = formData.text
        .toLowerCase()
        .replace(commonWordsRegex, "")
        .split(/\s+/)
        .filter((word) => /^[a-zA-Z]+$/.test(word));

      const wordFrequency = _.countBy(words);
      const uniqueKeywords = new Set(
        _(wordFrequency).toPairs().orderBy([1], ["desc"]).map(0).value()
      );
      const topKeywords = Array.from(uniqueKeywords).slice(0, 10);

      setKeywords(topKeywords);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ text: "" });
    setKeywords([]);
    setError("");
    setWordCount(0);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-16 sm:gap-20 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md py-10 lg:py-14 px-6 lg:px-10">
        <div className="flex flex-col gap-2">
          <div className="text-[32px] sm:text-[40px] font-bold text-center">
            Generate Keywords
          </div>
          <div className="text-[15px] sm:text-[16px] text-[#75787d] text-center">
          Generate the most relevant keywords from any text within seconds with
            this free & powerful keyword Generator.
          </div>
        </div>
        <div className="flex flex-col gap-5 sm:px-10">
          {/* Form Section */}
          <div className="flex flex-col gap-2 w-full">
            <div className="text-right sm:text-[14px] text-gray-500 ">
              {wordCount} / 1000
            </div>
            <CustomTextField
              height="150px"
              label="Enter Content"
              name="keyword"
              placeholder="Enter Text..."
              value={formData.text}
              onChange={handleChange}
              className="text-[14px] sm:text-[16px]"
              error={error}
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            <div className="flex gap-5 mt-5">
              <CustomButton
                label={loading ? <Spinner /> : "Generate"}
                className="w-[150px]"
                onClick={handleSubmit}
              />
              <CustomButton
                label="Use again"
                className="w-[150px] bg-white border border-black rounded-md !text-black"
                onClick={handleReset}
              />
            </div>
          </div>

          {/* Display Keywords */}
          {keywords.length > 0 && (
            <div className="flex flex-col gap-4 mt-5">
              <h3 className="font-bold">Top 10 Keywords:</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="bg-[#272727] text-white px-4 py-1 rounded-full text-[14px]"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindKeyword;
