import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { FaArchive, FaReply, FaTrashRestore } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import imgSrc from "/imgs/bg-header.png";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Breadcrumbs from "../../components/barangaytabs/brgyarchivedInquiries/Breadcrumbs";
import ViewArchivedModal from "../../components/barangaytabs/brgyInquiries/ViewArchived";
import axios from "axios";
import API_LINK from "../../config/API";
import { useSearchParams } from "react-router-dom";
import Tabss from "../../pages/BarangayInfoExt"
import moment from "moment";

const BrgyArchivedInquiries = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const to = "Staff";
  const [inquiries, setInquiries] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  //status filtering
  const [status, setStatus] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");

  //query
  const [searchQuery, setSearchQuery] = useState("");


  //date filtering
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [selected, setSelected] = useState("date");
  const [filteredInquiries, setFilteredInquiries] = useState([]);

  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";

    const fetchInquiries = async () => {
      const response = await axios.get(
        `${API_LINK}/inquiries/staffinquiries/?id=${id}&brgy=${brgy}&archived=true&status=${statusFilter}&page=${currentPage}`
      );
      console.log("API URL:");

      if (response.status === 200) {
        setInquiries(response.data.result);
        setFilteredInquiries(response.data.result);
        setPageCount(response.data.pageCount);
      } else {
        setInquiries([]);
      }
    };

    fetchInquiries();
  }, [id, brgy, statusFilter, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  }

  const tableHeader = [
    "name",
    "e-mail",
    "date",
    "status",
    "actions",
  ];

  useEffect(() => {
    document.title = "Inquiries | Barangay E-Services Management";
  }, []);

  const DateFormat = (date) => {
    const dateFormat = date === undefined ? "" : date.substr(0, 10);
    return dateFormat;
  };

  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = inquiries.slice().sort((a, b) => {
      if (sortBy === "inquiries_id") {
        return newSortOrder === "asc"
          ? a.inquiries_id.localeCompare(b.inquiries_id)
          : b.inquiries_id.localeCompare(a.inquiries_id);
      } else if (sortBy === "lastName") {
        return newSortOrder === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      } else if (sortBy === "isApproved") {
        const order = { Completed: 1, "In Progress": 2, "Not Responded": 3 };
        return newSortOrder === "asc"
          ? order[a.isApproved] - order[b.isApproved]
          : order[b.isApproved] - order[a.isApproved];
      }

      return 0;
    });

    setInquiries(sortedData);
  };

  const handleView = (item) => {
    setInquiry(item);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleResetFilter = () => {
    setStatusFilter("all");
    setSearchQuery("");
    setFilteredInquiries();
  };

  const filters = (choice, selectedDate) => {
    switch (choice) {
      case "date":
        return inquiries.filter((item) => {
          console.log(typeof new Date(item.compose.date), selectedDate);
          return (
            new Date(item.compose.date).getFullYear() ===
            selectedDate.getFullYear() &&
            new Date(item.compose.date).getMonth() ===
            selectedDate.getMonth() &&
            new Date(item.compose.date).getDate() === selectedDate.getDate()
          );
        });

      case "week":
        const startDate = selectedDate;
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        console.log("start and end", startDate, endDate);

        return inquiries.filter(
          (item) =>
            new Date(item.compose.date).getFullYear() ===
            startDate.getFullYear() &&
            new Date(item.compose.date).getMonth() === startDate.getMonth() &&
            new Date(item.compose.date).getDate() >= startDate.getDate() &&
            new Date(item.compose.date).getDate() <= endDate.getDate()
        );
      case "month":
        return inquiries.filter(
          (item) =>
            new Date(item.compose.date).getFullYear() ===
            selectedDate.getFullYear() &&
            new Date(item.compose.date).getMonth() === selectedDate.getMonth()
        );
      case "year":
        return inquiries.filter(
          (item) =>
            new Date(item.compose.date).getFullYear() ===
            selectedDate.getFullYear()
        );
    }
  };

  const onSelect = (e) => {
    console.log("select", e.target.value);

    setSelected(e.target.value);

    console.log("specified select", filters(e.target.value, specifiedDate));
  };

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setSpecifiedDate(date);
    setFilteredInquiries(filters(selected, date));
  };

  const onChangeWeek = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
    setFilteredInquiries(filters(selected, date));
  };

  const onChangeMonth = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
    setFilteredInquiries(filters(selected, date));
  };

  const onChangeYear = (e) => {
    if (e.target.value === "") {
      setFilteredInquiries(inquiries);
    } else {
      const date = new Date(e.target.value, 0, 1);
      setSpecifiedDate(date);
      console.log("selected year converted date", date);
      console.log("specified year", filters(selected, date));
      setFilteredInquiries(filters(selected, date));
    }
  };

  return (
    <div className="mx-4 mt-[10rem] lg:mt-8 lg:w-[calc(100vw_-_305px)] xxl:w-[calc(100vw_-_440px)] xxl:w-[calc(100vw_-_310px)]">
      <div className="w-full flex items-center justify-center bg-[#295141] rounded-t-lg">
        <h1 className="text-white text-3xl py-2 px-5 font-heavy ">
          BARANGAY {brgy ? brgy.toUpperCase() : ""} INFORMATION
        </h1>
      </div>
      <div className="flex items-center justify-start bg-gray-100">

        <Breadcrumbs brgy={brgy} id={id} />
      </div>
      <div className="mt-3 py-4 px-4">
        <div>

          <div className="flex flex-row  sm:flex-col-reverse lg:flex-row w-full">
            <div className="flex justify-center items-center sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-3/5 xxl:h-[4rem] xxxl:h-[5rem]">
              <h1
                className="sm:text-[15px] mx-auto font-bold md:text-xl text-center lg:text-[1.2rem] xl:text-[1.5rem] xxl:text-[1.5rem] xxxl:text-4xl text-white"
                style={{ letterSpacing: "0.2em" }}
              >
                ARCHIVED INQUIRIES
              </h1>
            </div>
          </div>

          <div className="py-2 px-2 bg-gray-400 border-0 border-t-2 border-white">
            <div className="sm:flex-col-reverse md:flex-row flex justify-between w-full">
              <div className="flex space-x-2">
                {/* Status Sort */}
                <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                  <button
                    id="hs-dropdown"
                    type="button"
                    className="bg-[#295141] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                  >
                    STATUS
                    <svg
                      className={`hs-dropdown w-2.5 h-2.5 text-white`}
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
                      onClick={() => handleStatusFilter("In Progress")}
                      class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                      href="#"
                    >
                      IN PROGRESS
                    </a>
                    <a
                      onClick={() => handleStatusFilter("Completed")}
                      class="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-xl text-sm text-black hover:bg-[#b3c5cc] hover:text-gray-800 focus:ring-2 focus:ring-blue-500"
                      href="#"
                    >
                      COMPLETED
                    </a>
                  </ul>
                </div>

                {/* Date Sort */}
                <div className="hs-dropdown relative inline-flex sm:[--placement:bottom] md:[--placement:bottom-left]">
                  <button
                    id="hs-dropdown"
                    type="button"
                    className="bg-[#295141] sm:w-full md:w-full sm:mt-2 md:mt-0 text-white hs-dropdown-toggle py-1 px-5 inline-flex justify-center items-center gap-2 rounded-md  font-medium shadow-sm align-middle transition-all text-sm  "
                  >
                    DATE
                    <svg
                      className={`hs-dropdown w-2.5 h-2.5 text-white`}
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
                    <div class="hs-dropdown relative inline-flex flex-col w-full space-y-1 my-2 px-2">
                      <label className="text-black font-medium mb-1">
                        DATE RANGE
                      </label>
                      <div className="flex flex-col gap-2">
                        <select
                          className="bg-[#f8f8f8] text-gray-600 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                          onChange={onSelect}
                          defaultValue={selected}
                        >
                          <option value="date">Specific Date</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </select>
                        {selected === "date" && (
                          <input
                            className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                            type="date"
                            id="date"
                            name="date"
                            onChange={onChangeDate}
                          />
                        )}
                        {selected === "week" && (
                          <input
                            className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                            type="week"
                            id="week"
                            name="week"
                            onChange={onChangeWeek}
                          />
                        )}
                        {selected === "month" && (
                          <input
                            className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                            type="month"
                            id="month"
                            name="month"
                            onChange={onChangeMonth}
                          />
                        )}
                        {selected === "year" && (
                          <input
                            className="bg-[#f8f8f8] text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black w-full"
                            type="number"
                            id="year"
                            name="year"
                            placeholder="YEAR"
                            onChange={onChangeYear}
                            min={1990}
                            max={new Date().getFullYear() + 10}
                          />
                        )}
                      </div>
                    </div>
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
                      const Inquiries = inquiries.filter(
                        (item) =>
                          item.name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase()) ||
                          item.inq_id
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                      );
  
                      setFilteredInquiries(Inquiries);
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
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-auto sm:overflow-x-auto h-[calc(100vh_-_315px)] xxxl:h-[calc(100vh_-_330px)]">
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
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400">
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((item, index) => (
                    <tr key={index} className="odd:bg-slate-100 text-center">

                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          <span className="text-xs sm:text-sm text-black  line-clamp-2 ">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          <span className="text-xs sm:text-sm text-black line-clamp-2">
                            {DateFormat(item.compose.date) || ""}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center items-center">
                          {item.isApproved === "Completed" && (
                            <div className="flex w-full items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                COMPLETED
                              </span>
                            </div>
                          )}
                          {item.isApproved === "Not Responded" && (
                            <div className="flex w-full items-center justify-center bg-custom-red-button m-2 rounded-lg">
                              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                NOT RESPONDED
                              </span>
                            </div>
                          )}
                          {item.isApproved === "In Progress" && (
                            <div className="flex w-full items-center justify-center bg-custom-amber m-2 rounded-lg">
                              <span className="text-xs sm:text-sm font-bold text-white p-3 mx-5">
                                IN PROGRESS
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex justify-center space-x-1 sm:space-x-none">
                          <div className="hs-tooltip inline-block w-full">
                            <button
                              type="button"
                              data-hs-overlay="#hs-modal-viewArchived"
                              onClick={() => handleView({ ...item })}
                              className="hs-tooltip-toggle text-white bg-teal-800 font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                            >
                              <AiOutlineEye
                                size={24}
                                style={{ color: "#ffffff" }}
                              />
                            </button>
                            <span
                              className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                              role="tooltip"
                            >
                              View Inquiry
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
      <ViewArchivedModal inquiry={inquiry} setInquiry={setInquiry} />
    </div>
  );
};

export default BrgyArchivedInquiries;
