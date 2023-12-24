import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";
import { CiImageOn } from "react-icons/ci";

function AddTouristSpot({ brgy }) {
  const [touristSpot, settouristSpot] = useState({
    brgy: brgy,
    name: "",
    details: "",
  });

  const [images, setImages] = useState([]);

  const handleBannerChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevBanners) => [...prevBanners, ...files]);
  };

  const handleChange = (e) => {
    settouristSpot((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
  
      images.forEach((image, index) => {
        formData.append(`files`, image);
      });
  
      // Append the touristSpot data to the formData
      formData.append("touristspot", JSON.stringify(touristSpot));
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      const result = await axios.post(`${API_LINK}/tourist_spot`, formData, config);
  
      if (result.status === 200) {
        settouristSpot({ brgy: "", name: "", details: "" });
        setImages([]);
        window.location.reload();
      }
    } catch (err) {
      console.error(err); // Log the full error for debugging
      // Handle the error or log it for debugging
    }
  };

  return (
    <div>
      <div
        id="hs-modal-addtouristspot"
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
                ADD TOURIST SPOT
              </h3>
            </div>

            <div className="flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]">
              <div className="flex mb-4 w-full flex-col md:flex-row sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="images"
                  >
                    Banner
                  </label>
                  <input
                    type="file"
                    onChange={handleBannerChange}
                    name="images"
                    accept="image/*"
                    multiple
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                </div>
                <div className="flex flex-wrap">
                  {images.map((image, index) => (
                    <div key={index} className="w-1/4 p-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  ARTICLE TITLE
                </label>
                <input
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  value={touristSpot.name}
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
                  value={touristSpot.details}
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
                  data-hs-overlay="#hs-modal-addtouristspot"
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

export default AddTouristSpot;
