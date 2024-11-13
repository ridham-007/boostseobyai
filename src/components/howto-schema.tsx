"use client";
import React, { useState } from "react";
import InputField from "./ui/inputFields";
import CustomButton from "./ui/custom-button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";

interface Step {
  name: string;
  url: string;
  imageUrl: string;
  instruction: string;
}

interface FormData {
  name: string;
  description: string;
  totleTime: string;
  estimatedCost: string;
  currency: string;
  imageUrl: string;
  supply: string;
  tool: string;
  step: Step[];
}

const HowToSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    totleTime: "",
    estimatedCost: "",
    currency: "",
    imageUrl: "",
    supply: "",
    tool: "",
    step: [
      {
        name: "",
        imageUrl: "",
        url: "",
        instruction: "",
      },
    ],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("step")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      const key = name.split("].")[1];

      setFormData((prevData) => ({
        ...prevData,
        step: prevData.step.map((step, idx) =>
          idx === index ? { ...step, [key]: value } : step
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      step: [
        ...prevData.step,
        {
          name: "",
          imageUrl: "",
          url: "",
          instruction: "",
        },
      ],
    }));
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

    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.description)
      formErrors.description = "Description is required";
    if (!formData.totleTime) formErrors.totleTime = "Totle Time is required";
    if (!formData.estimatedCost)
      formErrors.estimatedCost = "Estimated Cost is required";
    if (!formData.currency) formErrors.currency = "Currency is required";
    if (!formData.imageUrl) {
      formErrors.imageUrl = "imageUrl is required";
    } else if (!isValidURL(formData.imageUrl)) {
      formErrors.imageUrl = "Invalid URL format";
    }
    if (!formData.supply) formErrors.supply = "Supply is required";
    if (!formData.tool) formErrors.tool = "Tool is required";

    formData.step.forEach((step, index) => {
      if (!step.name) {
        formErrors.step = formErrors.step || [];
        formErrors.step[index] = {
          ...formErrors.step[index],
          name: "Name is required.",
        };
      }
      if (!step.imageUrl ) {
        formErrors.step = formErrors.step || [];
        formErrors.step[index] = {
          ...formErrors.step[index],
          imageUrl: "Image URL is required.",
        };
      }
      if (!step.url) {
        formErrors.step = formErrors.step || [];
        formErrors.step[index] = {
          ...formErrors.step[index],
          url: "URL is required.",
        };
      }
      if (!step.instruction) {
        formErrors.step = formErrors.step || [];
        formErrors.step[index] = {
          ...formErrors.step[index],
          instruction: "Instruction is required.",
        };
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const generateSchema = () => {
    const steps = formData.step.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      image: step.imageUrl,
      url: step.url,
      instruction: step.instruction,
    }));

    const schema = {
      "@context": "https://BoostSeobyAI.org/",
      "@type": "HowTo",
      name: formData.name,
      description: formData.description,
      image: formData.imageUrl,
      totalTime: formData.totleTime,
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: formData.currency,
        value: formData.estimatedCost,
      },
      supply: [
        {
          "@type": "HowToSupply",
          name: formData.supply,
        },
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: formData.tool,
        },
      ],
      step: steps,
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
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Name"
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
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Total Time"
            name="totleTime"
            placeholder="Enter Total Time"
            type="text"
            value={formData.totleTime}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.totleTime && (
            <p className="text-[14px] text-red-500">{errors.totleTime}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Estimated Cost"
            name="estimatedCost"
            placeholder="Enter Estimated Cost"
            type="text"
            value={formData.estimatedCost}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.estimatedCost && (
            <p className="text-[14px] text-red-500">{errors.estimatedCost}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Currency"
            name="currency"
            placeholder="Enter Currency"
            type="text"
            value={formData.currency}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.currency && (
            <p className="text-[14px] text-red-500">{errors.currency}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
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
        </div>

        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Supply"
            name="supply"
            placeholder="Enter Supply"
            type="text"
            value={formData.supply}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.supply && (
            <p className="text-[14px] text-red-500">{errors.supply}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Tool"
            name="tool"
            placeholder="Enter Tool"
            type="text"
            value={formData.tool}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.tool && (
            <p className="text-[14px] text-red-500">{errors.tool}</p>
          )}
        </div>
        <div className="flex flex-col w-full  gap-4">
          <h2 className="text-xl font-semibold">Steps</h2>
          {formData.step.map((step, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <h3>Step {index + 1}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-2">
                  <InputField
                    label=" Name"
                    name={`step[${index}].name`}
                    placeholder="Enter Step Name"
                    type="text"
                    value={step.name}
                    onChange={handleInputChange}
                  />
                  {errors.step?.[index]?.name && (
                    <p className="text-[14px] text-red-500">
                      {errors.step[index].name}
                    </p>
                  )}
                  <InputField
                    label="Image URL"
                    name={`step[${index}].imageUrl`}
                    placeholder="Enter Image URL"
                    type="text"
                    value={step.imageUrl}
                    onChange={handleInputChange}
                  />
                  {errors.step?.[index]?.imageUrl && (
                    <p className="text-[14px] text-red-500">
                      {errors.step[index].imageUrl}
                    </p>
                  )}
                  <InputField
                    label="URL"
                    name={`step[${index}].url`}
                    placeholder="Enter URL"
                    type="text"
                    value={step.url}
                    onChange={handleInputChange}
                  />
                  {errors.step?.[index]?.url && (
                    <p className="text-[14px] text-red-500">
                      {errors.step[index].url}
                    </p>
                  )}
                  <InputField
                    label="Instruction"
                    name={`step[${index}].instruction`}
                    placeholder="Enter Instruction"
                    type="text"
                    value={step.instruction}
                    onChange={handleInputChange}
                  />
                  {errors.step?.[index]?.instruction && (
                    <p className="text-[14px] text-red-500">
                      {errors.step[index].instruction}
                    </p>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <CustomButton
          onClick={addStep}
          label="Add Step"
          className="flex w-[150px]"
        />

        <CustomButton onClick={handleSubmit} label="Generate Schema" />
      </div>

      {/* Steps Section */}

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

export default HowToSchema;
