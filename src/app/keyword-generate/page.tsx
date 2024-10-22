import FindKeyword from "@/components/keywordFinder";
import React from "react";

const KeywordFinderLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-24 my-20">
        <FindKeyword />
      </div>
    </>
  );
};
export default KeywordFinderLayout;
