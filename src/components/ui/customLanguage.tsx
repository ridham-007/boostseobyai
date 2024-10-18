"use client";
import React from "react";
import Select from "react-select";
interface LanguageSelectorProps {
  value: any;
  onChange: (selectedOption: any) => void;
}
const options = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "hi", label: "Hindi" },
];

const LanguageDropdown: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select a language"
      isClearable
      className="text-[14px] "
    />
  );
};

export default LanguageDropdown;
