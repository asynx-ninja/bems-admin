import React from "react";
import { GrFormNext } from "react-icons/gr";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const Breadcrumbs = ({ id }) => {
  return (
    <nav className="flex ">
    <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
      <BiMessageSquareDetail size={22} />
      <li>
        <a
          href={`/events_registration/?id=${id}`}
          className="text-gray-600 font-bold hover:underline text-xs md:text-lg"
        >
            EVENTS APPLICATION
        </a>
      </li>
      <li>
        <GrFormNext size={24} style={{ color: "#ffffff" }} />
      </li>
      <li className="text-[10px] md:text-lg text-[#295141] font-bold">
        ARCHIVED APPLICATIONS
      </li>
    </ol>
  </nav>
  );
};

export default Breadcrumbs;