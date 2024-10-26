"use client";
import React, { useState } from "react";
import { LuCopy } from "react-icons/lu";
import InputField from "./ui/inputField";
import CustomButton from "./ui/custom-button";

interface FormData {
  questions: string;
  answer: string;
}

const FaqSchema: React.FC = () => {
  const [formDataList, setFormDataList] = useState<FormData[]>([
    { questions: "", answer: "" },
  ]);
  const [errors, setErrors] = useState<Array<Partial<FormData>>>([]);
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormDataList = [...formDataList];
    updatedFormDataList[index] = {
      ...updatedFormDataList[index],
      [name]: value,
    };
    setFormDataList(updatedFormDataList);
  };

  const validateFields = () => {
    let formErrors: Partial<FormData>[] = [];

    formDataList.forEach((formData, index) => {
      const errors: Partial<FormData> = {};
      if (!formData.questions) errors.questions = "Question is required";
      if (!formData.answer) errors.answer = "Answer is required";
      formErrors[index] = errors;
    });
    setErrors(formErrors);
    return formErrors.every((error) => Object.keys(error).length === 0);
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSeobyAI.org/",
      "@type": "FAQPage",
      mainEntity: formDataList.map((formData) => ({
        "@type": "Question",
        name: formData.questions,
        acceptedAnswer: {
          "@type": "Answer",
          text: formData.answer,
        },
      })),
    };
    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      generateSchema();
    }
  };

  const handleAddQuestion = () => {
    setFormDataList([...formDataList, { questions: "", answer: "" }]);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
      {/* Form Section */}
      <div className="flex flex-col w-full h-full lg:w-1/2 gap-3">
        {formDataList.map((formData, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-1">
              <InputField
                label={`Question ${index + 1}`}
                name={"questions"}
                placeholder="Enter question"
                type="text"
                value={formData.questions}
                onChange={(e: any) => handleInputChange(e, index)}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {errors[index]?.questions && (
                <p className="text-[14px] text-red-500">
                  {errors[index]?.questions}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <InputField
                label={`Answer ${index + 1}`}
                name="answer"
                placeholder="Enter answer"
                type="text"
                value={formData.answer}
                onChange={(e: any) => handleInputChange(e, index)}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {errors[index]?.answer && (
                <p className="text-[14px] text-red-500">
                  {errors[index]?.answer}
                </p>
              )}
            </div>
          </div>
        ))}

        <CustomButton
          className="mt-2 py-3 w-[150px] text-nowrap"
          label="Add Question"
          onClick={handleAddQuestion}
        />
        <CustomButton
          className="mt-3 py-3"
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

export default FaqSchema;
