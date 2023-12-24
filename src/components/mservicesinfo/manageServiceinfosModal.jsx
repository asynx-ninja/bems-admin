import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";
import { CiImageOn } from "react-icons/ci";

function ManageServicesInfo({ brgy, servicesinfos, setServicesInfos }) {
  const [icon, setIcon] = useState();
  const [edit, setEdit] = useState(false);
  const editIconRef = useRef(null);

 
  const handleChange = (e) => {
    if (e.target.name === "icon") {
      
      const file = e.target.files[0];
      setIcon(file);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        editIconRef.current.src=reader.result;
      });
      reader.readAsDataURL(e.target.files[0]);

    } else {
      setServicesInfos((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", icon);
    console.log([...formData]);
    formData.append("servicesinfo", JSON.stringify(servicesinfos));
    try {
      const result = await axios.patch(
        `${API_LINK}/services_info/manage/?doc_id=${servicesinfos._id}`,
        formData
      );
      if (result.status === 200) {
        // Handle successful update
        console.log("Update successful");

        setTimeout(() => {
          HSOverlay.close(document.getElementById("hs-modal-manageaboutus"));
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnEdit = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div
        id="hs-modal-manageserviceinfo"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            {/* Header */}
            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141]  overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                EDIT HOMEPAGE ABOUT US
              </h3>
            </div>

            <div className="flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]">
              <div className="flex mb-4 w-full flex-col md:flex-row sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0">
                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Icon
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full border border-gray-300">
                      <img
                        className="w-[200px] md:w-[250px] mx-auto lg:w-full md:h-[140px] lg:h-[250px] object-cover"
                        ref={editIconRef}
                        src={servicesinfos.length === 0 ? "" : servicesinfos.icon.link}
                        alt="Current profile photo"
                      />
                    </div>
                    <label className="w-full bg-white border border-gray-300">
                      <span className="sr-only">Choose icon photo</span>
                      <input
                        type="file"
                        disabled={!edit}
                        onChange={handleChange}
                        name="icon"
                        accept="image/*"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="titnamele"
                >
                  ARTICLE TITLE
                </label>
                <input
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  value={servicesinfos.name || ""}
                  disabled={!edit}
                  onChange={handleChange}
                  placeholder="Article name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm font-bold text-gray-700 "
                >
                  DETAILS
                </label>
                <textarea
                  id="details"
                  rows={4}
                  name="details"
                  value={servicesinfos.details || ""}
                  disabled={!edit}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline "
                  placeholder="Enter article details..."
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              {!edit ? (
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-[#295141] text-white shadow-sm"
                    onClick={handleOnEdit}
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6  gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                    data-hs-overlay="#hs-modal-manageserviceinfo"
                  >
                    CLOSE
                  </button>
                </div>
              ) : (
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-[#295141] text-white shadow-sm"
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                    onClick={handleOnEdit}
                  >
                    CANCEL
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageServicesInfo;
