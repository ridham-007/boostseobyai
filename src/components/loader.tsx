"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="spinner">
      <RotatingLines
        strokeColor="#fff"
        strokeWidth="5"
        animationDuration="0.95"
        width="28"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
