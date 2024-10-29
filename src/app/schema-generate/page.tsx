import Information from "@/components/information";
import SelectionType from "@/components/SelectionType";
import React from "react";

const SchemaGenerateLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full max-w-[1240px] self-center gap-24 my-20 sm:gap-20 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md py-10 lg:py-14 px-3 lg:px-10">
        <Information />
        <SelectionType />
      </div>
    </>
  );
};
export default SchemaGenerateLayout;
