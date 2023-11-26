import React from "react";
import { RiServiceFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineStop, AiOutlineEye } from "react-icons/ai";
import { FaArchive, FaPlus } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Breadcrumb from "../../components/archivedServices/Breadcrumb";
import { FaTrashRestore } from "react-icons/fa";
import ViewArchivedServices from "../../components/archivedServices/ViewArchivedServices";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";

function ArchiveServices() {
  const [services, setServices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const handleView = (service) => {
    setSelectedService(service);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=true`
        ); // Replace "/api/services" with the actual API endpoint URL for fetching all services
        setServices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [brgy]);

  const tableHeader = [
    "SERVICE NAME",
    "DETAILS",
    "TYPE OF SERVICE",
    "DATE",
    "STATUS",
    "ACTION",
  ];

  useEffect(() => {
    document.title = "Archived Services | Barangay E-Services Management";
  }, []);
  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6 lg:h-full border rounded-lg bg-gray-100 shadow-lg">
      <div className="w-full flex items-center justify-center bg-[#013D74] rounded-t-lg">
        <h1 className="text-white text-3xl py-2 px-5 font-heavy ">
          BARANGAY {brgy ? brgy.toUpperCase() : ""} INFORMATION
        </h1>
      </div>

      <div className="mt-3 py-4 px-4">
      <div>
        {/* Header */} <Breadcrumbs />
        <div className="flex flex-row lg:mt-5 sm:flex-col-reverse lg:flex-row w-full">
          <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[20px] xxl:text-[1.5rem] xxxl:text-3xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              ARCHIVED OFFICIALS
            </h1>
          </div>
        </div>

        <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
          <div className="sm:flex-col-reverse md:flex-row flex justify-between w-full">
            <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
              <button
                id="hs-dropdown"
                type="button"
                className="bg-[#295141] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
              >
                SORT BY
                <svg
                  className={`hs-dropdown-open:rotate-${
                    sortOrder === "asc" ? "180" : "0"
                  } w-2.5 h-2.5 text-white`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <ul
                className="bg-[#295141] border-2 border-[#ffb13c] hs-dropdown-menu w-96 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 shadow-md rounded-lg p-2"
                aria-labelledby="hs-dropdown"
              >
                <li
                  onClick={() => handleSort("name")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  NAME
                  {sortColumn === "name" && (
                    <span className="ml-auto">
                      {sortOrder === "asc" ? (
                        <span>DESC &darr;</span>
                      ) : (
                        <span>ASC &uarr;</span>
                      )}
                    </span>
                  )}
                </li>
                <li
                  onClick={() => handleSort("rendered_service")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  RENDERED SERVICE
                  {sortColumn === "rendered_service" && (
                    <span className="ml-auto">
                      {sortOrder === "asc" ? (
                        <span className="text-xs">OLD TO LATEST &darr;</span>
                      ) : (
                        <span className="text-xs">LATEST TO OLD &uarr;</span>
                      )}
                    </span>
                  )}
                </li>
              </ul>
            </div>
            <div className="sm:flex-col md:flex-row flex sm:w-full md:w-7/12">
              <div className="flex flex-row w-full md:mr-2">
                <button className=" bg-[#295141] p-3 rounded-l-md">
                  <div className="w-full overflow-hidden">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </button>
                <label
                  htmlFor="hs-table-with-pagination-search"
                  className="sr-only"
                >
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="sm:px-3 sm:py-1 md:px-3 md:py-1 block w-full text-black border-gray-200 rounded-r-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                  placeholder="Search for items"
                />
              </div>
              <div className="sm:mt-2 md:mt-0 flex w-full items-center justify-center space-x-2">
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-generate-reports-modal"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md bg-blue-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <BsPrinter size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Generate Report
                    </span>
                  </button>
                </div>
                <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-restore-official-modal"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md   bg-[#295141] font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <MdRestartAlt size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Restore Selected Officials
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
       <div className="overflow-auto sm:overflow-x-auto lg:h-[710px] xl:h-[700px] xxl:h-[700px] xxxl:h-[640px]">
            <table className="w-full ">
            <thead className="bg-[#295141] sticky top-0">
              <tr className="">
                <th scope="col" className="px-6 py-4">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      name=""
                      onClick={checkAllHandler}
                      id=""
                    />
                  </div>
                </th>
                {tableHeader.map((item, idx) => (
                  <th
                    scope="col"
                    key={idx}
                    className="px-6 py-3 text-center text-xs font-bold text-white uppercase"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="odd:bg-slate-100">
              {officials.map((item, index) => (
                <tr key={index} className="odd:bg-slate-100 text-center">
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        value={item._id}
                        onChange={checkboxHandler}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      <div className="px-2 sm:px-6 py-2">
                        {item.picture.link ? (
                          <img
                            src={item.picture.link}
                            alt="Profile"
                            className="lg:w-20 lg:h-20 w-16 h-16 object-cover border border-4 border-[#013D74] rounded-full mx-auto"
                          />
                        ) : (
                          <FaUserCircle className="lg:w-20 lg:h-20 w-16 h-16 object-cover border border-4 border-[#013D74] rounded-full text-gray-500 mx-auto" />
                        )}
                      </div>
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        {item.position}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center items-center">
                      <span className="text-xs sm:text-sm text-black line-clamp-2">
                        {dateFormat(item.fromYear) || ""} -{" "}
                        {dateFormat(item.toYear) || ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                      <button
                        onClick={() => handleView(item)}
                        type="button"
                        data-hs-overlay="#hs-view-archived-official-modal"
                        className="text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                      >
                        <AiOutlineEye size={24} style={{ color: "#ffffff" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          <div className="md:py-4 md:px-4 bg-[#013D74] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
            <span className="font-medium text-white sm:text-xs text-sm">
              Showing 1 out of 15 pages
            </span>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">>"
              onPageChange={() => {}}
              pageRangeDisplayed={3}
              pageCount={15}
              previousLabel="<<"
              className="flex space-x-3 text-white font-bold "
              activeClassName="text-yellow-500"
              disabledLinkClassName="text-gray-300"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      {/* <ServiceApprovalModal />
      <ServiceDeclineModal /> */}
      <ViewArchivedServices selectedService={selectedService} setSelectedService={setSelectedService}  />
    </div>
  );
}

export default ArchiveServices;
