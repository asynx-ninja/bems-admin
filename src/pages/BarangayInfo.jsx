import React from "react";
import { useEffect, useState } from "react";
import Information from "./BarangayTabs/Brgyinformation";
import Profit from "../pages/BarangayTabs/Profit";
import Services from "./BarangayTabs/BrgyServices";
import ServiceRequest from "./BarangayTabs/BrgyServiceRequests";
import Officials from "./BarangayTabs/BrgyOfficials";
import ArchivedOfficials from "./BarangayTabs/BrgyArchivedOfficials";
import Residents from "./BarangayTabs/BrgyResidents";
import Inquiries from "./BarangayTabs/BrgyInquiries";
import { useParams, useSearchParams } from "react-router-dom";
import Announcement from "./BarangayTabs/BrgyAnnouncements";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
function BarangayDetails() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(1); // Initial active tab
  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  }
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  console.log("SAASA", id);

  useEffect(() => {
    document.title = `Barangay ${brgy} Information | Barangay E-Services Management`;
  }, []);

  return (
    <div className="mx-4 mt-[10rem] lg:mt-6 lg:w-[calc(100vw_-_305px)] xxl:w-[calc(100vw_-_440px)] xxl:w-[calc(100vw_-_310px)] ">
      <div className="w-full flex items-center justify-center bg-[#295141] rounded-t-lg">
        <h1 className="text-white lg:text-3xl py-2 px-5 font-heavy ">
          BARANGAY {brgy ? brgy.toUpperCase() : ""} INFORMATION
        </h1>
      </div>
      <div className="px-4 py-4 items-center bg-gray-100">
      <button
        type="button"
        className="hs-collapse-toggle py-3 px-4 mb-2 mt-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-[#295141] to-[#408D51] text-white hover:bg-[#408D51] disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        id="hs-basic-collapse"
        data-hs-collapse="#hs-basic-collapse-heading"
        onClick={() => setCollapseOpen(!collapseOpen)}
      >
        {activeTab === 1 && 'Information'}
        {activeTab === 2 && 'Barangay Officials'}
        {activeTab === 3 && 'Services'}
        {activeTab === 4 && 'Service Requests'}
        {activeTab === 5 && 'Residents'}
        {activeTab === 6 && 'Events'}
        {activeTab === 7 && 'Inquiries'}
        {activeTab === 8 && 'Profits'}
        <svg
          className={`hs-collapse-open ${
            collapseOpen ? 'rotate-180' : ''
          } flex-shrink-0 w-4 h-4 text-white`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

        <div
          id="hs-basic-collapse-heading"
          className={`hs-collapse ${
            collapseOpen ? "block" : "hidden"
          } w-full overflow-hidden transition-[height] duration-300`}
          aria-labelledby="hs-basic-collapse"
        >
          <nav
            className="grid grid-cols-2 lg:grid-cols-3"
            aria-label="Tabs"
            role="tablist"
          >
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 my-1 font-bold hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141] active"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-1"
              aria-controls="basic-tabs-1"
              role="tab"
              onClick={() => handleTabChange(1)}
            >
              Information
            </button>
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 font-bold my-1 hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-2"
              aria-controls="basic-tabs-2"
              role="tab"
              onClick={() => handleTabChange(2)}
            >
              Barangay Officials
            </button>
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 my-1 font-bold  hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-3"
              aria-controls="basic-tabs-3"
              role="tab"
              onClick={() => handleTabChange(3)}
            >
              Services
            </button>
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 my-1 font-bold  hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-4"
              aria-controls="basic-tabs-4"
              role="tab"
              onClick={() => handleTabChange(4)}
            >
              Service Requests
            </button>
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 my-1 font-bold  hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-5"
              aria-controls="basic-tabs-5"
              role="tab"
              onClick={() => handleTabChange(5)}
            >
              Residents
            </button>
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1  my-1 font-bold  hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-6"
              aria-controls="basic-tabs-6"
              role="tab"
              onClick={() => handleTabChange(6)}
            >
              Events
            </button>{" "}
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 my-1 font-bold  hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-7"
              aria-controls="basic-tabs-7"
              role="tab"
              onClick={() => handleTabChange(7)}
            >
              Inquiries
            </button>
            <button
              type="button"
              className="hs-tab-active:font-semibold uppercase mx-1 my-1 font-bold  hs-tab-active:bg-gradient-to-r from-[#295141] to-[#408D51] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-xs lg:text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#295141]"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-8"
              aria-controls="basic-tabs-8"
              role="tab"
              onClick={() => handleTabChange(8)}
            >
              Profits
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-3 py-4 px-4">
        <div
          id="basic-tabs-1"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-1"
        >
          <Information brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-2"
        >
          <Officials brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-3"
        >
          <Services brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-4"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-4"
        >
          <ServiceRequest brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-5"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-5"
        >
          <Residents brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-6"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-6"
        >
          <Announcement brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-7"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-7"
        >
          <Inquiries brgy={brgy} id={id} />
        </div>
        <div
          id="basic-tabs-8"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-8"
        >
          <Profit brgy={brgy} id={id} />
        </div>
      </div>
    </div>
  );
}

export default BarangayDetails;