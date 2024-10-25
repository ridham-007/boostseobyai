"use client";
import React, { useState } from "react";
import InputField from "./ui/inputField";
import CustomButton from "./ui/custom-button";
import Spinner from "./loader";
import CustomTextField from "./ui/customTextField";
import CustomSelection from "./ui/customSelection";

import { LuCopy } from "react-icons/lu";
interface FormData {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  index: string;
  follow: string;
  charset: string;
  language: string;
  revisitAfter: string;
  author: string;
  httpEquiv: string;
}

const MetaTagGenerator = () => {
  const [error, setError] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [metaTags, setMetaTags] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    siteTitle: "",
    siteDescription: "",
    siteKeywords: "",
    index: "",
    follow: "",
    charset: "",
    language: "",
    revisitAfter: "",
    author: "",
    httpEquiv: "",
  });
  console.log({ formData });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!formData.siteTitle) errors.siteTitle = "Site title is required.";
    if (!formData.siteDescription)
      errors.siteDescription = "Site description is required.";
    if (!formData.siteKeywords)
      errors.siteKeywords = "Site keywords are required.";
    if (!formData.index)
      errors.index = "Please select if robots should index your website.";
    if (!formData.follow)
      errors.follow = "Please select if robots should follow all links.";
    if (!formData.language) errors.language = "Please select the language.";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGenerateMetaTags = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      const indexValue = formData.index === "yes" ? "index" : "noindex";
      const followValue = formData.follow === "yes" ? "follow" : "nofollow";

      let httpEquivContent = "";

      switch (formData.httpEquiv) {
        case "content-security-policy":
          httpEquivContent = "default-src 'self'";
          break;
        case "content-type":
          httpEquivContent = `text/html; charset=${formData.charset}`;
          break;
        case "default-style":
          httpEquivContent = "the document's preferred stylesheet";
          break;
        case "refresh":
          httpEquivContent = "300";
          break;
        default:
          httpEquivContent = "";
      }

      const tags = `
            <meta name="title" content="${formData.siteTitle}">
            <meta name="description" content="${formData.siteDescription}">
            <meta name="keywords" content="${formData.siteKeywords}">
            <meta name="robots" content="${indexValue}, ${followValue}">
            <meta http-equiv="${
              formData.httpEquiv
            }" content="${httpEquivContent}">
            <meta name="language" content="${formData.language}">
            ${
              formData.revisitAfter
                ? `<meta name="revisit-after" content="${formData.revisitAfter} days">`
                : ""
            }
            ${
              formData.author
                ? `<meta name="author" content="${formData.author}">`
                : ""
            }
        `;

      setMetaTags(tags);
    }, 2000);
  };

  const data = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const content = [
    { label: "UTF-8", value: "utf-8" },
    { label: "UTF-16", value: "utf-16" },
    { label: "ISO-8859-1", value: "iso-8859-1" },
    { label: "WINDOWS-1252", value: "windows-1252" },
  ];
  const language = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "Russia", value: "russia" },
    { label: "Arabic", value: "arabic" },
    { label: "Japanese", value: "japanese" },
    { label: "Korean", value: "korean" },
    { label: "Hindi", value: "hindi" },
    { label: "Portuguese", value: "portuguese" },
  ];
  const httpEquivOptions = [
    { label: "Content-Security-Policy", value: "content-security-policy" },
    { label: "Content-Type", value: "content-type" },
    { label: "Default-Style", value: "default-style" },
    { label: "Refresh", value: "refresh" },
  ];
  return (
    <>
      <div className="flex flex-col w-full gap-10  sm:gap-16 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md py-10 lg:py-14 px-6 lg:px-10">
        <div className="flex flex-col gap-20 w-full">
          <div className="flex flex-col gap-1">
            <div className="text-[30px] sm:text-[40px] font-bold text-center">
              Meta tag Generate
            </div>

            <div className="w-full max-w-[1000px] self-center text-[13px] sm:text-[15px] text-gray-400 text-center">
              The meta tag generator will create description, keyword and other
              important meta tags for you with provided content.Meta tags are
              elements within an HTML page that communicate non-visible content
              about your site, such as its describing message.
            </div>
          </div>
          <div className="flex flex-col  justify-center items-center gap-5">
            <div className="w-full">
              <InputField
                label={"Site Title "}
                name={"siteTitle"}
                placeholder="Enter site title "
                type="text"
                value={formData.siteTitle}
                onChange={handleInputChange}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {error.siteTitle && (
                <div className="text-red-500 text-[14px] mt-2">
                  {error.siteTitle}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full">
                <CustomTextField
                  label={"Allow robots to index your website?"}
                  name={"siteDescription"}
                  placeholder="Enter Site Description"
                  value={formData.siteDescription}
                  onChange={handleInputChange}
                  height={"100px"}
                  className="mt-2 text-[14px] sm:text-[16px]"
                />
                {error.siteDescription && (
                  <div className="text-red-500 text-[14px] mt-2">
                    {error.siteDescription}
                  </div>
                )}
              </div>
              <div className=" w-full">
                <CustomTextField
                  label={"Allow robots to follow all links?"}
                  name={"siteKeywords"}
                  placeholder="keyword1, keyword2, keyword3"
                  value={formData.siteKeywords}
                  onChange={handleInputChange}
                  height={"100px"}
                  className="mt-2 text-[14px] sm:text-[16px]"
                />
                {error.siteKeywords && (
                  <div className="text-red-500 text-[14px] mt-2">
                    {error.siteKeywords}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-2 w-full ">
                  <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                    Allow robots to index your website?
                  </label>
                  <CustomSelection
                    className="w-full"
                    data={data}
                    value={formData.index}
                    name="index"
                    onChange={(value: string) =>
                      setFormData({ ...formData, index: value })
                    }
                    AutocompleteData={[]}
                  />
                </div>
                {error.index && (
                  <div className="text-red-500 text-[14px] mt-2">
                    {error.index}
                  </div>
                )}
              </div>
              <div className=" w-full">
                <div className="flex flex-col gap-2 w-full ">
                  <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                    Allow robots to follow all links?
                  </label>
                  <CustomSelection
                    className="w-full"
                    data={data}
                    value={formData.follow}
                    name="follow"
                    onChange={(value: string) =>
                      setFormData({ ...formData, follow: value })
                    }
                    AutocompleteData={[]}
                  />
                </div>
                {error.follow && (
                  <div className="text-red-500 text-[14px] mt-2">
                    {error.follow}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-5 w-full">
              <div className="flex flex-col gap-2 w-full ">
                <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                  What type of HTTP Equiv will your site display?
                </label>
                <CustomSelection
                  className="w-full"
                  data={httpEquivOptions}
                  value={
                    httpEquivOptions.find(
                      (option) => option.value === formData.httpEquiv
                    ) || null
                  }
                  onChange={(value: { label: string; value: string }) => {
                    setFormData({ ...formData, httpEquiv: value.value });
                  }}
                  name={"httpEquiv"}
                />
                {error.httpEquiv && (
                  <div className="text-red-500 text-[14px] mt-2">
                    {error.httpEquiv}
                  </div>
                )}
              </div>

              {/* Conditional rendering for Content-Type selection */}
              {formData.httpEquiv === "content-type" && (
                <div className="w-full">
                  <div className="flex flex-col gap-2 w-full ">
                    <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                      What type of content will your site display?
                    </label>
                    <CustomSelection
                      className="w-full"
                      data={content}
                      name="content"
                      value={
                        content.find(
                          (option) => option.value === formData.charset
                        ) || null
                      }
                      onChange={(value: { label: string; value: string }) => {
                        setFormData({ ...formData, charset: value.value });
                      }}
                      AutocompleteData={[]}
                    />
                    {error.charset && (
                      <div className="text-red-500 text-[14px] mt-2">
                        {error.charset}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className=" w-full">
              <div className="flex flex-col gap-2 w-full ">
                <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                  What is your site primary language?
                </label>
                <CustomSelection
                  className="w-full"
                  data={language}
                  name="language"
                  value={
                    language.find(
                      (option) => option.value === formData.language
                    ) || null
                  }
                  onChange={(value: { label: string; value: string }) => {
                    setFormData({ ...formData, language: value.value });
                  }}
                  AutocompleteData={[]}
                />
              </div>
              {error.language && (
                <div className="text-red-500 text-[14px] mt-2">
                  {error.language}
                </div>
              )}
            </div>
            <div className="text-center font-semibold text-gray-600">
              (Optional meta tags)
            </div>
            <div className="flex flex-col mt-5 self-start gap-5">
              <div className="flex flex-col sm:flex-row text-[14px] sm:text-[16px] sm:text-nowrap justify-center items-start sm:items-center  gap-2">
                <span>Search engines should revisit this page after </span>
                <InputField
                  name={"revisitAfter"}
                  placeholder=""
                  type="text"
                  value={formData.revisitAfter}
                  onChange={handleInputChange}
                  className=" text-[14px] sm:text-[16px]"
                />
                days.
              </div>
              <div className="flex text-nowrap text-[14px] sm:text-[16px] justify-center items-center self-start gap-2">
                Author
                <InputField
                  name={"author"}
                  placeholder=""
                  type="text"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="text-[14px] sm:text-[16px]"
                />
              </div>

              <CustomButton
                label={loading ? <Spinner /> : "Generate meta Tags"}
                className="flex justify-center items-center h-[45px] w-[200px] "
                onClick={handleGenerateMetaTags}
              />
            </div>
          </div>
        </div>
        {metaTags && (
          <div className="flex flex-col gap-6">
            <h3 className="font-semibold">Generated Meta Tags:</h3>

            <div className="p-5 bg-gray-100 rounded-md text-sm text-gray-700 whitespace-pre-line">
              <code>{metaTags}</code>
            </div>
            <div className="flex flex-col items-start ">
              <CustomButton
                className=" text-[14px] flex w-[120px]"
                onClick={() => {
                  setCopied(true);
                  navigator.clipboard.writeText(metaTags);
                }}
                label={copied ? "Copied!" : "Copy tags"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MetaTagGenerator;
