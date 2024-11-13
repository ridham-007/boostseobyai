"use client";
import React, { useState } from "react";
import CustomSelection from "./ui/customSelection";
import CustomDate from "./ui/customDate";
import InputField from "./ui/inputFields";
import CustomButton from "./ui/custom-button";
import { LuCopy } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaAngleDown } from "react-icons/fa6";
import CustomTime from "./ui/customTime";

interface Ticket {
  name: string;
  price: string;
  url: string;
  availability: string;
  availableFrom: string;
}

interface FormData {
  performerType: string;
  eventName: string;
  description: string;
  imageUrl: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  performerName: string;
  venueName: string;
  street: string;
  city: string;
  zipCode: string;
  countryCode: string;
  regionCode: string;
  currencyCode: string;
  ticket: Ticket[];
}

interface Errors {
  ticket?: Array<Partial<Ticket>>;
}

const EventSchema = () => {
  const [formData, setFormData] = useState<FormData>({
    performerType: "",
    eventName: "",
    description: "",
    imageUrl: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    performerName: "",
    venueName: "",
    street: "",
    city: "",
    zipCode: "",
    countryCode: "",
    regionCode: "",
    currencyCode: "",
    ticket: [
      {
        name: "",
        price: "",
        url: "",
        availability: "",
        availableFrom: "",
      },
    ],
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [generatedSchema, setGeneratedSchema] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const EventData = [
    { label: "Person", value: "person" },
    { label: "Performing group", value: "performing group" },
    { label: "Music group", value: "music group" },
    { label: "Dance group", value: "dance group" },
    { label: "Theater group", value: "theater group" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) {
      console.error("Event target is undefined");
      return;
    }

    const { name, value } = e.target;

    if (name.startsWith("ticket")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      const key = name.split("].")[1];

      setFormData((prevData) => ({
        ...prevData,
        ticket: prevData.ticket.map((ticket, idx) =>
          idx === index ? { ...ticket, [key]: value } : ticket
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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

    if (!formData.performerType)
      formErrors.performerType = "Performer type is required.";
    if (!formData.eventName) formErrors.eventName = "Name is required.";
    if (!formData.description)
      formErrors.description = "Description is required.";
    if (!formData.imageUrl) {
      formErrors.imageUrl = "imageUrl is required";
    } else if (!isValidURL(formData.imageUrl)) {
      formErrors.imageUrl = "Invalid URL format";
    }
    if (!formData.startDate) formErrors.startDate = "Start date is required.";
    if (!formData.startTime) formErrors.startTime = "Start time is required.";
    if (!formData.endDate) formErrors.endDate = "End date is required.";
    if (!formData.endTime) formErrors.endTime = "End time is required.";
    if (!formData.performerName)
      formErrors.performerName = "Performer name is required.";
    if (!formData.venueName) formErrors.venueName = "Venue name is required.";
    if (!formData.street) formErrors.street = "Street is required.";
    if (!formData.city) formErrors.city = "City is required.";
    if (!formData.zipCode) formErrors.zipCode = "Zip code is required.";
    if (!formData.countryCode)
      formErrors.countryCode = "Country code is required.";
    if (!formData.regionCode)
      formErrors.regionCode = "Region code is required.";
    if (!formData.currencyCode)
      formErrors.currencyCode = "Currency code is required.";

    formData.ticket.forEach((ticket, index) => {
      if (!ticket.name) {
        formErrors.ticket = formErrors.ticket || [];
        formErrors.ticket[index] = {
          ...formErrors.ticket[index],
          name: "Ticket name is required.",
        };
      }
      if (!ticket.price) {
        formErrors.ticket = formErrors.ticket || [];
        formErrors.ticket[index] = {
          ...formErrors.ticket[index],
          price: "Ticket price is required.",
        };
      }
      if (!ticket.url) {
        formErrors.ticket = formErrors.ticket || [];
        formErrors.ticket[index] = {
          ...formErrors.ticket[index],
          url: "Ticket URL is required.",
        };
      }
      if (!ticket.availability) {
        formErrors.ticket = formErrors.ticket || [];
        formErrors.ticket[index] = {
          ...formErrors.ticket[index],
          availability: "Ticket availability is required.",
        };
      }
      if (!ticket.availableFrom) {
        formErrors.ticket = formErrors.ticket || [];
        formErrors.ticket[index] = {
          ...formErrors.ticket[index],
          availableFrom: "Available from date is required.",
        };
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const generateSchema = () => {
    const schema = {
      "@context": "https://BoostSeobyAI.org",
      "@type": "Event",
      name: formData.eventName,
      description: formData.description,
      image: formData.imageUrl,
      startDate: formData.startDate,
      endDate: formData.endDate,
      performer: {
        "@type": formData.performerType,
        name: formData.performerName,
      },
      location: {
        "@type": "Place",
        name: formData.venueName,
        address: {
          "@type": "PostalAddress",
          streetAddress: formData.street,
          addressLocality: formData.city,
          zipCode: formData.zipCode,
          addressCountry: formData.countryCode,
          addressRegion: formData.regionCode,
        },
      },
      offer: {
        "@type": "Ticket",
        Name: formData.ticket[0].name,
        price: formData.ticket[0].price,
        url: formData.ticket[0].url,
        availability: formData.ticket[0].availability,
        availableFrom: formData.ticket[0].availableFrom,
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
    <>
      <div className="flex flex-col lg:flex-row w-full gap-10 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-6 lg:p-10">
        {/* Form Section */}
        <div className="flex flex-col gap-5 w-full h-full lg:w-1/2">
          <div className="flex flex-col w-full gap-1">
            <InputField
              label="Event Name"
              name="eventName"
              placeholder="Enter name"
              type="text"
              value={formData.eventName}
              onChange={handleInputChange}
              className="mt-2 text-[14px] sm:text-[16px]"
            />
            {errors.eventName && (
              <p className="text-[14px] text-red-500">{errors.eventName}</p>
            )}
          </div>
          <InputField
            label="Description"
            name="description"
            placeholder="Enter description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-2 text-[14px] sm:text-[16px]"
          />
          {errors.description && (
            <p className="text-[14px] text-red-500">{errors.description}</p>
          )}

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

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full gap-1">
              <CustomDate
                label="Start Date"
                value={formData.startDate}
                onChange={(date: any) =>
                  setFormData({ ...formData, startDate: date })
                }
                className=" text-[14px] sm:text-[16px]"
              />
              {errors.startDate && (
                <p className="text-[14px] text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <CustomTime
                label={<span>Start Time</span>}
                name="startTime"
                placeholderLabel={"Enter Start Time"}
                value={formData.startTime}
                onChange={(startTime: any) =>
                  setFormData({ ...formData, startTime: startTime })
                }
              />
              {errors.startTime && (
                <p className="text-[14px] text-red-500">{errors.startTime}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full gap-1">
              <CustomDate
                label="End Date"
                value={formData.endDate}
                onChange={(date: any) =>
                  setFormData({ ...formData, endDate: date })
                }
                className="text-[14px] sm:text-[16px]"
              />
              {errors.endDate && (
                <p className="text-[14px] text-red-500">{errors.endDate}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <CustomTime
                label={<span>End Time</span>}
                name="endTime"
                placeholderLabel={"Enter End Time"}
                value={formData.endTime}
                onChange={(endTime: any) =>
                  setFormData({ ...formData, endTime: endTime })
                }
              />
              {errors.endTime && (
                <p className="text-[14px] text-red-500">{errors.endTime}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
              Performer Type
            </label>
            <CustomSelection
              className="w-full"
              data={EventData}
              value={
                EventData.find(
                  (option) => option.value === formData.performerType
                ) || null
              }
              onChange={(value: { label: string; value: string }) => {
                setFormData({ ...formData, performerType: value.value });
              }}
              AutocompleteData={[]}
            />

            {errors.performerType && (
              <p className="text-[14px] text-red-500">{errors.performerType}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full gap-1">
              <InputField
                label="Performer Name"
                name="performerName"
                placeholder="Enter performer name"
                type="text"
                value={formData.performerName}
                onChange={handleInputChange}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {errors.performerName && (
                <p className="text-[14px] text-red-500">
                  {errors.performerName}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <InputField
                label="Venue Name"
                name="venueName"
                placeholder="Enter venue name"
                type="text"
                value={formData.venueName}
                onChange={handleInputChange}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {errors.venueName && (
                <p className="text-[14px] text-red-500">{errors.venueName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full gap-1">
              <InputField
                label="Street "
                name="street"
                placeholder="Enter street "
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
                label="Publisher Zip Code"
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
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full gap-1">
              <InputField
                label=" Region Code"
                name="regionCode"
                placeholder="Enter region code"
                type="text"
                value={formData.regionCode}
                onChange={handleInputChange}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {errors.regionCode && (
                <p className="text-[14px] text-red-500">{errors.regionCode}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              <InputField
                label="Currency Code"
                name="currencyCode"
                placeholder="Enter currency code"
                type="text"
                value={formData.currencyCode}
                onChange={handleInputChange}
                className="mt-2 text-[14px] sm:text-[16px]"
              />
              {errors.currencyCode && (
                <p className="text-[14px] text-red-500">
                  {errors.currencyCode}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium text-[15px] leading-[24px] text-[#3E4654]">
              Add Ticket
            </label>
            <Accordion className="mt-2">
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Ticket
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full gap-1">
                      <InputField
                        label="Name"
                        name={`ticket[0].name`}
                        placeholder="Enter name"
                        type="text"
                        value={formData.ticket[0]?.name}
                        onChange={handleInputChange}
                        className="mt-2 text-[14px] sm:text-[16px]"
                      />
                      {errors.ticket && errors.ticket[0]?.name && (
                        <p className="text-[14px] text-red-500">
                          {errors.ticket[0].name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      <InputField
                        label="Price"
                        name={`ticket[0].price`}
                        placeholder="Enter price"
                        type="text"
                        value={formData.ticket[0]?.price}
                        onChange={handleInputChange}
                        className="mt-2 text-[14px] sm:text-[16px]"
                      />
                      {errors.ticket && errors.ticket[0]?.price && (
                        <p className="text-[14px] text-red-500">
                          {errors.ticket[0]?.price}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <InputField
                      label="Url"
                      name={`ticket[0].url`}
                      placeholder="Enter url"
                      type="text"
                      value={formData.ticket[0]?.url}
                      onChange={handleInputChange}
                      className="mt-2 text-[14px] sm:text-[16px]"
                    />
                    {errors.ticket && errors.ticket[0]?.url && (
                      <p className="text-[14px] text-red-500">
                        {errors.ticket[0]?.url}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full gap-1">
                      <InputField
                        label="Availability"
                        name={`ticket[0].availability`}
                        placeholder="Enter availability"
                        type="text"
                        value={formData.ticket[0]?.availability}
                        onChange={handleInputChange}
                        className="mt-2 text-[14px] sm:text-[16px]"
                      />
                      {errors.ticket && errors.ticket[0]?.availability && (
                        <p className="text-[14px] text-red-500">
                          {errors.ticket[0]?.availability}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      <CustomDate
                        label="Available From"
                        value={formData.ticket[0]?.availableFrom}
                        onChange={(date: any) =>
                          setFormData((prev) => ({
                            ...prev,
                            ticket: prev.ticket.map((t, index) =>
                              index === 0 ? { ...t, availableFrom: date } : t
                            ),
                          }))
                        }
                        className="mt-2 text-[14px] sm:text-[16px]"
                      />
                      {errors.ticket && errors.ticket[0]?.availableFrom && (
                        <p className="text-[14px] text-red-500">
                          {errors.ticket[0]?.availableFrom}
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
    </>
  );
};

export default EventSchema;
