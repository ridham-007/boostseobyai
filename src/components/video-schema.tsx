"use client";
import React, { useState } from "react";
import InputField from "./ui/inputField";
import CustomButton from "./ui/custom-button";
import { LuCopy } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CustomDate from "./ui/customDate";

interface FormData {
  name: string;
  description: string;
  uploadDate: string;
  minutes: string;
  seconds: string;
  thumbnailUrl: string;
  contentUrl: string;
  embedUrl: string;
  publisherName: string;
  publisherLogoUrl: string;
  publisherWidth: string;
  publisherHeight: string;
}

const VideoSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    uploadDate: "",
    minutes: "",
    seconds: "",
    thumbnailUrl: "",
    contentUrl: "",
    embedUrl: "",
    publisherName: "",
    publisherLogoUrl: "",
    publisherWidth: "",
    publisherHeight: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const isValidURL = (urlString: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-z0-9\\-]+)\\.)+([a-z]{2,})|" +
        "localhost|" +
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
        "\\[([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\\])" +
        "(\\:\\d+)?(\\/[-a-z0-9\\$_.+!*'(),;?&=]*)*$",
      "i"
    );
    return !!urlPattern.test(urlString);
  };
  const validateFields = () => {
    let formErrors: Partial<FormData> = {};

    if (!formData.name) formErrors.name = "name is required";
    if (!formData.description)
      formErrors.description = "description is required";
    if (!formData.uploadDate) formErrors.uploadDate = "uploadDate is required";
    if (!formData.minutes) formErrors.minutes = "minutes is required";
    if (!formData.seconds) formErrors.seconds = "seconds is required";
    if (!formData.thumbnailUrl) {
      formErrors.thumbnailUrl = "thumbnailUrl is required";
    } else if (!isValidURL(formData.thumbnailUrl)) {
      formErrors.thumbnailUrl = "Invalid URL format";
    }
    if (!formData.contentUrl) {
      formErrors.contentUrl = "contentUrl is required";
    } else if (!isValidURL(formData.contentUrl)) {
      formErrors.contentUrl = "Invalid URL format";
    }
    if (!formData.embedUrl) {
      formErrors.embedUrl = "embedUrl is required";
    } else if (!isValidURL(formData.embedUrl)) {
      formErrors.embedUrl = "Invalid URL format";
    }
    if (!formData.publisherName)
      formErrors.publisherName = "publisherName is required";
    if (!formData.publisherLogoUrl) {
      formErrors.publisherLogoUrl = "publisherLogoUrl is required";
    } else if (!isValidURL(formData.publisherLogoUrl)) {
      formErrors.publisherLogoUrl = "Invalid URL format";
    }
    if (!formData.publisherHeight)
      formErrors.publisherHeight = "publisherHeight is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSeo.org",
      "@type": "VideoObject",
      name: formData.name,
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl,
      uploadDate: formData.uploadDate,
      contentUrl: formData.contentUrl,
      embedUrl: formData.embedUrl,
      publisher: {
        "@type": "Organization",
        name: formData.publisherName,
        logo: {
          "@type": "ImageObject",
          url: formData.publisherLogoUrl,
          width: formData.publisherWidth,
          height: formData.publisherHeight,
        },
      },
    };

    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      generateSchema();
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4">
        <div className="flex flex-col w-full gap-1">
          <InputField
            label=" Name"
            name="name"
            placeholder="Enter Name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.name && (
            <p className="text-[14px] text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="description"
            name="description"
            placeholder="Enter description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.description && (
            <p className="text-[14px] text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="minutes"
              name="minutes"
              placeholder="Enter minutes"
              type="text"
              value={formData.minutes}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.minutes && (
              <p className="text-[14px] text-red-500">{errors.minutes}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Seconds"
              name="seconds"
              placeholder="Enter seconds"
              type="text"
              value={formData.seconds}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.seconds && (
              <p className="text-[14px] text-red-500">{errors.seconds}</p>
            )}
          </div>
        </div>
        <CustomDate
          label="upload Date"
          value={formData.uploadDate}
          onChange={(date: any) =>
            setFormData({ ...formData, uploadDate: date })
          }
          className="text-[14px] sm:text-[16px]"
        />
        {errors.uploadDate && (
          <p className="text-[14px] text-red-500">{errors.uploadDate}</p>
        )}
        <div className="flex flex-col gap-3">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            URL
          </label>
          <Accordion className="mt-2">
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              URL
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Thumbnail URL"
                    name="thumbnailUrl"
                    placeholder="Enter Thumbnail url"
                    type="text"
                    value={formData.thumbnailUrl}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.thumbnailUrl && (
                    <p className="text-[14px] text-red-500">
                      {errors.thumbnailUrl}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Content URL"
                    name="contentUrl"
                    placeholder="Enter content url"
                    type="text"
                    value={formData.contentUrl}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.contentUrl && (
                    <p className="text-[14px] text-red-500">
                      {errors.contentUrl}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Embed URL "
                    name="embedUrl"
                    placeholder="Enter url"
                    type="text"
                    value={formData.embedUrl}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.embedUrl && (
                    <p className="text-[14px] text-red-500">
                      {errors.embedUrl}
                    </p>
                  )}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            Publisher
          </label>
          <Accordion className="mt-2">
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Publisher
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Publisher Name"
                    name="publisherName"
                    placeholder="Enter publisher name"
                    type="text"
                    value={formData.publisherName}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.publisherName && (
                    <p className="text-[14px] text-red-500">
                      {errors.publisherName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Publisher Logo URL"
                    name="publisherLogoUrl"
                    placeholder="Enter publisher Logo url"
                    type="text"
                    value={formData.publisherLogoUrl}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.contentUrl && (
                    <p className="text-[14px] text-red-500">
                      {errors.contentUrl}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Publisher Width"
                      name="publisherWidth"
                      placeholder="Enter publisher width"
                      type="text"
                      value={formData.publisherWidth}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.publisherWidth && (
                      <p className="text-[14px] text-red-500">
                        {errors.publisherWidth}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Publisher Height"
                      name="publisherHeight"
                      placeholder="Enter publisher height"
                      type="text"
                      value={formData.publisherHeight}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.publisherHeight && (
                      <p className="text-[14px] text-red-500">
                        {errors.publisherHeight}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <CustomButton
          className="mt-4 py-3"
          label="Generate Schema"
          onClick={handleSubmit}
        />
      </div>

      {/* Schema Output Section */}
      <div className="flex flex-col w-full h-full lg:w-1/2 bg-gray-100 rounded-md p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center pb-3">
          <h2 className="text-lg font-semibold items-center">
            Generated Schema
          </h2>
          <button
            className=" text-[14px] flex  items-center gap-1"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(generatedSchema);
            }}
          >
            <LuCopy />
            {copied ? "Copied!" : "Copy Schema"}
          </button>
        </div>

        <pre className="w-full !h-full text-[15px] leading-[25px] bg-white p-5 rounded-sm text-wrap ">
          {generatedSchema}
        </pre>
      </div>
    </div>
  );
};

export default VideoSchema;
