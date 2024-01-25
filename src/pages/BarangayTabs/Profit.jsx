import React from "react";

function Profit() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-auto max-h-[660px]">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className=" overflow-x-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 border">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Type of Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Accomplished Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Claimed Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Profit
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <tr className="hover-bg-gray-50 border">
                        <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              2
                            </span>
                          </div>
                        </td>
                        <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                            2
                            </span>
                          </div>
                        </td>
                        <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              2
                            </span>
                          </div>
                        </td>
                        <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              2
                            </span>
                          </div>
                        </td>
                        <td className="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              PHP 5000
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profit;
