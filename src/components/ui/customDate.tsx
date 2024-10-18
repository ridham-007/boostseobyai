"use client";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
interface InputFieldProps {
  className?: string;
  bgColor?: string;
  errorMessage?: string;
  value?: string;
  label?: string | any;
  onChange?: any;
  disabled?: boolean;
  inputCss?: any;
  minDate?: any;
  name?: any;
}

const CustomDate = (props: InputFieldProps) => {
  const { className, label, onChange, value, disabled, inputCss, minDate } =
    props;

  return (
    <div className="flex flex-col w-full">
      <label className="font-medium text-[16px] leading-[24px] text-[#3E4654]">
        {label}
      </label>
      <Box
        className={`relative flex items-center w-full ${className}`}
        sx={{
          "& .MuiStack-root": {
            width: "100%",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{
              ".MuiOutlinedInput-root": {
                border: disabled ? "1px solid #DEDEDE" : "1px solid #D4D7DD",
                borderRadius: "5px",
                width: "100%",
              },
              ".MuiFormControl-root": {
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
              ".css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input ": {
                padding: "12px 13px",
              },
            }}
          >
            <DatePicker
              value={value ? dayjs(value) : null}
              onChange={(newValue: Dayjs | null) => {
                const formattedValue = newValue
                  ? dayjs(newValue).format("YYYY-MM-DD")
                  : "";
                onChange(formattedValue);
              }}
              disabled={disabled}
              minDate={minDate ? dayjs() : undefined}
              sx={{
                ".MuiOutlinedInput-input ": {
                  borderRadius: disabled ? "5px" : "5px",
                  // backgroundColor: disabled ? '#EBEBEB' : 'transparent'
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default CustomDate;
