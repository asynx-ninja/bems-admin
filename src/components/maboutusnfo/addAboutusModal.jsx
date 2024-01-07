import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";
import { CiImageOn } from "react-icons/ci";

function AddAboutus({ brgy }) {
  const [isLoading, setIsLoading] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [aboutus, setAboutus] = useState({
    brgy: brgy,
    title: "",
    details: "",
  });

  const [banner, setBanner] = useState();

  const navigate = useNavigate();

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);

    var output = document.getElementById("banner");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const handleChange = (e) => {
    setAboutus((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    // Clear any existing timer
    clearTimeout(timerId);
    try {
      e.preventDefault();

      var formData = new FormData();

      formData.append("file", banner);

      const obj = {
        brgy: aboutus.brgy,
        title: aboutus.title,
        details: aboutus.details,
      };

      formData.append("aboutusinfo", JSON.stringify(obj));

      const result = await axios.post(`${API_LINK}/aboutus`, formData);

      if (result.status === 200) {
        setAboutus({
          brgy: "",
          title: "",
          details: "",
        });
        setBanner();
        setTimerId(
          setTimeout(() => {
            setIsLoading(false);
            HSOverlay.close(document.getElementById("hs-modal-addaboutus"));
            window.location.reload();
          }, 1000)
        );
      }
    } catch (err) {
      console.log(err);
    } 
  };

  return (
    <div>
      <div
        id="hs-modal-addaboutus"
        className="hs-overlay hidden fixed top-0 left-0 z-[80] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center "
      >
        {isLoading && (
          <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
            <div className="loaders">
              <div className="loader"></div>
              <div className="loader"></div>
              <div className="loader"></div>
            </div>
          </div>
        )}

        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            {/* Header */}
            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#408D51] to-[#295141]  overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                ADD HOMEPAGE ABOUT US
              </h3>
            </div>

            <div className="flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]">
              <div className="flex mb-4 w-full flex-col md:flex-row sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0">
                <div className="w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Banner
                  </label>
                  <div className="flex flex-col items-center space-y-2 relative">
                    <div className="w-full border border-gray-300">
                      <img
                        className={`${
                          banner ? "" : "hidden"
                        } w-[200px] md:w-[250px]  lg:w-full md:h-[140px] lg:h-[250px] object-cover`}
                        id="banner"
                        alt="Current profile photo"
                      />{" "}
                      <CiImageOn
                        size={250}
                        className={`${!banner ? "" : "hidden"} mx-auto`}
                      />
                    </div>
                    <label className="w-full bg-white border border-gray-300">
                      <span className="sr-only">Choose banner photo</span>
                      <input
                        type="file"
                        onChange={handleBannerChange}
                        name="banner"
                        accept="image/*"
                        value={!banner ? "" : banner.originalname}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  ARTICLE TITLE
                </label>
                <input
                  id="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  name="title"
                  type="text"
                  value={aboutus.title}
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
                  value={aboutus.details}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-700  rounded-lg border border-gray-300 focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline "
                  placeholder="Enter article details..."
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                <button
                  type="submit"
                  className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-[#295141] text-white shadow-sm"
                  onClick={handleSubmit}
                >
                  CREATE
                </button>
                <button
                  type="button"
                  className="h-[2.5rem] w-full py-1 px-6  gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                  data-hs-overlay="#hs-modal-addaboutus"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAboutus;
