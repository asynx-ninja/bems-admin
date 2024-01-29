import React from "react";
import {AiFillNotification} from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";


const Breadcrumbs = ({ id, brgy }) => {
  return (
    <nav className="flex p-6 mt-4 ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li className="flex items-center">
          <AiFillNotification className="mr-2 text-gray-900" />
          <a
            href={`/barangayinformation/?id=${id}&brgy=${brgy}`}
            className="text-gray-900 font-bold hover:underline uppercase"
          >
            Barangay Information
          </a>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="flex items-center font-bold text-teal-600 uppercase">
          <BiMessageSquareDetail className="mr-2" />
          Archived Announcement
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
