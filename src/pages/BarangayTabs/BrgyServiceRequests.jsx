import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineStop, AiOutlineEye } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
<<<<<<< HEAD
import ReplyServiceModal from "../../components/barangaytabs/brgyserviceRequests/ReplyServiceModal";
import ArchiveRequestsModal from "../../components/barangaytabs/brgyserviceRequests/ArchiveRequestsModal";
import RequestsReportsModal from "../../components/barangaytabs/brgyserviceRequests/RequestsReportsModal";
import imgSrc from "/imgs/bg-header.png";
=======
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import RequestsReportsModal from "../../components/barangaytabs/brgyserviceRequests/RequestsReportsModal";
import ReplyServiceModal from "../../components/barangaytabs/brgyserviceRequests/ReplyServiceModal"
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
import ViewRequestModal from "../../components/barangaytabs/brgyserviceRequests/ViewRequestModal";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";

<<<<<<< HEAD
const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState({ response: [{ file: [] }] });
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
=======
function ServiceRequests() {
  const [searchParams] = useSearchParams();
  const [requests, setRequests] = useState([]);
  const [request, setRequest] = useState({ response: [{ file: [] }] });
  const brgy = searchParams.get("brgy");
  const id = searchParams.get("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          `${API_LINK}/requests/?brgy=${brgy}&archived=false`
        );

        if (response.status === 200) setRequests(response.data);
=======
          `${API_LINK}/requests/?brgy=${brgy}&archived=false&page=${currentPage}`
        );
        console.log(response)

        if (response.status === 200)
        {
          setPageCount(response.data.pageCount);
          setRequests(response.data.result);
        }
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
<<<<<<< HEAD
  }, []);
=======
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06

  useEffect(() => {
    document.title = "Service Requests | Barangay E-Services Management";
  }, []);
<<<<<<< HEAD

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = e.target.value;
=======
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06


  const handleView = (item) => {
    setRequest(item);
  };
<<<<<<< HEAD

  const checkAllHandler = () => {
    if (requests.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const postIds = requests.map((item) => {
        return item._id;
      });

      setSelectedItems(postIds);
    }
  };

=======
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
  const tableHeader = [
    "SERVICE NAME",
    "TYPE OF SERVICE",
    "DATE",
    "STATUS",
    "ACTIONS",
  ];

<<<<<<< HEAD
  const handleView = (item) => {
    setRequest(item);
  };

=======
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
  const handleSort = (sortBy) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortColumn(sortBy);

    const sortedData = requests.slice().sort((a, b) => {
      if (sortBy === "request_id") {
        return newSortOrder === "asc"
          ? a.request_id.localeCompare(b.request_id)
          : b.request_id.localeCompare(a.request_id);
      } else if (sortBy === "service_name") {
        return newSortOrder === "asc"
          ? a.service_name.localeCompare(b.service_name)
          : b.service_name.localeCompare(a.service_name);
      } else if (sortBy === "status") {
        const order = { Completed: 1, " Not Responded": 2, Pending: 3, Paid: 4, Processing: 5,  Cancelled: 6, Rejected: 7 };
        return newSortOrder === "asc"
          ? order[a.status] - order[b.status]
          : order[b.status] - order[a.status];
      }

      return 0;
    });

    setRequests(sortedData);
  };

<<<<<<< HEAD
  console.log("req parent", requests);

=======
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
  return (
    <div className="">
    {/* Body */}
    <div>
      {/* Header */}
      <div className="flex flex-row sm:flex-col-reverse lg:flex-row w-full">
          <div className="sm:mt-5 md:mt-4 lg:mt-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] py-2 lg:py-4 px-5 md:px-10 lg:px-0 xl:px-10 sm:rounded-t-lg lg:rounded-t-[1.75rem]  w-full lg:w-2/5 xxl:h-[4rem] xxxl:h-[5rem]">
            <h1
              className="text-center mx-auto font-bold text-xs md:text-xl lg:text-[16px] xl:text-[20px] xxl:text-3xl xxxl:text-3xl xxxl:mt-1 text-white"
              style={{ letterSpacing: "0.2em" }}
            >
              SERVICE REQUESTS
            </h1>
          </div>
          <div className="lg:w-3/5 flex flex-row justify-end items-center ">
            <div className="sm:w-full md:w-full lg:w-2/5 flex sm:flex-col md:flex-row md:justify-center md:items-center sm:space-y-2 md:space-y-0 md:space-x-2 ">
              <div className="w-full rounded-lg ">
<<<<<<< HEAD
                <Link to={`/archivedrequests/?id=${id}&brgy=${brgy}`}>
=======
                <Link to={`/brgyarchivedservicesreq/?id=${id}&brgy=${brgy}`}>
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
                  <div className="hs-tooltip inline-block w-full">
                    <button
                      type="button"
                      data-hs-overlay="#hs-modal-add"
                      className="hs-tooltip-toggle justify-center sm:px-2 sm:p-2 md:px-5 md:p-3 rounded-lg bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] w-full text-white font-medium text-sm text-center inline-flex items-center"
                    >
                      <FaArchive size={24} style={{ color: "#ffffff" }} />
                      <span className="sm:block md:hidden sm:pl-5">
                        Archived Requests
                      </span>
                      <span
                        className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                        role="tooltip"
                      >
                        Archived Requests
                      </span>
                    </button>
                  </div>
                </Link>
              </div>
            </div>
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
                  className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
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
                className="bg-[#253a7a] border-2 border-[#ffb13c] hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10  shadow-md rounded-lg p-2 "
                aria-labelledby="hs-dropdown"
              >
                <li
                  onClick={() => handleSort("request_id")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  SERVICE REQUEST ID
                  {sortColumn === "request_id" && (
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
                  onClick={() => handleSort("service_name")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  SERVICE REQUEST NAME
                  {sortColumn === "service_name" && (
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
                  onClick={() => handleSort("status")}
                  className="font-medium uppercase flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-white hover:bg-gradient-to-r from-[#295141] to-[#408D51] hover:text-[#EFC586] focus:ring-2 focus:ring-blue-500 "
                >
                  STATUS
                  {sortColumn === "status" && (
                    <span className="ml-auto">
                      {sortOrder === "asc" ? (
                        <span>DESC &darr;</span>
                      ) : (
                        <span>ASC &uarr;</span>
                      )}
                    </span>
                  )}
                </li>
              </ul>
            </div>
            <div className="sm:flex-col md:flex-row flex sm:w-full md:w-4/12">
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
<<<<<<< HEAD
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
=======
             
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
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
<<<<<<< HEAD
              {requests.map((item, index) => (
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
=======
            {requests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    No data found
                  </td>
                </tr>
              ) : (
              requests.map((item, index) => (
                <tr key={index} className="odd:bg-slate-100 text-center">
                  <td className="px-6 py-3">
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
                    <span className="text-xs sm:text-sm text-black line-clamp-2">
                      {item.service_name}
                    </span>
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
                        {new Date(item.createdAt).toISOString().split("T")[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
<<<<<<< HEAD
                    {item.status === "Completed" && (
                      <div className="flex items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          COMPLETED
=======
                    {item.status === "Transaction Completed" && (
                      <div className="flex items-center justify-center bg-custom-green-button3 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          TRANSACTION COMPLETED
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
                        </span>
                      </div>
                    )}
                    {item.status === "Rejected" && (
                      <div className="flex items-center justify-center bg-custom-red-button m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          REJECTED
                        </span>
                      </div>
                    )}
                    {item.status === "Pending" && (
                      <div className="flex items-center justify-center bg-custom-amber m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          PENDING
                        </span>
                      </div>
                    )}
<<<<<<< HEAD
                    {item.status === "Not Responded" && (
                      <div className="flex items-center justify-center bg-pink-700 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          NOT RESPONDED
                        </span>
                      </div>
                    )}
=======
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
                    {item.status === "Paid" && (
                      <div className="flex items-center justify-center bg-violet-800 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          PAID
                        </span>
                      </div>
                    )}

                    {item.status === "Processing" && (
                      <div className="flex items-center justify-center bg-blue-800 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          PROCESSING
                        </span>
                      </div>
                    )}

                    {item.status === "Cancelled" && (
                      <div className="flex items-center justify-center bg-gray-800 m-2 rounded-lg">
                        <span className="text-xs sm:text-sm text-white font-bold p-3 mx-5">
                          CANCELLED
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center space-x-1 sm:space-x-none">
                      <div className="hs-tooltip inline-block">
                        <button
                          type="button"
                          data-hs-overlay="#hs-view-request-modal"
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
                          View Request
                        </span>
                      </div>
<<<<<<< HEAD

=======
>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
                      <div className="hs-tooltip inline-block">
                        <button
                          type="button"
                          data-hs-overlay="#hs-reply-modal"
                          onClick={() => handleView({ ...item })}
                          className="hs-tooltip-toggle text-white bg-custom-red-button font-medium text-xs px-2 py-2 inline-flex items-center rounded-lg"
                        >
                          <AiOutlineSend
                            size={24}
                            style={{ color: "#ffffff" }}
                          />
                        </button>
                        <span
                          className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                          role="tooltip"
                        >
                          Reply to Request
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
<<<<<<< HEAD
      </div>
      <div className="md:py-4 md:px-4 bg-[#295141] flex items-center justify-between sm:flex-col-reverse md:flex-row sm:py-3">
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
      {Object.hasOwn(request, "service_id") ? (
        <ViewRequestModal request={request} />
      ) : null}
      <ReplyServiceModal request={request} setRequest={setRequest} />
      <ArchiveRequestsModal selectedItems={selectedItems}/>
      <RequestsReportsModal />
=======
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
      {Object.hasOwn(request, "service_id") ? (
        <ViewRequestModal request={request} />
      ) : null}
      <RequestsReportsModal />
      <ReplyServiceModal request={request} setRequest={setRequest} />

>>>>>>> 819adb521167538e86d310bf12a723a31d31fa06
    </div>
  );
};

export default Requests;
