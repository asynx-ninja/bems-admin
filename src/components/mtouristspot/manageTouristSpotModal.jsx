import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditDropbox from "./EditDropbox";
import API_LINK from "../../config/API";

function ManageTouristSpotModal({ touristspotInfo, settouristspotInfo }) {
  const [images, setImages] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setImages(touristspotInfo.image || []);
  }, [touristspotInfo]);

  const handleOnEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    settouristspotInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const editImageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        editImageRef.current.src=reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);

    setImages([...images, ...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      images.forEach((image) => {
        if (image instanceof File) {
          formData.append("files", image);
        } else {
          formData.append("saved", JSON.stringify(image));
        }
      });

      formData.append("touristspot", JSON.stringify(touristspotInfo));

      const result = await axios.patch(
        `${API_LINK}/tourist_spot/${touristspotInfo._id}`,
        formData
      );

      if (result.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div
        id="hs-modal-managetourist"
        className="hs-overlay hidden fixed top-0 left-0 z-[70] w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center"
      >
        {/* Modal */}
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 px-3 py-5 md:px-5 opacity-0 transition-all w-full h-auto">
          <div className="flex flex-col bg-white shadow-sm rounded-t-3xl rounded-b-3xl w-full h-full md:max-w-xl lg:max-w-2xl xxl:max-w-3xl mx-auto max-h-screen">
            {/* Header */}
            <div className="py-5 px-3 flex justify-between items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#3e5fc2] to-[#1f2f5e] overflow-hidden rounded-t-2xl">
              <h3
                className="font-bold text-white mx-auto md:text-xl text-center"
                style={{ letterSpacing: "0.3em" }}
              >
                MANAGE TOURIST SPOT
              </h3>
            </div>

            <div className="scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb flex flex-col mx-auto w-full py-5 px-5 overflow-y-auto relative h-[470px]">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Service Name
                </label>
                <input
                  id="name"
                  className="shadow appearance-none border w-full py-2 px-3 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  value={touristspotInfo && touristspotInfo.name}
                  onChange={handleChange}
                  disabled={!edit}
                  placeholder="Service Name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-bold text-gray-700 "
                >
                  Details
                </label>
                <textarea
                  id="message"
                  rows={8}
                  name="details"
                  value={touristspotInfo && touristspotInfo.details}
                  onChange={handleChange}
                  disabled={!edit}
                  className="shadow appearance-none border w-full p-2.5 text-sm text-black rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:shadow-outline"
                  placeholder="Enter service details..."
                />
              </div>

              <EditDropbox
                edit={edit}
                editImageRef={editImageRef}
                images={touristspotInfo && images}
                setImages={setImages}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-x-2 py-3 px-6 dark:border-gray-700">
              {!edit ? (
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
                    onClick={handleOnEdit}
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-pink-800 text-white shadow-sm"
                    data-hs-overlay="#hs-modal-managetourist"
                  >
                    CLOSE
                  </button>
                </div>
              ) : (
                <div className="sm:space-x-0 md:space-x-2 sm:space-y-2 md:space-y-0 w-full flex sm:flex-col md:flex-row">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="h-[2.5rem] w-full py-1 px-6 gap-2 rounded-md borde text-sm font-base bg-teal-900 text-white shadow-sm"
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

export default ManageTouristSpotModal;
