"use client";
import React, { useState } from "react";
import CustomSelection from "./ui/customSelection";
import InputField from "./ui/inputfield";
import CustomButton from "./ui/custom-buttom";
import { LuCopy } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";
import CountrySelector from "./ui/customCountrySelection";
import LanguageDropdown from "./ui/customLanguage";

interface FormData {
  organizationType: string;
  name: string;
  alternateName: string;
  url: string;
  logoUrl: string;
  socialProfile: string;
  contactType: string;
  phone: string;
  email: string;
  areas: string;
  language: string;
}

const OrganizationSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    organizationType: "",
    name: "",
    alternateName: "",
    url: "",
    logoUrl: "",
    socialProfile: "",
    contactType: "",
    phone: "",
    email: "",
    areas: "",
    language: "",
  });
  console.log({ formData });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const organizationType = [
    {
      label:
        "Organization-An organization such as a school, NGO, corporation, club, etc.",
      value: "organization",
    },
    {
      label: "Airline-An organization that provides flights for passengers.",
      value: "airline",
    },
    {
      label:
        "Consortium-A Consortium is a membership Organization whose members are typically Organizations.",
      value: "contractor",
    },
    {
      label: "Corporation-Organization: A business corporation.",
      value: "corporation",
    },
    {
      label: "EducationalOrganization-An educational organization.",
      value: "educationalOrganization",
    },
    {
      label:
        "LibrarySystem-A LibrarySystem is a collaborative system amongst several libraries.",
      value: "librarySystem",
    },
    {
      label:
        "MedicalOrganization-A medical organization (physical or not), such as hospital, institution or clinic.",
      value: "medicalOrganization",
    },
    {
      label: "NGO-Organization: Non-governmental Organization.",
      value: "NGO",
    },
    {
      label:
        "NewsMediaOrganization-A News/Media organization such as a newspaper or TV station.",
      value: "newsMediaOrganization",
    },
  ];
  const contactType = [
    {
      label: "Custom Service",
      value: "customService",
    },
    {
      label: "Technical Support",
      value: "technicalSupport",
    },
    {
      label: "Billing Support",
      value: "billingSupport",
    },
    {
      label: "Bill Payment",
      value: "billPayment",
    },
    {
      label: "Sales",
      value: "sales",
    },
    {
      label: "Reservation",
      value: "reservation",
    },
    {
      label: "Credit Card Support",
      value: "creditCardSupport",
    },
    {
      label: "Emergency",
      value: "emergency",
    },
    {
      label: "Road Side Assistance",
      value: "roadSideAssistance",
    },
    {
      label: "Package Tracking",
      value: "packageTracking",
    },
    {
      label: "Baggage Tracking",
      value: "baggageTracking",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFields = () => {
    let formErrors: Partial<FormData> = {};

    if (!formData.organizationType)
      formErrors.organizationType = "organizationType is required";
    if (!formData.alternateName)
      formErrors.alternateName = "alternateName is required";
    if (!formData.name) formErrors.name = "name is required";
    if (!formData.url) formErrors.url = "url is required";
    if (!formData.logoUrl) formErrors.logoUrl = "logoUrl is required";
    if (!formData.socialProfile)
      formErrors.socialProfile = "socialProfile is required";
    if (!formData.contactType)
      formErrors.contactType = "contactType is required";
    if (!formData.phone) formErrors.phone = "phone is required";
    if (!formData.email) formErrors.email = "email is required";
    if (!formData.areas) formErrors.areas = "areas is required";
    if (!formData.language) formErrors.language = "language is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSEO.org/",
      "@type": "Organizer",
      company: {
        "@type": "organizationType",
        company: formData.organizationType,
      },
      organizer: {
        name: formData.name,
        alternateName: formData.alternateName,
        socialProfile: formData.socialProfile,
        url: formData.url,
        logoUrl: formData.logoUrl,
        Contact: {
          "@type": "Contact Details",
          contactType: formData.contactType,
          phone: formData.phone,
          email: formData.email,
          area: formData.areas,
          language: formData.language,
        },
      },
    };

    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };
  const handleSubmit = () => {
    if (validateFields()) {
      generateSchema();
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4">
        <div className="flex flex-col gap-2 w-full ">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            Organization type
          </label>
          <CustomSelection
            className="w-full text-[14px]"
            data={organizationType}
            value={formData.organizationType}
            onChange={(value: string) =>
              setFormData({ ...formData, organizationType: value })
            }
            AutocompleteData={[]}
          />
          {errors.organizationType && (
            <p className="text-[14px] text-red-500">
              {errors.organizationType}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Name"
              name="name"
              placeholder="Enter Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.name && (
              <p className="text-[14px] text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Alternate Name"
              name="alternateName"
              placeholder="Enter alternate Name"
              type="text"
              value={formData.alternateName}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.alternateName && (
              <p className="text-[14px] text-red-500">{errors.alternateName}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <InputField
            label="url"
            name="url"
            placeholder="Enter url"
            type="text"
            value={formData.url}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.url && (
            <p className="text-[14px] text-red-500">{errors.url}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="logo Url"
            name="logoUrl"
            placeholder="Enter logo url"
            type="text"
            value={formData.logoUrl}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.logoUrl && (
            <p className="text-[14px] text-red-500">{errors.logoUrl}</p>
          )}
        </div>
        <InputField
          label="Social Profile"
          name="socialProfile"
          placeholder="Enter social Profile"
          type="text"
          value={formData.socialProfile}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.socialProfile && (
          <p className="text-[14px] text-red-500">{errors.socialProfile}</p>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            Contact
          </label>
          <Accordion className="mt-2">
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Contact Details
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col gap-2 w-full ">
                    <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                      Contact Type
                    </label>
                    <CustomSelection
                      className="w-full text-[14px]"
                      data={contactType}
                      value={formData.contactType}
                      onChange={(value: string) =>
                        setFormData({ ...formData, contactType: value })
                      }
                      AutocompleteData={[]}
                    />
                    {errors.contactType && (
                      <p className="text-[14px] text-red-500">
                        {errors.contactType}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="phone"
                      name="phone"
                      placeholder="Enter phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.phone && (
                      <p className="text-[14px] text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="email "
                      name="email"
                      placeholder="Enter email"
                      type="text"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.email && (
                      <p className="text-[14px] text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                      Area
                    </label>
                    <CountrySelector
                      value={formData.areas}
                      onChange={(value: string) =>
                        setFormData({ ...formData, areas: value })
                      }
                    />
                    {errors.areas && (
                      <p className="text-[14px] text-red-500">{errors.areas}</p>
                    )}
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
                      language
                    </label>
                    <LanguageDropdown
                      value={formData.language}
                      onChange={(value: string) =>
                        setFormData({ ...formData, language: value })
                      }
                    />
                    {errors.language && (
                      <p className="text-[14px] text-red-500">
                        {errors.language}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

        <CustomButton
          className="mt-4 py-3"
          label="Generate Schema"
          onClick={handleSubmit}
        />
      </div>

      {/* Schema Output Section */}
      <div className="flex flex-col w-full h-full lg:w-1/2 bg-gray-100 rounded-md p-5">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center pb-3">
          <h2 className="text-lg font-semibold items-center">
            Generated Schema
          </h2>
          <button
            className=" text-[14px] flex  items-center gap-1"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(generatedSchema);
            }}
          >
            <LuCopy />
            {copied ? "Copied!" : "Copy Schema"}
          </button>
        </div>

        <pre className="w-full !h-full text-[15px] leading-[25px] bg-white p-5 rounded-sm text-wrap ">
          {generatedSchema}
        </pre>
      </div>
    </div>
  );
};

export default OrganizationSchema;
