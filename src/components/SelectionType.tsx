"use client";
import React, { useState } from "react";
import CustomSelection from "./ui/customSelection";
import ArticleSchema from "./article-schema";
import EventSchema from "./event-schema";
import JobPostingSchema from "./jobPosting-schema";
import OrganizationSchema from "./organization.-schema";
import FaqSchema from "./faq-schema";
import HowToSchema from "./howto-schema";
import WebsiteSchema from "./website-schema";
import VideoSchema from "./video-schema";
import PersonSchema from "./person-schema";
import LocalBusinessSchema from "./localBussiness-schema";

const SelectionType = () => {
  const [formData, setFormData] = useState({
    schemaType: { label: "", value: "" },
  });

  const [error, setError] = useState("");

  const ArticleData = [
    { label: "Article", value: "article" },
    { label: "Event", value: "event" },
    { label: "Job Posting", value: "job-posting" },
    {
      label: "Organization (Logo, Contact, Social Profile)",
      value: "organization",
    },
    { label: "FAQ-Page", value: "faq-page" },
    { label: "How to", value: "howTo" },
    { label: "Website- Site Link Searchbox", value: "website" },
    { label: "Video ", value: "video" },
    { label: "Person- Social Profile , Job Information ", value: "person" },
    { label: "Local Business ", value: "local-Business" },
  ];

  const handleChange = (selectedItem: any) => {
    if (!selectedItem) {
      setError("Please select a valid schema type.");
    } else {
      setError("");
    }
    setFormData({ ...formData, schemaType: selectedItem });
  };

  return (
    <>
      <div className="flex flex-col w-full md:max-w-[780px] self-center gap-1">
        <CustomSelection
          label="Which Schema would you like to create?"
          className="w-full text-[15px]"
          data={ArticleData}
          value={formData.schemaType}
          onChange={handleChange}
          AutocompleteData={[]}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {formData.schemaType.value === "article" && <ArticleSchema />}
      {formData.schemaType.value === "event" && <EventSchema />}
      {formData.schemaType.value === "job-posting" && <JobPostingSchema />}
      {formData.schemaType.value === "organization" && <OrganizationSchema />}
      {formData.schemaType.value === "faq-page" && <FaqSchema />}
      {formData.schemaType.value === "howTo" && <HowToSchema />}
      {formData.schemaType.value === "website" && <WebsiteSchema />}
      {formData.schemaType.value === "video" && <VideoSchema />}
      {formData.schemaType.value === "person" && <PersonSchema />}
      {formData.schemaType.value === "local-Business" && (
        <LocalBusinessSchema />
      )}
    </>
  );
};

export default SelectionType;
