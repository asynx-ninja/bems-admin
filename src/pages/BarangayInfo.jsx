import React from "react";
import { useEffect } from "react";
import Information from "./BarangayTabs/information";
import Profit from "../pages/BarangayTabs/Profit";
import Services from "../pages/BarangayTabs/Services";
import ServiceRequest from "../pages/BarangayTabs/ServiceRequests";
import Officials from "./BarangayTabs/Officials";
import ArchivedOfficials from "./BarangayTabs/ArchivedOfficials";
import Residents from "./BarangayTabs/Residents";
import Inquiries from "./Inquiries";

function BarangayDetails() {
  useEffect(() => {
    document.title = "Barangay Information | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6 lg:h-full border rounded-lg bg-white shadow-lg">
      <div className="w-full flex items-center justify-center bg-[#013D74] rounded-t-lg">
        <h1 className="text-white lg:text-3xl py-2 px-5 font-heavy ">
          BARANGAY SAN JOSE INFORMATION
        </h1>
      </div>
      <div className="px-4 py-4 overflow-x-scroll items-center flex bg-gray-100">
        <nav
          className="flex space-x-4 justify-center items-center mx-auto"
          aria-label="Tabs"
          role="tablist"
        >
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74] active"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-1"
            aria-controls="basic-tabs-1"
            role="tab"
          >
            Information
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-2"
            aria-controls="basic-tabs-2"
            role="tab"
          >
            Barangay Officials
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-3"
            aria-controls="basic-tabs-3"
            role="tab"
          >
            Services
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-4"
            aria-controls="basic-tabs-4"
            role="tab"
          >
            Service Requests
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-5"
            aria-controls="basic-tabs-5"
            role="tab"
          >
            Residents
          </button>
        
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-6"
            aria-controls="basic-tabs-6"
            role="tab"
          >
            Profits
          </button>
        </nav>
      </div>

      <div className="mt-3 py-4 px-4">
        <div
          id="basic-tabs-1"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-1"
        >
          <Information />
        </div>
        <div
          id="basic-tabs-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-2"
        >
          <Officials />
        </div>
        <div
          id="basic-tabs-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-3"
        >
          <Services />
        </div>
        <div
          id="basic-tabs-4"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-4"
        >
          <ServiceRequest />
        </div>
        <div
          id="basic-tabs-5"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-5"
        >
          <Residents />
        </div>
        <div
          id="basic-tabs-6"
          className="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-5"
        >
          <Profit />
        </div>
      </div>
    </div>
  );
}

export default BarangayDetails;
