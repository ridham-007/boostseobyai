import MetadataGenerator from "@/components/metaData-generator";
import React from "react";

const MetaDataLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full max-w-[1240px] self-center gap-24 my-20">
        <MetadataGenerator />
      </div>
    </>
  );
};
export default MetaDataLayout;
