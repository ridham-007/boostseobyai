import MetaTagGenerator from "@/components/metaTage-generator";
import React from "react";

const MetaTagLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full max-w-[1240px] self-center gap-24 my-20">
        <MetaTagGenerator />
      </div>
    </>
  );
};
export default MetaTagLayout;
