"use client";
import React, { useState } from "react";
import InputField from "./ui/inputFields";
import CustomButton from "./ui/custom-button";
import { LuCopy } from "react-icons/lu";

interface FormData {
  name: string;
  url: string;
  imageUrl: string;
  jobTitle: string;
  company: string;
  socialProfile: string;
}

const PersonSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    url: "",
    imageUrl: "",
    jobTitle: "",
    company: "",
    socialProfile: "",
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
    if (!formData.url) {
      formErrors.url = "url is required";
    } else if (!isValidURL(formData.url)) {
      formErrors.url = "Invalid URL format";
    }
    if (!formData.imageUrl) {
      formErrors.imageUrl = "imageUrl is required";
    } else if (!isValidURL(formData.imageUrl)) {
      formErrors.imageUrl = "Invalid URL format";
    }
    if (!formData.jobTitle) formErrors.jobTitle = "jobTitle is required";
    if (!formData.company) formErrors.company = "company is required";
    if (!formData.socialProfile) {
      formErrors.socialProfile = "socialProfile is required";
    } else if (!isValidURL(formData.socialProfile)) {
      formErrors.socialProfile = "Invalid URL format";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSeobyAI.org/",
      "@type": "Person",
      name: formData.name,
      url: formData.url,
      image: formData.imageUrl,
      jobTitle: formData.jobTitle,
      worksFor: {
        "@type": "Organization",
        name: formData.company,
      },
      socialProfile: formData.socialProfile,
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
            label="URL"
            name="url"
            placeholder="Enter url"
            type="text"
            value={formData.url}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.url && (
            <p className="text-[14px] text-red-500">{errors.url}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Image URL"
            name="imageUrl"
            placeholder="Enter image url"
            type="text"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.imageUrl && (
            <p className="text-[14px] text-red-500">{errors.imageUrl}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Job Title"
            name="jobTitle"
            placeholder="Enter job title"
            type="text"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.jobTitle && (
            <p className="text-[14px] text-red-500">{errors.jobTitle}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Company"
            name="company"
            placeholder="Enter company name"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.company && (
            <p className="text-[14px] text-red-500">{errors.company}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Social Profile"
            name="socialProfile"
            placeholder="Enter Social Profile(URL)"
            type="text"
            value={formData.socialProfile}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.socialProfile && (
            <p className="text-[14px] text-red-500">{errors.socialProfile}</p>
          )}
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

export default PersonSchema;
