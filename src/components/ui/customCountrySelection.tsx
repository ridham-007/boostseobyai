"use client";
import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

interface CountrySelectorProps {
  value: any;
  onChange: (selectedOption: any) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
}) => {
  const options = useMemo(
    () =>
      countryList()
        .getData()
        .map((country) => ({
          value: country.value,
          label: country.label,
        })),
    []
  );

  return <Select className = "h-[65px] text-[15px]" options={options} value={value} onChange={onChange} />;
};

export default CountrySelector;
