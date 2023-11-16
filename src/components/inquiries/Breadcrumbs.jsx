import React from 'react';
import { FaHome, FaArchive } from "react-icons/fa";
const Breadcrumb = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li className="flex items-center">
          <FaHome className="mr-2 text-gray-900" />
          <a
            href="/inquiries"
            className="text-gray-900 font-bold hover:underline uppercase"
          >
            Inquiries
          </a>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="flex items-center font-bold text-teal-600 uppercase">
          <FaArchive className="mr-2" />
          Archived Inquiries
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
