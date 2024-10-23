"use client";
import React, { useState } from "react";
import CustomSelection from "./ui/customSelection";
import CustomButton from "./ui/custom-button";
import { LuCopy } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";
import CustomTime from "./ui/customTime";
import InputField from "./ui/inputField";

interface FormData {
  localBusinessType: string;
  name: string;
  imageUrl: string;
  id: string;
  url: string;
  phone: string;
  price: string;
  street: string;
  city: string;
  zipCode: string;
  countryCode: string;
  regionCode: string;
  socialProfile: string;
  dayOfWeek: string;
  openingHour: string;
  closingHour: string;
}

const LocalBusinessSchema: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    localBusinessType: "",
    name: "",
    imageUrl: "",
    id: "",
    url: "",
    phone: "",
    price: "",
    street: "",
    city: "",
    zipCode: "",
    countryCode: "",
    regionCode: "",
    socialProfile: "",
    dayOfWeek: "",
    openingHour: "",
    closingHour: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidURL = (urlString: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-z0-9\\-]+)\\.)+([a-z]{2,})|" +
        "localhost|" +
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
        "\\[([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\\])" +
        "(\\:\\d+)?(\\/[-a-z0-9\\$_.+!*'(),;?&=]*)*$",
      "i"
    );
    return !!urlPattern.test(urlString);
  };

  const validateFields = () => {
    let formErrors: Partial<FormData> = {};

    if (!formData.localBusinessType)
      formErrors.localBusinessType = "localBusinessType is required";
    if (!formData.name) formErrors.name = "name is required";
    if (!formData.imageUrl) {
      formErrors.imageUrl = "imageUrl is required";
    } else if (!isValidURL(formData.imageUrl)) {
      formErrors.imageUrl = "Invalid URL format";
    }
    if (!formData.id) formErrors.id = "id is required";

    if (!formData.url) {
      formErrors.url = "url is required";
    } else if (!isValidURL(formData.url)) {
      formErrors.url = "Invalid URL format";
    }

    if (!formData.phone) formErrors.phone = "phone is required";
    if (!formData.price) formErrors.price = "price is required";
    if (!formData.street) formErrors.street = "street is required";
    if (!formData.city) formErrors.city = "city is required";
    if (!formData.zipCode) formErrors.zipCode = "zipCode is required";
    if (!formData.countryCode)
      formErrors.countryCode = "countryCode is required";
    if (!formData.regionCode) formErrors.regionCode = "regionCode is required";

    if (!formData.socialProfile) {
      formErrors.socialProfile = "socialProfile is required";
    } else if (!isValidURL(formData.socialProfile)) {
      formErrors.socialProfile = "Invalid URL format";
    }

    if (!formData.dayOfWeek) formErrors.dayOfWeek = "dayOfWeek is required";
    if (!formData.openingHour)
      formErrors.openingHour = "openingHour is required";
    if (!formData.closingHour)
      formErrors.closingHour = "closingHour is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      generateSchema();
    }
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSeo.org",
      "@type": formData.localBusinessType,
      name: formData.name,
      image: formData.imageUrl,
      "@id": formData.id,
      url: formData.url,
      telephone: formData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: formData.street,
        addressLocality: formData.city,
        zipCode: formData.zipCode,
        addressCountry: formData.countryCode,
        addressRegion: formData.regionCode,
      },
      priceRange: formData.price,
      socialProfile: formData.socialProfile,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: formData.dayOfWeek,
          opens: formData.openingHour,
          closes: formData.closingHour,
        },
      ],
    };

    setGeneratedSchema(JSON.stringify(schema, null, 2));
  };
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const daysOfWeek = [
    { id: 0, name: "Sunday" },
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
  ];
  const handleDayChange = (id: number) => {
    let updatedSelectedDays: number[] = [];
    if (selectedDays.includes(id)) {
      updatedSelectedDays = selectedDays.filter((dayId) => dayId !== id);
    } else {
      updatedSelectedDays = [...selectedDays, id];
    }

    setSelectedDays(updatedSelectedDays);

    const selectedDayNames = updatedSelectedDays
      .map((dayId) => daysOfWeek[dayId].name)
      .join(", ");
    setFormData({
      ...formData,
      dayOfWeek: selectedDayNames,
    });
  };
  const BusinessData = [
    {
      label:
        "LocalBusiness -A particular physical business or branch of an organization.",
      value: "localBusiness",
    },
    { label: "AnimalShelter -Animal shelter.", value: "animalShelter" },
    {
      label:
        "ArchiveOrganization -An organization that holds archival materials. An organization that collects, preserves, and often provides public access to archival content.",
      value: "animalShelter",
    },
    {
      label: "AutomotiveBusiness -Car repair, sales, or parts.",
      value: "automotiveBusiness",
    },
    { label: "ChildCare -A Childcare center.", value: "childCare" },
    { label: "Dentist -a Dentist", value: "dentist" },
    {
      label: "DryCleaningOrLaundry -A dry-cleaning business.",
      value: "dryCleaningOrLaundry",
    },
    {
      label: "EmploymentAgency -An employment agency.",
      value: "employmentAgency",
    },
    {
      label: "FinancialService -Financial services business.",
      value: "financialService",
    },
    {
      label: "FoodEstablishment -A food-related business.",
      value: "foodEstablishment",
    },
    {
      label:
        "GovernmentOffice -A government office&#x2014;for example, an IRS or DMV office.",
      value: "governmentOffice",
    },
    {
      label: "HealthAndBeautyBusiness -Health and beauty.",
      value: "healthAndBeautyBusiness",
    },
    { label: "InternetCafe -An internet cafe.", value: "internetCafe" },
    { label: "Store -A retail good store.", value: "store" },
    {
      label: "TelevisionStation -A television station.",
      value: "televisionStation",
    },
    {
      label: "TouristInformationCenter -A tourist information center.",
      value: "touristInformationCenter",
    },
    { label: "RecyclingCenter -A recycling center.", value: "recyclingCenter" },
  ];
  return (
    <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
      {/* Form Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            local BusinessType
          </label>
          <CustomSelection
            className="w-full"
            data={BusinessData}
            value={formData.localBusinessType}
            onChange={(value: string) =>
              setFormData({ ...formData, localBusinessType: value })
            }
            AutocompleteData={[]}
          />
          {errors.localBusinessType && (
            <p className="text-[14px] text-red-500">
              {errors.localBusinessType}
            </p>
          )}
        </div>
        <InputField
          label="Name"
          name="name"
          placeholder="Enter name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-2 text-[14px] sm:text-[16px]"
        />
        {errors.name && (
          <p className="text-[14px] text-red-500">{errors.name}</p>
        )}
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Image URL"
            name="imageUrl"
            placeholder="Enter image url"
            type="text"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.imageUrl && (
            <p className="text-[14px] text-red-500">{errors.imageUrl}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="URL"
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
            label="Id"
            name="id"
            placeholder="Enter id (URl)"
            type="text"
            value={formData.id}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.id && <p className="text-[14px] text-red-500">{errors.id}</p>}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="phone"
              name="phone"
              placeholder="Enter phone number"
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
              label="Price Range"
              name="price"
              placeholder="Enter price"
              type="text"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.price && (
              <p className="text-[14px] text-red-500">{errors.price}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Street"
              name="street"
              placeholder="Enter street"
              type="text"
              value={formData.street}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.street && (
              <p className="text-[14px] text-red-500">{errors.street}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="City"
              name="city"
              placeholder="Enter city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.city && (
              <p className="text-[14px] text-red-500">{errors.city}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Zip Code"
              name="zipCode"
              placeholder="Enter zip code"
              type="text"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.zipCode && (
              <p className="text-[14px] text-red-500">{errors.zipCode}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Country Code"
              name="countryCode"
              placeholder="Enter country code"
              type="text"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.countryCode && (
              <p className="text-[14px] text-red-500">{errors.countryCode}</p>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Region Code "
              name="regionCode"
              placeholder="Enter country code"
              type="text"
              value={formData.regionCode}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.regionCode && (
              <p className="text-[14px] text-red-500">{errors.regionCode}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <InputField
            label="Social Profile "
            name="socialProfile"
            placeholder="Enter social profile(URL)"
            type="text"
            value={formData.socialProfile}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.socialProfile && (
            <p className="text-[14px] text-red-500">{errors.socialProfile}</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
            Opening Hours Specification
          </label>
          <Accordion className="mt-2">
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Specification
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col w-full gap-1">
                    <CustomTime
                      label="Opening Hour"
                      name="openingHour"
                      placeholderLabel={"Enter opening hour"}
                      value={formData.openingHour}
                      onChange={(openingHour: any) =>
                        setFormData({ ...formData, openingHour: openingHour })
                      }
                    />
                    {errors.openingHour && (
                      <p className="text-[14px] text-red-500">
                        {errors.openingHour}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <CustomTime
                      label="Closing Hour"
                      name="closingHour"
                      placeholderLabel={"Enter closing hour"}
                      value={formData.closingHour}
                      onChange={(closingHour: any) =>
                        setFormData({ ...formData, closingHour: closingHour })
                      }
                    />
                    {errors.closingHour && (
                      <p className="text-[14px] text-red-500">
                        {errors.closingHour}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <h2>Select Days of the Week</h2>
                  <div>
                    <p className="border border-gray-400 rounded-md p-2">
                      {selectedDays.length
                        ? selectedDays
                            .map((id) => daysOfWeek[id].name)
                            .join(", ")
                        : "Select"}
                    </p>
                  </div>
                  <ul
                    className="flex flex-col gap-1 mt-2"
                    style={{ listStyle: "none", paddingLeft: 0 }}
                  >
                    {daysOfWeek.map((day) => (
                      <li key={day.id} className="flex gap-2">
                        <label className="flex gap-2">
                          <input
                            type="checkbox"
                            checked={selectedDays.includes(day.id)}
                            onChange={() => handleDayChange(day.id)}
                          />
                          {day.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {errors.closingHour && (
                    <p className="text-[14px] text-red-500">
                      {errors.closingHour}
                    </p>
                  )}
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

export default LocalBusinessSchema;
