"use client";
import React, { useState } from "react";
import CustomSelection from "./ui/customSelection";
import CustomDate from "./ui/customDate";
import CustomButton from "./ui/custom-button";
import { LuCopy } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";
import InputField from "./ui/inputField";

interface FormData {
  articleType: string;
  url: string;
  headline: string;
  description: string;
  imageUrl: string;
  imageWidth: string;
  imageHeight: string;
  authorName: string;
  publisherName: string;
  publisherLogoUrl: string;
  publisherLogoWidth: string;
  publisherLogoHeight: string;
  datePublished: string;
  dateModified: string;
}

const ArticleSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    articleType: "",
    url: "",
    headline: "",
    description: "",
    imageUrl: "",
    imageWidth: "",
    imageHeight: "",
    authorName: "",
    publisherName: "",
    publisherLogoUrl: "",
    publisherLogoWidth: "",
    publisherLogoHeight: "",
    datePublished: "",
    dateModified: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const ArticleData = [
    { label: "Article", value: "Article" },
    { label: "New Article", value: "new-article" },
  ];

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

    if (!formData.articleType)
      formErrors.articleType = "Article type is required";
    if (!formData.url) {
      formErrors.url = "url is required";
    } else if (!isValidURL(formData.url)) {
      formErrors.url = "Invalid URL format";
    }
    if (!formData.headline) formErrors.headline = "Headline is required";
    if (!formData.description)
      formErrors.description = "Description is required";
    if (!formData.imageUrl) {
      formErrors.imageUrl = "imageUrl is required";
    } else if (!isValidURL(formData.imageUrl)) {
      formErrors.imageUrl = "Invalid URL format";
    }
    if (!formData.imageWidth) formErrors.imageWidth = "Image width is required";
    if (!formData.imageHeight)
      formErrors.imageHeight = "Image height is required";
    if (!formData.authorName) formErrors.authorName = "Author name is required";
    if (!formData.publisherName)
      formErrors.publisherName = "Publisher name is required";
    if (!formData.publisherLogoUrl) {
      formErrors.publisherLogoUrl = "publisherLogoUrl is required";
    } else if (!isValidURL(formData.publisherLogoUrl)) {
      formErrors.publisherLogoUrl = "Invalid URL format";
    }
    if (!formData.publisherLogoWidth)
      formErrors.publisherLogoWidth = "Publisher logo width is required";
    if (!formData.publisherLogoHeight)
      formErrors.publisherLogoHeight = "Publisher logo height is required";
    if (!formData.datePublished)
      formErrors.datePublished = "Publisher Published date is required";
    if (!formData.dateModified)
      formErrors.dateModified = "Publisher Modified date is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      generateSchema();
    }
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSEO.org/",
      "@type": formData.articleType,
      headline: formData.headline,
      image: {
        "@type": "ImageObject",
        url: formData.imageUrl,
        width: formData.imageWidth,
        height: formData.imageHeight,
      },
      author: {
        "@type": "Person",
        name: formData.authorName,
      },
      publisher: {
        "@type": "Organization",
        name: formData.publisherName,
        logo: {
          "@type": "ImageObject",
          url: formData.publisherLogoUrl,
          width: formData.publisherLogoWidth,
          height: formData.publisherLogoHeight,
        },
      },
      datePublished: formData.datePublished,
      dateModified: formData.dateModified,
    };

    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
              Article type
            </label>
            <CustomSelection
              className="w-full"
              data={ArticleData}
              value={
                ArticleData.find(
                  (option) => option.value === formData.articleType
                ) || null
              }
              onChange={(value: { label: string; value: string }) => {
                setFormData({ ...formData, articleType: value.value });
              }}
              AutocompleteData={[]}
            />
            {errors.articleType && (
              <p className="text-[14px] text-red-500">{errors.articleType}</p>
            )}
          </div>
          <div className="flex flex-col w-full lg:w-1/2 gap-1">
            <InputField
              label="URL"
              name="url"
              placeholder="Enter URL"
              type="text"
              value={formData.url}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.url && (
              <p className="text-[14px] text-red-500">{errors.url}</p>
            )}
          </div>
        </div>

        <InputField
          label="Article Headline"
          name="headline"
          placeholder="Enter Article Headline"
          type="text"
          value={formData.headline}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.headline && (
          <p className="text-[14px] text-red-500">{errors.headline}</p>
        )}

        <InputField
          label="Description"
          name="description"
          placeholder="Enter Description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.description && (
          <p className="text-[14px] text-red-500">{errors.description}</p>
        )}

        <InputField
          label="Image URL"
          name="imageUrl"
          placeholder="Enter Image URL"
          type="text"
          value={formData.imageUrl}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.imageUrl && (
          <p className="text-[14px] text-red-500">{errors.imageUrl}</p>
        )}

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Image Width"
              name="imageWidth"
              placeholder="Enter Image Width"
              type="text"
              value={formData.imageWidth}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.imageWidth && (
              <p className="text-[14px] text-red-500">{errors.imageWidth}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Image Height"
              name="imageHeight"
              placeholder="Enter Image Height"
              type="text"
              value={formData.imageHeight}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.imageHeight && (
              <p className="text-[14px] text-red-500">{errors.imageHeight}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Author Name"
              name="authorName"
              placeholder="Enter Author Name"
              type="text"
              value={formData.authorName}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.authorName && (
              <p className="text-[14px] text-red-500">{errors.authorName}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Publisher Name"
              name="publisherName"
              placeholder="Enter Publisher Name"
              type="text"
              value={formData.publisherName}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.publisherName && (
              <p className="text-[14px] text-red-500">{errors.publisherName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            Published
          </label>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Published Details
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                <InputField
                  label="Publisher Logo URL"
                  name="publisherLogoUrl"
                  placeholder="Enter Publisher Logo URL"
                  type="text"
                  value={formData.publisherLogoUrl}
                  onChange={handleInputChange}
                  className="mt-2 text-[14px] sm:text-[16px]"
                />
                {errors.publisherLogoUrl && (
                  <p className="text-[14px] text-red-500">
                    {errors.publisherLogoUrl}
                  </p>
                )}

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Publisher Logo Width"
                      name="publisherLogoWidth"
                      placeholder="Enter Publisher Logo Width"
                      type="text"
                      value={formData.publisherLogoWidth}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.publisherLogoWidth && (
                      <p className="text-[14px] text-red-500">
                        {errors.publisherLogoWidth}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Publisher Logo Height"
                      name="publisherLogoHeight"
                      placeholder="Enter Publisher Logo Height"
                      type="text"
                      value={formData.publisherLogoHeight}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.publisherLogoHeight && (
                      <p className="text-[14px] text-red-500">
                        {errors.publisherLogoHeight}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <CustomDate
                      label="Date Published"
                      value={formData.datePublished}
                      onChange={(date: any) =>
                        setFormData({ ...formData, datePublished: date })
                      }
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.datePublished && (
                      <p className="text-[14px] text-red-500">
                        {errors.datePublished}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <CustomDate
                      label="Date Modified"
                      value={formData.dateModified}
                      onChange={(date: any) =>
                        setFormData({ ...formData, dateModified: date })
                      }
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.dateModified && (
                      <p className="text-[14px] text-red-500">
                        {errors.dateModified}
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

export default ArticleSchema;
