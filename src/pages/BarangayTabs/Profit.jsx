import React from "react";

function Profit() {
  return (
    <div>
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-auto max-h-[660px]">
          <div className="flex flex-col-reverse lg:flex-row">
            {/* Table Title */}
          {/*<div className="bg-[#013D74] py-2 lg:py-5 xl:py-3.5 px-5 md:px-10 lg:px-3 xl:px-10 rounded-tr-lg w-full lg:w-3/5 xxl:h-[4rem] xxxl:h-[5rem]">
              <h1
                className="text-center sm:text-[15px] text-xl mx-auto font-heavy md:text-xl lg:text-3xl xl:text-3xl xl:pt-1 xxl:text-3xl xxl:pt-0 xxxl:text-4xl xxxl:mt-1 text-white"
                style={{ letterSpacing: "0.2em" }}
              >
                PROFITS
              </h1>
            </div>*/}

            {/* Print*/}
            <div className="flex w-full lg:w-full justify-end py-3">
              <button
                type="button"
                class="py-[.688rem] mb-3 sm:w-full lg:w-auto lg:px-4 inline-flex justify-center items-center gap-2 rounded-md border font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
              >
                PRINT REPORT
              </button>
            </div>
          </div>

          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class=" overflow-x-hidden">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 border">
                  <tr>
                    <th
                      scope="col"
                      class="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Type of Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Accomplished Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Claimed Service
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-2 py-2 sm:px-6 sm:py-3 text-left border"
                    >
                      <span className="text-sm sm:text-md font-semibold uppercase tracking-wide text-black">
                        Profit
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 ">
                  {Array(20)
                    .fill("")
                    .map((_, index) => (
                      <tr className="hover-bg-gray-50 border">
                        <td class="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              SALSAL
                            </span>
                          </div>
                        </td>
                        <td class="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              SALSAL
                            </span>
                          </div>
                        </td>
                        <td class="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              SALSAL
                            </span>
                          </div>
                        </td>
                        <td class="w-[20%] sm:w-1/5 whitespace-nowrap border">
                          <div className="px-2 sm:px-6 py-2">
                            <span className="text-xs sm:text-lg text-black">
                              SALSAL
                            </span>
                          </div>
                        </td>
                        <td class="w-[20%] sm:w-1/5 whitespace-nowrap border">
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
