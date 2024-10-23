import SpeedChecker from "@/components/speed-checker";
import React from "react";

const SpeedCheckerLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full max-w-[1240px] self-center gap-24 my-20">
        <SpeedChecker />
      </div>
    </>
  );
};
export default SpeedCheckerLayout;
