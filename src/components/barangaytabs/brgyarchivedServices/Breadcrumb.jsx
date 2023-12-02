import React from "react";
import { FaHome, FaArchive } from "react-icons/fa";
import { Link } from "react-router-dom";
const Breadcrumb = ({id, brgy}) => {
  return (
    <nav className="flex p-6 mt-4">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li className="flex items-center">
          <FaHome className="mr-2 text-gray-900" />
          <a
            href={`/barangayinformation/?id=${id}&brgy=${brgy}`}
            className="text-gray-900 font-bold hover:underline"
          >
            Barangay Information
          </a>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="flex items-center font-bold text-teal-600">
          <FaArchive className="mr-2" />
          Archived Inquiries
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
