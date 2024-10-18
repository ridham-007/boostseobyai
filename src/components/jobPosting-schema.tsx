"use client";
import React, { useState } from "react";
import CustomSelection from "./ui/customSelection";
import CustomDate from "./ui/customDate";
import InputField from "./ui/inputfield";
import CustomButton from "./ui/custom-buttom";
import { LuCopy } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";

interface FormData {
  jobTitle: string;
  identifier: string;
  jobDescription: string;
  company: string;
  companyUrl: string;
  industry: string;
  employmentType: string;
  workHour: string;
  datePosting: string;
  validThrough: string;
  salary: string;
  skills: string;
  qualifications: string;
  educationRequirements: string;
  experienceRequirements: string;
}

const JobPostingSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    identifier: "",
    jobDescription: "",
    company: "",
    companyUrl: "",
    industry: "",
    employmentType: "",
    workHour: "",
    datePosting: "",
    validThrough: "",
    salary: "",
    skills: "",
    qualifications: "",
    educationRequirements: "",
    experienceRequirements: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const employmentType = [
    { label: "Full Time", value: "fullTime" },
    { label: "Part Time", value: "partTime" },
    { label: "Contractor", value: "contractor" },
    { label: "Intern", value: "intern" },
    { label: "Temporary", value: "temporary" },
    { label: "Volunteer", value: "volunteer" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFields = () => {
    let formErrors: Partial<FormData> = {};

    if (!formData.jobTitle) formErrors.jobTitle = "jobTitle is required";
    if (!formData.identifier) formErrors.identifier = "identifier is required";
    if (!formData.jobDescription)
      formErrors.jobDescription = "jobDescription is required";
    if (!formData.company) formErrors.company = "company is required";
    if (!formData.companyUrl) formErrors.companyUrl = "company Url is required";
    if (!formData.industry) formErrors.industry = "industry is required";
    if (!formData.employmentType)
      formErrors.employmentType = "employmentType is required";
    if (!formData.workHour) formErrors.workHour = "workHour is required";
    if (!formData.datePosting)
      formErrors.datePosting = "datePosting is required";
    if (!formData.validThrough)
      formErrors.validThrough = "validThrough is required";
    if (!formData.salary) formErrors.salary = "salary is required";
    if (!formData.skills) formErrors.skills = "skills is required";
    if (!formData.qualifications)
      formErrors.qualifications = "qualifications is required";
    if (!formData.educationRequirements)
      formErrors.educationRequirements = "educationRequirements is required";
    if (!formData.experienceRequirements)
      formErrors.experienceRequirements = "experienceRequirements is required";

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
      jobTitle: formData.jobTitle,
      identifier: formData.identifier,
      jobDescription: formData.jobDescription,

      company: {
        "@type": "company",
        company: formData.company,
        companyUrl: formData.companyUrl,
      },
      employmentType: {
        "@type": formData.employmentType,
        jobInformation: {
          "@type": "ImageObject",
          workHour: formData.workHour,
          datePosting: formData.datePosting,
          validThrough: formData.validThrough,
        },
      },
      remoteJob: {
        "@type": "remoteJob",
        salary: formData.salary,
        skills: formData.skills,
        qualifications: formData.qualifications,
        educationRequirements: formData.educationRequirements,
        experienceRequirements: formData.experienceRequirements,
      },
    };

    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4">
        <InputField
          label="Job Title"
          name="jobTitle"
          placeholder="Enter Job title"
          type="text"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.jobTitle && (
          <p className="text-[14px] text-red-500">{errors.jobTitle}</p>
        )}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Identifier"
              name="identifier"
              placeholder="Enter Identifier"
              type="text"
              value={formData.identifier}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.identifier && (
              <p className="text-[14px] text-red-500">{errors.identifier}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Job Description"
              name="jobDescription"
              placeholder="Enter Job Description"
              type="text"
              value={formData.jobDescription}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.jobDescription && (
              <p className="text-[14px] text-red-500">
                {errors.jobDescription}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Company"
              name="company"
              placeholder="Enter Company"
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
              label="Company URL"
              name="companyUrl"
              placeholder="Enter Company Url"
              type="text"
              value={formData.companyUrl}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.companyUrl && (
              <p className="text-[14px] text-red-500">{errors.companyUrl}</p>
            )}
          </div>
        </div>
        <InputField
          label="Industry"
          name="industry"
          placeholder="Enter Industry"
          type="text"
          value={formData.industry}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.industry && (
          <p className="text-[14px] text-red-500">{errors.industry}</p>
        )}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-2 w-full ">
            <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
              Employment type
            </label>
            <CustomSelection
              className="w-full"
              data={employmentType}
              value={formData.employmentType}
              onChange={(value: string) =>
                setFormData({ ...formData, employmentType: value })
              }
              AutocompleteData={[]}
            />
            {errors.employmentType && (
              <p className="text-[14px] text-red-500">
                {errors.employmentType}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Work Hour (eg: 8am to 5pm) "
              name="workHour"
              placeholder="Enter work hour"
              type="text"
              value={formData.workHour}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.workHour && (
              <p className="text-[14px] text-red-500">{errors.workHour}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <CustomDate
              label="Date Posted"
              value={formData.datePosting}
              onChange={(date: any) =>
                setFormData({ ...formData, datePosting: date })
              }
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.datePosting && (
              <p className="text-[14px] text-red-500">{errors.datePosting}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <CustomDate
              label="Valid through"
              value={formData.validThrough}
              onChange={(date: any) =>
                setFormData({ ...formData, validThrough: date })
              }
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.validThrough && (
              <p className="text-[14px] text-red-500">{errors.validThrough}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            Remote Job
          </label>
          <Accordion className="mt-2">
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Add Information
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Salary"
                      name="salary"
                      placeholder="Enter salary"
                      type="text"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.salary && (
                      <p className="text-[14px] text-red-500">
                        {errors.salary}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Skills"
                      name="skills"
                      placeholder="Enter skills"
                      type="text"
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.skills && (
                      <p className="text-[14px] text-red-500">
                        {errors.skills}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Qualifications "
                    name="qualifications"
                    placeholder="Enter qualifications"
                    type="text"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.qualifications && (
                    <p className="text-[14px] text-red-500">
                      {errors.qualifications}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Education Requirements "
                    name="educationRequirements"
                    placeholder="Enter education Requirements"
                    type="text"
                    value={formData.educationRequirements}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.educationRequirements && (
                    <p className="text-[14px] text-red-500">
                      {errors.educationRequirements}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1">
                  <InputField
                    label="Experience Requirements"
                    name="experienceRequirements"
                    placeholder="Enter experience Requirements"
                    type="text"
                    value={formData.experienceRequirements}
                    onChange={handleInputChange}
                    className="mt-2 text-[14px] sm:text-[16px]"
                  />
                  {errors.experienceRequirements && (
                    <p className="text-[14px] text-red-500">
                      {errors.experienceRequirements}
                    </p>
                  )}
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

export default JobPostingSchema;
