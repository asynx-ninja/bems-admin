import React from "react";
import { useEffect } from "react";
import officialimage from "../../assets/sample/official.jpg";
import { BiArchive } from "react-icons/bi";
import CreateOfficialModal from "../../components/barangaytabs/officials/CreateOfficialModal";
import EditOfficialModal from "../../components/barangaytabs/officials/EditOfficialModal";
import ArchiveOfficialModal from "../../components/barangaytabs/officials/ArchiveOfficialModal";
import { AiOutlineStop } from "react-icons/ai";

function Officials() {
  useEffect(() => {
    document.title = "Barangay Officials | Barangay E-Services Management";
  }, []);

  return (
    <div className="lg:mx-4 my-5">
      {/* Body */}
      <div>
        {/* Header */}
        <div className="flex flex-col-reverse lg:flex-row mt-5">
          {/* Table Title */}
          <div className="bg-[#013D74]  py-2 lg:py-3.5 xxl:py-5 px-5 md:px-10 lg:px-10 xxl:px-4 rounded-tr-lg w-full lg:w-3/5">
            <h1
              className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-xl xl:text-2xl xxl:text-[30px] xl:pt-1 xxl:text-xl xxl:pt-0 xxxl:text-4xl  text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              BARANGAY OFFICIALS
            </h1>
          </div>

          {/* Search - Add - Archived */}
          <div className="bg-red lg:w-3/5 flex flex-row mb-2 lg:mb-1 lg:ml-5 lg:mr-2 xl:mr-none sm:flex-col md:flex-row">
            {/* Search */}
            <div className="relative w-full my-auto">
              <form className="flex my-auto">
                <div className="relative w-full">
                  <div className="flex flex-row sm:w-12/6 sm:h-[2.5rem] ">
                    <button
                      type="submit"
                      className="md:px-5 lg:px-3 py-2 px-2 text-sm font-medium text-white bg-[#013D74] rounded-l-lg border"
                    >
                      <h1>SEARCH</h1>
                    </button>

                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 sm:w-44 md:w-full flex-grow z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300"
                      placeholder="Enter Service..."
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-row md:ml-2 lg:ml-2 space-x-3 lg:space-x-1 xl:space-x-2 my-auto md:relative md:bottom-[3px]">
              {/* Add button */}
              <div className="hs-tooltip inline-block w-full">
                <CreateOfficialModal />
              </div>

              {/* Archives button */}
              <div className="hs-tooltip inline-block w-full">
                <button
                  type="button"
                  class="text-white w-full justify-center bg-custom-red2 font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
                  style={{ margin: "10px 0", padding: "10px 20px" }}
                  id="basic-tabs-item-6"
                  data-hs-tab="#basic-tabs-6"
                  aria-controls="basic-tabs-6"
                  role="tab"
                >
                  <BiArchive
                    size={24} // You can adjust the size as needed
                    style={{ color: "#ffffff" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto lg:h-[680px] xl:h-[580px] xxl:h-[580px] xxxl:h-[530px] border">
          <table className="w-full divide-y divide-gray-200">
            {/* Table Headers */}
            <thead className="bg-gray-50 border">
              <tr>
                {/* Image */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Image
                    </span>
                  </div>
                </th>

                {/* Name */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                      Name
                    </span>
                  </div>
                </th>

                {/* Position */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Position
                    </span>
                  </div>
                </th>

                {/* Rendered Service */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Rendered Service
                    </span>
                  </div>
                </th>

                {/* Actions */}
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black mx-auto">
                      Actions
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Datas */}
              {Array(20)
                .fill("")
                .map((_, idx) => (
                  <tr className="bg-white hover-bg-gray-50 border">
                    {/* Image */}
                    <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                      <div className="px-2 sm:px-6 py-2">
                        <img
                          src={officialimage}
                          alt=""
                          className="w-32 mx-auto rounded-full"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="w-[20%] border">
                      <div className="px-2 sm:px-6 py-2">
                        <span className="text-xl sm:text-sm text-black lg:h-10 overflow-hidden">
                          Nyle Lorenz A. Chua
                        </span>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[20%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-black">
                          Vice President
                        </span>
                      </div>
                    </td>

                    {/* Rendered Service */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[20%] sm:w-1/5 whitespace-nowrap border">
                      <div className="flex items-center justify-center">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mx-5">
                          2001 - Present
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-2 py-2 sm:px-3 sm:py-3 w-[20%] sm:w-1/5 whitespace-nowrap border">
                      {/* Action Buttons */}
                      <div className="flex justify-center">
                        {/* Edit */}
                        <EditOfficialModal />

                        {/* Archive */}
                        <button
                          type="button"
                          data-hs-overlay="#hs-archive-official-modal"
                          className="text-white bg-pink-800 font-medium text-xs sm:text-sm p-1 sm:p-2 lg:px-10 lg:py-30 inline-flex items-center"
                        >
                          <AiOutlineStop
                            size={24}
                            style={{ color: "#ffffff" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ArchiveOfficialModal />
    </div>
  );
}

export default Officials;
