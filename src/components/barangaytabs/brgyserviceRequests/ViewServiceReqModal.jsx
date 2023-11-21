import React from "react";
import bgmodal from "../../../assets/modals/bg-modal2.png";
import { AiOutlineSend } from "react-icons/ai";

function ViewServiceReqModal({ onClose }) {
  return (
    <div>
     <div
        id="hs-view-request-modal"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-full">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto">
            {/* Header */}
            <div className="rounded-t-2xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#396288] to-[#013D74] ">
            <div style={{ backgroundImage: `url(${bgmodal})` }} className="py-5 px-3 flex justify-between items-center overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                REQUESTED SERVICE
              </h3>
            </div>
            </div>
            {/* Modal Details */}
            <div className="flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-screen">
              <div className="flex flex-col">
                <div className="flex flex-col-reverse lg:flex-row mb-1 pb-5 items-center justify-center">
                  {/* Service Description */}
                  <div class="relative lg:mt-4 p-5 lg:p-3 lg:ml-2 pb-6 overflow-y-auto flex flex-col w-full lg:w-2/3 h-full rounded-lg ">
                    <h1
                      class="font-medium mb-1 text-black text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      DETAILS
                    </h1>
                    <textarea
                      id="message"
                      rows="5"
                      class="block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-100 resize-none overflow-y-auto"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. "
                      readOnly
                    ></textarea>

                    <h1
                      class="font-medium mb-1 my-2 text-black text-sm"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      REASON
                    </h1>
                    <textarea
                      id="message"
                      rows="5"
                      class="block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-100 resize-none "
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse."
                      readOnly
                    ></textarea>
                  </div>

                  {/* Request Information */}
                  <div class="relative mt-4 mr-6 ml-3 p-5 pb-6 lg:py-3 xl:py-3 xxxl:py-8 overflow-y-auto flex flex-col lg:w-1/3 h-full bg-zinc-100 rounded-lg">
                    <h1
                      class="font-medium mb-1 text-black text-xs"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      NAME OF SERVICE
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                      readOnly
                    />
                    <h1
                      class="font-medium mb-1 mt-3 text-black text-xs"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      TYPE OF SERVICE
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                      readOnly
                    />
                     <h1
                      className="font-medium mb-1 mt-5 text-black text-xs"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      TRANSACTION FEE
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                      readOnly
                    />
                    <h1
                      class="font-medium mb-1 mt-3 text-black text-xs"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      REFERENCE NUMBER
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                      readOnly
                    />
                    <h1
                      class="font-medium mb-1 mt-3 text-black text-xs"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      DATE POSTED
                    </h1>
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block w-full p-1 text-sm text-black bg-gray-200 rounded-lg"
                      placeholder=""
                      readOnly
                    />
                  </div>
                </div>
                <div className="m-full px-5 py-2">
                <form>
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full">
                      <div className="mb-4 ">
                        <label
                          for="civilStatus"
                          className="block text-sm font-medium text-black"
                        >
                          STATUS OF SERVICES
                        </label>
                        <select
                          id="civilStatus"
                          disabled
                          name="status"
                          className="w-full mt-3 p-2 border font-light border-gray-300 rounded"
                        >
                          <option value="Approved">Approved</option>
                          <option value="Disapproved">Disapproved</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
                {/* Response */}
                <div className="w-full px-5">
                  <h1
                    class="font-medium mb-1 my-2 text-black text-sm"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    RESPONSE
                  </h1>
                  <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full h-40 text-sm text-gray-900 rounded-lg bg-gray-100 resize-none"
                    placeholder="Enter response..."
                    readOnly
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center uppercase items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-view-request-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewServiceReqModal;
