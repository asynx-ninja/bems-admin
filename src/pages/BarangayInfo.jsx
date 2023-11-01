import React from "react";
import { useEffect } from "react";
import Information from "./BarangayTabs/Information";
import Profit from "../pages/BarangayTabs/Profit";
import Services from "../pages/BarangayTabs/Services";
import ServiceRequest from "../pages/BarangayTabs/ServiceRequests";
import Officials from "./BarangayTabs/Officials";
import ArchivedOfficials from "./BarangayTabs/ArchivedOfficials";
function BarangayDetails() {
  useEffect(() => {
    document.title = "Barangay Information | Barangay E-Services Management";
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6 lg:h-[full] border rounded-lg">
      <div className="w-full flex items-center justify-center ">
        <h1 className="text-black text-3xl py-2 px-5 font-heavy ">
          BARANGAY INFORMATION
        </h1>
      </div>
      <div class="border-b border-gray-200 px-4 dark:border-gray-700 overflow-x-auto">
        <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
          <button
            type="button"
            class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-5 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-400 active"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-1"
            aria-controls="basic-tabs-1"
            role="tab"
          >
            Information
          </button>
          <button
            type="button"
            class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-5 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-400 active"
            id="basic-tabs-item-2"
            data-hs-tab="#basic-tabs-2"
            aria-controls="basic-tabs-2"
            role="tab"
          >
            Barangay Officials
          </button>
          <button
            type="button"
            class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-5 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-400"
            id="basic-tabs-item-3"
            data-hs-tab="#basic-tabs-3"
            aria-controls="basic-tabs-3"
            role="tab"
          >
            Services
          </button>
          <button
            type="button"
            class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-5 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-400"
            id="basic-tabs-item-4"
            data-hs-tab="#basic-tabs-4"
            aria-controls="basic-tabs-4"
            role="tab"
          >
            Service Requests
          </button>
          <button
            type="button"
            class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-5 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-slate-400"
            id="basic-tabs-item-5"
            data-hs-tab="#basic-tabs-5"
            aria-controls="basic-tabs-5"
            role="tab"
          >
            Profits
          </button>
        </nav>
      </div>

      <div class="mt-3 p-4">
        <div
          id="basic-tabs-1"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-1"
        >
          <Information />
        </div>
        <div
          id="basic-tabs-2"
          class="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-2"
        >
          <Officials />
        </div>
        <div
          id="basic-tabs-3"
          class="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-3"
        >
          <Services />
        </div>
        <div
          id="basic-tabs-4"
          class="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-4"
        >
          <ServiceRequest />
        </div>
        <div
          id="basic-tabs-5"
          class="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-5"
        >
          <Profit />
        </div>
        <div
          id="basic-tabs-6"
          class="hidden"
          role="tabpanel"
          aria-labelledby="basic-tabs-item-6"
        >
          <ArchivedOfficials />
        </div>
      </div>
    </div>
  );
}

export default BarangayDetails;
