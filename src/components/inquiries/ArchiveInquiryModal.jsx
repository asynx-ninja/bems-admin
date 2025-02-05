import React from "react";
import Error from "../../assets/modals/Error.png";
import axios from "axios";
import API_LINK from "../../config/API";
import { useState } from "react";
import StatusLoader from "./loaders/ArchiveLoader";
import { IoArchiveOutline } from "react-icons/io5";
function ArchiveInquiryModal({ selectedItems }) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [error, setError] = useState(null);
  const handleSave = async (e) => {
    try {
      e.preventDefault();
      if (selectedItems.length === 0) {
        setUpdatingStatus("error");
        setError("Unable to archive, Please select first to archive.");
        setTimeout(() => {
          setUpdatingStatus(null);
          HSOverlay.close(document.getElementById("hs-modal-archiveInquiry"));
        }, 3000);

        console.log("error", selectedItems);
        return;
      }
      setSubmitClicked(true);
      for (let i = 0; i < selectedItems.length; i++) {
        const response = await axios.patch(
          `${API_LINK}/inquiries/archived/${selectedItems[i]}/true`
        );
        if (response.status === 200) {
          setTimeout(() => {
            setSubmitClicked(false);
            setError(null);
            setUpdatingStatus("success");
            setTimeout(() => {
              setUpdatingStatus(null);
              HSOverlay.close(
                document.getElementById("hs-modal-archiveInquiry")
              );
              window.location.reload();
            }, 3000);
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div
        id="hs-modal-archiveInquiry"
        className="z-[80] hs-overlay hidden w-full h-full fixed top-0 left-0 overflow-x-hidden overflow-y-auto"
      >
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-300 bg-opacity-0">
          <div className="flex items-center justify-center min-h-screen pt-4 pb-20 ">
            <div className="w-10/12 lg:max-w-md p-6 bg-white rounded-lg shadow-xl ">
              <IoArchiveOutline size={40} className="mb-5 justify-start" />
              <h3 className="text-2xl font-bold mb-4">Are you sure?</h3>
              <p className="text-md mb-8">
                You are going to archive a specific/some of the information that
                will not be able to view in public
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  type="button"
                  data-hs-overlay="#hs-modal-archiveInquiry"
                  className="inline-flex items-center px-8 py-2 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none transition ease-in-out duration-150"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-8 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-red-500 focus:outline-none transition ease-in-out duration-150"
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {submitClicked && <StatusLoader updatingStatus="updating" />}
      {updatingStatus && (
        <StatusLoader updatingStatus={updatingStatus} error={error} />
      )}
    </div>
  );
}

export default ArchiveInquiryModal;
