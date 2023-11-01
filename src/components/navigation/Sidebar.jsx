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
import { useEffect } from "react";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  console.log(currentPath);

  return (
    <div className="">
      <div
        id="hs-overlay-basic"
        className="bg-[#013D74] h-screen 2xl:h-full overflow-hidden hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden absolute top-9 left-0 bottom-0 z-[60] w-64 m-5 rounded-[25px] overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 "
      >
        <div className='bg-[url("/imgs/bg-header.png")] w-full flex flex-col items-center justify-center py-5 px-2 space-y-3'>
          <img src={logo} alt="" className="" width={80} />
          <div>
            <h1 className="uppercase font-bold text-white text-sm">
              Dr. Kenshi Takahashi
            </h1>
            <p className="text-white text-xs">kenshi.takahashi@gmail.com</p>
          </div>
        </div>
        <nav className="px-6 pt-6 flex flex-col flex-wrap ">
          <ul className="space-y-1.5 text-white font-bold uppercase">
            <li>
              <Link
                to="/dashboard"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/dashboard"
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <BiSolidDashboard size={15} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/announcements"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/announcements"
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <ImBullhorn size={15} />
                Announcements
              </Link>
            </li>
            <li>
              <Link
                to="/inquiries"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/inquiries"
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <FaRegNoteSticky size={15} />
                Inquiries
              </Link>
            </li>
            <li>
              <Link
                to="/residents"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/residents"
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <BsPeopleFill size={15} />
                Residents
              </Link>
            </li>
      
            <li>
            <Link
                  to="/barangaymenu"
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
                    currentPath === "/barangaymenu"
                      ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                      : null
                  } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
                >
                  <FaChalkboardTeacher size={15} />
                  Barangay Management
                </Link>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/settings"
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <MdOutlineMiscellaneousServices size={15} />
                Profile Settings
              </Link>
            </li>
            <li>
              <Link
                to="/" replace
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === "/"
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <HiMiniInformationCircle size={15} />
                Sign-Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
