import React from "react";
import logo from "../../assets/header/montalban-logo.png";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { ImBullhorn } from "react-icons/im";
import { FaRegNoteSticky } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FaServicestack, FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GoGitPullRequest } from "react-icons/go";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiAdminFill } from "react-icons/ri";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          var pfpSrc = document.getElementById("sidebarPFP");
          pfpSrc.src =
            res.data[0].profile.link !== "" ? res.data[0].profile.link : null;
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  return (
    <>
      <div
        id="hs-overlay-basic"
        className="sm:fixed lg:relative overflow-y-auto lg:block lg:end-auto lg:bottom-0 sm:block flex items-center justify-center hs-overlay-basic h-full overflow-hidden hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden top-0 z-[60] lg:z-0 lg:translate-x-0 w-[17rem]"
      >
        <div className="h-screen bg-[#295141] ">
          <div className="max-h-screen flex flex-col ">
            <div className='bg-[url("/src/assets/image/bg-sidebar.jpg")] w-full shrink-0 flex flex-col items-center justify-center py-5 px-2 space-y-3 object-cover'>
              {/* <img src={logo} alt="" className="" width={80} /> */}
              <img
                src={logo}
                className="w-[100px] h-[100px] rounded-full object-contain"
              />
              <div>
                <h1 className="uppercase font-bold text-white text-lg text-center">
                  MUNICIPALITY OF MONTALBAN
                </h1>
              </div>
            </div>
            <div className="w-full shrink-0 flex flex-row items-center justify-between px-2 border-0 py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141] border-y-[1px] space-y-3">
              {/* <img src={logo} alt="" className="" width={80} /> */}
              <div className="flex flex-row items-center justify-between w-full">
                <div className="w-4/12">
                  <img
                    id="sidebarPFP"
                    className=" w-[60px] h-[60px]  mx-auto rounded-full border-[2px] border-[#295141] object-cover"
                  />
                </div>
                <div className="w-9/12 ">
                  <h1 className="uppercase font-bold text-white text-sm">
                    {userData.lastName}, {userData.firstName}
                  </h1>
                  <p className="text-white text-xs">{userData.email}</p>
                </div>
              </div>
            </div>
            <nav className="px-6 pt-6 pb-10 flex flex-col relative overflow-y-auto">
              <ul className="space-y-1.5 text-white font-bold uppercase">
                <li>
                  <Link
                    to={`/dashboard/?id=${id}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === `/dashboard/?id=${id}`
                        ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                  >
                    <BiSolidDashboard size={15} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/announcements/?id=${id}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === `/announcements/?id=${id}`
                        ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                  >
                    <ImBullhorn size={15} />
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/inquiries/?id=${id}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === `/inquiries/?id=${id}`
                        ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                  >
                    <FaRegNoteSticky size={15} />
                    Inquiries
                  </Link>
                </li>
                <li>
                  <button
                    id="hs-unstyled-collapse"
                    data-hs-collapse="#hs-unstyled-collapse-heading"
                    className="hs-collapse-toggle justify-between flex items-center w-full  gap-x-3 py-2 px-2.5  text-sm rounded-md uppercase  hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]"
                  >
                    <div className="flex items-center gap-x-3">
                      <MdOutlineMiscellaneousServices size={15} />
                      Municipality Info
                    </div>
                    <div className="flex">
                      <svg
                        className="hs-collapse-open:rotate-180  w-2.5 h-2.5"
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
                    </div>
                  </button>
                  <div
                    id="hs-unstyled-collapse-heading"
                    className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                    aria-labelledby="hs-unstyled-collapse"
                    style={{ paddingLeft: "20px" }}
                  >
                    <Link
                       to={`/aboutus_info/?id=${id}`}
                      onClick={() => {
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      className={`${
                        currentPath === `/aboutus_info/?id=${id}`
                          ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                    >
                      <GoGitPullRequest size={15} />
                      Manage AboutUs
                    </Link> 
                    <Link
                      to={`/services_info/?id=${id}`}
                      onClick={() => {
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      className={`${
                        currentPath === `/services_info/?id=${id}`
                          ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                    >
                      <GoGitPullRequest size={15} />
                      Manage Services
                    </Link>
                    <Link
                     to={`/tourist_spot/?id=${id}`}
                      onClick={() => {
                        window.innerWidth >= 320 && window.innerWidth <= 1023
                          ? document
                              .getQuerySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove()
                          : null;
                      }}
                      className={`${
                        currentPath === `/tourist_spot/?id=${id}`
                          ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                          : null
                      } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                    >
                      <GoGitPullRequest size={15} />
                      Manage tourist spot
                    </Link>
                  </div>
                </li>
                {userData.type === "Head Admin" && (
                  <>
                    <li>
                      <Link
                        to={`/municipalityofficials/?id=${id}`}
                        onClick={() => {
                          if (
                            window.innerWidth >= 320 &&
                            window.innerWidth <= 1023
                          ) {
                            document
                              .querySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove();
                          }
                        }}
                        className={`${
                          currentPath === `/municipalityofficials/?id=${id}`
                            ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                            : ""
                        } flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                      >
                        <HiBuildingOffice2 size={15} />
                        Officials
                      </Link>
                    </li>

                    <li>
                      <Link
                        to={`/accountmanagement/?id=${id}`}
                        onClick={() => {
                          if (
                            window.innerWidth >= 320 &&
                            window.innerWidth <= 1023
                          ) {
                            document
                              .querySelector(
                                "[data-hs-overlay-backdrop-template]"
                              )
                              .remove();
                          }
                        }}
                        className={`${
                          currentPath === `/accountmanagement/?id=${id}`
                            ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                            : ""
                        } flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                      >
                        <RiAdminFill size={15} />
                        Admin Management
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link
                    to={`/barangaymenu/?id=${id}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === `/barangaymenu/?id=${id}`
                        ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                  >
                    <FaChalkboardTeacher size={15} />
                    Barangay Management
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/settings/?id=${id}&brgy=${brgy}`}
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === "/settings"
                        ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                  >
                    <MdOutlineMiscellaneousServices size={15} />
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    replace
                    onClick={() => {
                      window.innerWidth >= 320 && window.innerWidth <= 1023
                        ? document
                            .getQuerySelector(
                              "[data-hs-overlay-backdrop-template]"
                            )
                            .remove()
                        : null;
                    }}
                    className={`${
                      currentPath === "/"
                        ? "bg-gradient-to-r from-[#295141] to-[#408D51] text-[#EFC586]"
                        : null
                    } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#295141] to-[#408D51]`}
                  >
                    <HiMiniInformationCircle size={15} />
                    Sign-Out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
