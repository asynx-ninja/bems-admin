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
import Breadcrumb from "../../components/barangaytabs/brgyarchivedServices/Breadcrumb";
import { FaTrashRestore } from "react-icons/fa";
import ViewArchivedServices from "../../components/barangaytabs/brgyarchivedServices/ViewArchivedServices";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import GenerateReportsModal from "../../components/barangaytabs/brgyarchivedServices/GenerateReportsModal";
import noData from "../../assets/image/no-data.png";
function ArchiveServices() {
  const [services, setServices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [filteredServices, setFilteredServices] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const handleView = (service) => {
    setSelectedService(service);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${API_LINK}/services/?brgy=${brgy}&archived=false&status=${statusFilter}&type=${serviceFilter}&page=${currentPage}`
      );
      if (response.status === 200) {
        setServices(response.data.result);
        setPageCount(response.data.pageCount);
        setFilteredServices(response.data.result)
      } else setServices([]);
    };

    fetch();
  }, [brgy, statusFilter, serviceFilter, currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

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

  const Services = services.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusFilter = (selectedStatus) => {
    setStatusFilter(selectedStatus);
  };
  const handleServiceFilter = (selectedStatus) => {
    setServiceFilter(selectedStatus);
  };


  const handleResetFilter = () => {
    setStatusFilter("all");
    setServiceFilter("all");
    setDateFilter(null);
    setSearchQuery("");
  };

  return (
    <div className="mx-4 mt-[10rem] lg:mt-8 lg:w-[calc(100vw_-_305px)] xxl:w-[calc(100vw_-_440px)] xxl:w-[calc(100vw_-_310px)]">
      <div className="w-full flex items-center justify-center bg-[#295141] rounded-t-lg">
        <h1 className="text-white text-3xl py-2 px-5 font-heavy ">
          BARANGAY {brgy ? brgy.toUpperCase() : ""} INFORMATION
        </h1>
      </div>
      <div className="flex items-center justify-start bg-gray-100">
        <Breadcrumb brgy={brgy} id={id} />
      </div>
      <div className="py-4 px-4">
        <div>
          {/* Header */}
          <div className="flex flex-row  sm:flex-col-reverse lg:flex-row w-full">
            <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-3/5 xxl:h-[4rem] xxxl:h-[5rem]">
              <h1
                className="text-center sm:text-[15px] mx-auto font-bold md:text-xl lg:text-[1.2rem] xl:text-[1.5rem] xxl:text-2xl xxxl:text-3xl xxxl:mt-1 text-white"
                style={{ letterSpacing: "0.2em" }}
              >
                ARCHIVED SERVICES
              </h1>
            </div>
          </div>

          <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
            <div className="sm:flex-col-reverse md:flex-row flex justify-between w-full">
               <div className="flex flex-col lg:flex-row lg:space-x-2 md:mt-2 lg:mt-0 md:space-y-2 lg:space-y-0">
              {/* Status Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#295141] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                >
                  STATUS
                  <svg
                    className="w-2.5 h-2.5 text-white"
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
                  className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-xl rounded-xl p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <a
                    onClick={handleResetFilter}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-2 text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 hover:rounded-[12px] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    RESET FILTERS
                  </a>
                  <hr className="border-[#4e4e4e] my-1" />
                  <a
                    onClick={() => handleStatusFilter("Pending")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    PENDING
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Approved")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    APPROVED
                  </a>
                  <a
                    onClick={() => handleStatusFilter("Disapproved")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    DISAPPROVED
                  </a>
                </ul>
              </div>

              {/* Service Type Sort */}
              <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                <button
                  id="hs-dropdown"
                  type="button"
                  className="bg-[#295141] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                >
                  SERVICE TYPE
                  <svg
                    className="w-2.5 h-2.5 text-white"
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
                  className="bg-[#f8f8f8] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-xl rounded-xl p-2 "
                  aria-labelledby="hs-dropdown"
                >
                  <a
                    onClick={handleResetFilter}
                    className="flex items-center font-medium uppercase gap-x-3.5 py-2 px-2 text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 hover:rounded-[12px] focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    RESET FILTERS
                  </a>
                  <hr className="border-[#4e4e4e] my-1" />
                  <a
                    onClick={() => handleServiceFilter("Healthcare")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    HEALTHCARE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Education")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    EDUCATION
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Social Welfare")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SOCIAL WELFARE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Security and Safety")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    SECURITY AND SAFETY
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Infrastructure")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    INFRASTRUCTURE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Community")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    COMMUNITY
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Administrative")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    ADMINISTRATIVE
                  </a>
                  <a
                    onClick={() => handleServiceFilter("Environmental")}
                    class="flex items-center font-medium uppercase gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                    href="#"
                  >
                    ENVIRONMENTAL
                  </a>
                </ul>
              </div>
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
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      const Service = services.filter((item) =>
                        item.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      );

                      setFilteredServices(Service);
                    }}
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
                  {/* <div className="hs-tooltip inline-block w-full">
                  <button
                    type="button"
                    data-hs-overlay="#hs-modal-restoreInquiry"
                    className="hs-tooltip-toggle sm:w-full md:w-full text-white rounded-md  bg-pink-800 font-medium text-xs sm:py-1 md:px-3 md:py-2 flex items-center justify-center"
                  >
                    <FaTrashRestore size={24} style={{ color: "#ffffff" }} />
                    <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Restore Selected Services
                    </span>
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto sm:overflow-x-auto h-[calc(100vh_-_315px)] xxxl:h-[calc(100vh_-_326px)]">
            <table className="w-full ">
              <thead className="bg-[#295141] sticky top-0">
                <tr className="">
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
                {filteredServices.length === 0 ? (
                    <tr>
                    <td
                      colSpan={tableHeader.length + 1}
                      className="text-center  overflow-y-hidden h-[calc(100vh_-_400px)] xxxl:h-[calc(100vh_-_326px)]"
                    >
                      <img
                        src={noData}
                        alt=""
                        className="w-[150px] h-[100px] md:w-[270px] md:h-[200px] lg:w-[250px] lg:h-[180px] xl:h-72 xl:w-96 mx-auto"
                      />
                      <strong className="text-[#535353]">NO DATA FOUND</strong>
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((item, index) => (
                    <tr key={index} className="odd:bg-slate-100 text-center">
                      <td className="px-6 py-3">
                        <span className="text-xs sm:text-sm text-black line-clamp-2">
                          {item.name}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          <span className="text-xs sm:text-sm text-black line-clamp-2">
                            {item.details}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          <span className="text-xs sm:text-sm text-black line-clamp-2">
                            {item.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          <span className="text-xs sm:text-sm text-black line-clamp-2">
                            {new Date(service.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div
                          className={`flex items-center justify-center ${item.isApproved === "Approved"
                              ? "bg-custom-green-button3"
                              : item.isApproved === "Pending"
                                ? "bg-custom-yellow"
                                : "bg-custom-red-button"
                            } m-2`}
                        >
                          <span className="text-xs sm:text-sm text-white p-3 mx-5">
                            {item.isApproved}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center space-x-1 sm:space-x-none">
                          <button
                            type="button"
                            data-hs-overlay="#hs-view-archived-service-modal"
                            onClick={() => handleView({ ...item })}
                            className="text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                          >
                            <AiOutlineEye
                              size={24}
                              style={{ color: "#ffffff" }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="md:py-4 md:px-4 bg-[#295141] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
            <span className="font-medium text-white sm:text-xs text-sm">
              Showing {currentPage + 1} out of {pageCount} pages
            </span>
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                pageCount > currentPage + 1 ? (
                  <span className="text-white">&gt;&gt;</span>
                ) : (
                  <span className="text-gray-300 cursor-not-allowed">
                    &gt;&gt;
                  </span>
                )
              }
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel={
                currentPage > 0 ? (
                  <span className="text-white"> &lt;&lt;</span>
                ) : (
                  <span className="text-gray-300 cursor-not-allowed">
                    &lt;&lt;
                  </span>
                )
              }
              className="flex space-x-3 text-white font-bold"
              activeClassName="text-yellow-500"
              disabledLinkClassName="text-gray-300"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <GenerateReportsModal />
      <ViewArchivedServices selectedService={selectedService} setSelectedService={setSelectedService} />
    </div>
  );
}

export default ArchiveServices;
