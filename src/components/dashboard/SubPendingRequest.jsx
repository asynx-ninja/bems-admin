import React from "react";
import { AiFillEye } from "react-icons/ai";
import API_LINK from "../../config/API";
import axios from "axios";
import { useState, useEffect } from "react";
import {useSearchParams, Link} from "react-router-dom";
const SubPendingRequest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [servicesReq, setServicesreq] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get(
          `${API_LINK}/services/pendingservices/?archived=false&status=Pending`
        );
        setServicesreq(servicesResponse.data);
        console.log(servicesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full lg:w-full mt-4 flex flex-col h-auto ">
      <div className="flex flex-col max-h-screen">
        <b className="border-solid border-0 border-black border-b-2 pb-2 uppercase font-heavy text-lg md:text-xl mb-4 shrink-0">
          PENDING BARANGAY SERVICES 
        </b>
        <div className="overflow-y-auto h-auto">
          <table className="table-auto w-full ">
            <thead className="uppercase text-xs md:text-sm bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Barangay
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Name
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Service Type
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Requested Date
                </th>
                <th className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-center ">
              {servicesReq.map((item, idx) => (
                <tr key={idx} className="even:bg-gray-100">
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {item.brgy}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {item.name}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {item.type}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-1 md:px-5 md:py-2 lg:px-6 lg:py-3">
                    <Link to={`/barangaymenu/?id=${id}`}className="hs-tooltip">
                      <button className="hs-tooltip-toggle  rounded-xl bg-[#295141] text-white p-2 text">
                        <AiFillEye size={20} />
                        <span className="sm:block md:hidden sm:pl-5">
                        Go to barangay {item.brgy} service request
                    </span>
                        <span
                      className="sm:hidden md:block hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-20 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                      role="tooltip"
                    >
                      Go to barangay {item.brgy} service request
                    </span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubPendingRequest;
