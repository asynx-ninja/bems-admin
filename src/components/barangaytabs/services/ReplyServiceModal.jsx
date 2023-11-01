import React from "react";
import { useState } from "react";
import bgmodal from "../../../assets/modals/bg-modal2.png";
import { AiOutlineSend } from "react-icons/ai";

function RevisionServiceModal({ onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFiles(fileNames);
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]); // Clear the selected files
  };

  return (
    <div>
      <button
        type="button"
        className="text-white bg-custom-red-button font-medium text-xs sm:text-sm p-1 sm:p-2 lg:px-10 lg:py-30 inline-flex items-center"
        data-hs-overlay="#hs-tab-revision-modal"
      >
        <AiOutlineSend
          size={24} // You can adjust the size as needed
          style={{ color: "#ffffff" }}
        />
      </button>

      <div
        id="hs-tab-revision-modal"
        class="hs-overlay hidden fixed top-0 left-0 z-[60] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        {/* Modal */}
        <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 md:px-0 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div class="flex flex-col w-full lg:w-[700px] xl:w-[800px] bg-white shadow-sm overflow-y-auto lg:ml-11 xl:ml-0 ">
            {/* Header */}
            <div class="bg-[#013D74] overflow-hidden">
              <div
                class="flex justify-between items-center p-5 w-full h-full bg-cover bg-no-repeat transform"
                style={{ backgroundImage: `url(${bgmodal})` }}
              >
                <h3
                  class="font-base text-white mx-auto text-xs md:text-lg lg:text-xl"
                  style={{ letterSpacing: "0.3em" }}
                >
                  REVIEW SERVICE
                </h3>
              </div>
            </div>

            {/* Modal Details */}
            <div>
              <div className="flex flex-col">
                <div className="flex flex-col-reverse lg:flex-row border mb-1 pb-5">
                  {/* Service Description */}
                  <div class="relative lg:mt-2 p-5 lg:p-3 lg:ml-2 pb-6 overflow-y-auto flex flex-col w-full lg:w-2/3 h-full rounded-lg">
                    <div className="">
                      <div className="relative w-full">
                        <h1
                          className="font-base text-white text-md absolute top-0 left-0 pl-2 pt-1"
                          style={{ letterSpacing: "0.3em" }}
                        >
                          BANNER
                        </h1>
                      </div>
                      <div>
                        <img
                          src="./public/imgs/bg-header.png"
                          alt=""
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>

                    <h1
                      class="font-medium mb-1 text-black text-sm mt-2"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      DETAILS
                    </h1>
                    <textarea
                      id="message"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-100 resize-none overflow-y-auto"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. "
                      readOnly
                    ></textarea>
                  </div>

                  {/* Request Information */}
                  <div class="relative mt-4 mr-6 ml-3 p-5 pb-6 lg:py-3 xl:py-3 xxxl:py-10 overflow-y-auto flex flex-col lg:w-1/3 h-full bg-zinc-100 rounded-lg">
                    <h1
                      class="font-medium mb-1 text-black text-sm"
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
                      class="font-medium mb-1 mt-5 text-black text-sm"
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
                      class="font-medium mb-1 mt-5 text-black text-sm"
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
                      class="font-medium mb-1 mt-5 text-black text-sm"
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
                  ></textarea>

                  <div className="flex flex-col items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-5"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, PDF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                      />
                    </label>
                    <div className="mt-2 overflow-x-auto w-full">
                      <p>Selected Files:</p>
                      {selectedFiles.length > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedFiles.map((file, index) => (
                            <span key={index} className="truncate pr-1">
                              {file.replace(/\.[^.]+$/, "")}&hellip;
                              {file.split(".").pop()},
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div class="flex justify-end items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md borde text-sm font-base bg-custom-green-button3 text-white shadow-sm align-middle"
                data-hs-overlay="#hs-tab-revision-modal"
              >
                SEND
              </button>
              <button
                type="button"
                class="py-1 px-6 inline-flex justify-center items-center gap-2 rounded-md border text-sm font-base bg-custom-red-button text-white shadow-sm align-middle"
                data-hs-overlay="#hs-tab-revision-modal"
                onClick={clearSelectedFiles} // Add onClick event handler
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevisionServiceModal;
