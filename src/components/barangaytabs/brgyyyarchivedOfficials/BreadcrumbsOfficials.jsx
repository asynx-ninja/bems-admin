import React from 'react';
import {BsFillPersonFill} from "react-icons/bs";
import {FaArchive} from "react-icons/fa";
const BreadcrumbsOfficials = () => {
  return (
    <nav className="flex ">
    <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
      <li className="flex items-center">
        <BsFillPersonFill className="mr-2 text-gray-900" />
        <a
          href="/announcements"
          className="text-gray-900 font-bold hover:underline uppercase"
        >
          Barangay Officials
        </a>
      </li>
      <li>
        <span>/</span>
      </li>
      <li className="flex items-center font-bold text-teal-600 uppercase">
        <FaArchive className="mr-2" />
        Archived Barangay Officials
      </li>
    </ol>
  </nav>
  );
};

export default BreadcrumbsOfficials;
