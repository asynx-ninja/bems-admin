import React from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { GrFormNext } from "react-icons/gr";
const Breadcrumb = ({ id }) => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500">
        <TfiAnnouncement size={22} />
        <li>
          <a
            href={`/tourist_spot/?id=${id}`}
            className="text-gray-600 font-bold hover:underline text-xs md:text-lg"
          >
            MUNICPAL INFO
          </a>
        </li>
        <li>
          <GrFormNext size={24} style={{ color: "#ffffff" }} />
        </li>
        <li className="text-[10px] md:text-lg text-[#295141] font-bold">
          ARCHIVED TOURIST SPOT
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
