"use client";
import React, { useEffect, useRef, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";

interface InputFieldProps {
  className?: string;
  bgColor?: string;
  errorMessage?: string;
  value?: string;
  label?: string | any;
  placeholderLabel?: string;

  inputCss?: any;
  min?: string;
  default?: string;
  name?: string;
  onChange?: any;
}

const CustomTime = (props: InputFieldProps) => {
  const {
    className,
    label,
    onChange,
    value,
    inputCss,
    placeholderLabel,
    name,
  } = props;
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(!value);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.placeholder = placeholderLabel ?? "Select Time";
      // inputRef.current.disabled = true;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches; // Adjust the breakpoint as needed
      inputRef.current.disabled = isDesktop;
      // inputRef.current.onclick = ()=>{
      inputRef?.current && inputRef?.current?.value.includes("hh");
      inputRef?.current &&
        (inputRef.current.placeholder = placeholderLabel ?? "Select Time");
      inputRef?.current &&
        inputRef?.current?.value.includes("hh") &&
        (inputRef.current.value = placeholderLabel ?? "Select Time");
      // }
    }
  }, []);
  return (
    <div className="flex flex-col w-full">
      <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
        {label}
      </label>
      <Box
        className={`relative w-full flex items-center ${className}`}
        sx={{
          "& .MuiStack-root": {
            width: "100%",
            "& .MuiTextField-root": {
              width: "100%",
            },
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["TimePicker"]}
            sx={{
              ".MuiOutlinedInput-root": {
                border: "1px solid #D4D7DD",
                borderRadius: "5px",
                width: "100%",
              },
              ".MuiFormControl-root-MuiTextField-root": {
                ...inputCss,
                width: "100%",
              },
              ".MuiOutlinedInput-input ": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
                outline: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              ".Mui-selected": {
                color: "red",
              },
            }}
          >
            <Box position="relative" display="inline-block" width="100%">
              <TimePicker
                value={value ? dayjs(value, "HH:mm") : null}
                ampm={true}
                inputRef={inputRef}
                onChange={(newValue: Dayjs | null) => {
                  const formattedValue = newValue
                    ? newValue.format("HH:mm")
                    : "";
                  onChange(formattedValue);
                }}
                sx={{
                  ".MuiOutlinedInput-input": {
                    paddingY: "12px",
                  },
                  cursor: "pointer",
                }}
              />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default CustomTime;
