import React, { useEffect, useState } from "react";
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
import {
  useLocation,
  useNavigate,
  matchRoutes,
  useSearchParams,
} from "react-router-dom";
import API_LINK from "../../config/API";
import axios from "axios";
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [userData, setUserData] = useState({});
  const [pfp, setPfp] = useState();
  const handleFileChange = (e) => {
    e.preventDefault();

    setPfp(e.target.files[0]);

    var output = document.getElementById("pfp");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          console.log(res.data[0].profile.link);
          var pfpSrc = document.getElementById("pfp1");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : logo;
        } else {
          setError("Invalid username or password");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUserData();
  }, [id]);
  console.log(currentPath);

  return (
    <div className="">
      <div
        id="hs-overlay-basic"
        className="bg-[#013D74] h-screen 2xl:h-full overflow-hidden hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden absolute top-9 left-0 bottom-0 z-[60] lg:z-[50] w-64 m-5 rounded-[25px] overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 "
      >
        <div className='bg-[url("/imgs/bg-header.png")] w-full flex flex-col items-center justify-center py-5 px-2 space-y-3'>

          <img id="pfp1" alt="" className="rounded-full w-[120px] object-cover h-[120px] border-[5px] border-[#013D74]" />
          <div>
            <h1 className="uppercase font-bold text-white text-sm text-center">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-white text-xs text-center">{userData.email}</p>
          </div>
        </div>
        <nav className="px-6 pt-6 flex flex-col flex-wrap ">
          <ul className="space-y-1.5 text-white font-bold uppercase">
            <li>
              <Link
                to={`/dashboard/?id=${id}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === `/dashboard/?id=${id}`
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
                to={`/announcements/?id=${id}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === `/announcements/?id=${id}`
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <ImBullhorn size={15} />
                Municipality Announcements
              </Link>
            </li>
            <li>
              <Link
                to={`/inquiries/?id=${id}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === `/inquiries/?id=${id}`
                    ? "bg-gradient-to-r from-[#013D74] to-[#3248a4] text-[#EFC586]"
                    : null
                } flex items-center gap-x-3 py-2 px-2.5  text-sm rounded-md hover:text-[#EFC586] hover:bg-gradient-to-r from-[#013D74] to-[#3248a4]`}
              >
                <FaRegNoteSticky size={15} />
                Municipality Inquiries
              </Link>
            </li>
            <li>
              <Link
                to={`/barangaymenu/?id=${id}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === `/barangaymenu/?id=${id}`
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
                to={`/settings/?id=${id}`}
                onClick={() => {
                  window.innerWidth >= 320 && window.innerWidth <= 1023
                    ? document
                        .getQuerySelector("[data-hs-overlay-backdrop-template]")
                        .remove()
                    : null;
                }}
                className={`${
                  currentPath === `/settings/?id=${id}`
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
                to="/"
                replace
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
