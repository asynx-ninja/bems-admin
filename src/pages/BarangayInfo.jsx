import React from "react";
import { useEffect } from "react";
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

function BarangayDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  console.log("SAASA", id);

  useEffect(() => {
    document.title = `Barangay ${brgy} Information | Barangay E-Services Management`;
  }, []);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6 lg:h-full border rounded-lg bg-white shadow-lg">
      <div className="w-full flex items-center justify-center bg-[#013D74] rounded-t-lg">
        <h1 className="text-white lg:text-3xl py-2 px-5 font-heavy ">
          BARANGAY {brgy ? brgy.toUpperCase() : ""} INFORMATION
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
            Announcements
          </button>{" "}
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-7"
            aria-controls="basic-tabs-7"
            role="tab"
          >
            Inquiries
          </button>
          <button
            type="button"
            className="hs-tab-active:font-semibold hs-tab-active:bg-[#013D74] hs-tab-active:uppercase hs-tab-active:text-white py-2 px-6 inline-flex items-center gap-2 rounded-full text-sm whitespace-nowrap text-black hover:bg-white hover:text-[#013D74]"
            id="basic-tabs-item-1"
            data-hs-tab="#basic-tabs-8"
            aria-controls="basic-tabs-8"
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
