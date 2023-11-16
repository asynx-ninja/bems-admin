import React, { useEffect, useState, useRef } from "react";
import defaultPFP from "../assets/sample/official.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaCamera,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import banner from "../assets/sample/official.jpg";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fileInputRef = useRef();
  const handleAdd = (e) => {
    e.preventDefault();

    fileInputRef.current.click();
  };
  const [activeButton, setActiveButton] = useState({
    personal: true,
    credential: false,
  });
  const [editButton, setEditButton] = useState(true);
  const [pfp, setPfp] = useState();
  const [userAddress, setUserAddress] = useState({
    street: "",
    brgy: "",
    city: "",
  });
  const [userData, setUserData] = useState({});
  const [userCred, setUserCred] = useState({
    username: "",
    oldPass: "",
    newPass: "",
  });
  const [message, setMessage] = useState({
    display: false,
    success: false,
    error: false,
    message: "",
  });
  const [newpasswordShown, setNewPasswordShown] = useState(false);
  const [oldpasswordShown, setOldPasswordShown] = useState(false);
  const toggleOldPassword = (e) => {
    setOldPasswordShown(!oldpasswordShown);
  };
  const toggleNewPassword = (e) => {
    setNewPasswordShown(!newpasswordShown);
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    setPfp(e.target.files[0]);

    var output = document.getElementById("pfp");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_LINK}/users/specific/${id}`);
        if (res.status === 200) {
          setUserData(res.data[0]);
          setUserAddress({
            street: res.data[0].address.street,
            brgy: res.data[0].address.brgy,
            city: res.data[0].address.city,
          });
          setUserCred({
            username: res.data[0].username,
            oldPass: "",
            newPass: "",
          });
          var pfpSrc = document.getElementById("pfp");
          pfpSrc.src =
            res.data[0].profile.link !== ""
              ? res.data[0].profile.link
              : defaultPFP;
        } else {
          setError("Invalid username or password");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    document.title = "Settings | Barangay E-Services Management";
  }, []);

  const handleUserDataChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleUserChangeAdd = (field, value) => {
    setUserAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserChangeCred = (field, value) => {
    setUserCred((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    const obj = {
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      suffix: userData.suffix,
      religion: userData.religion,
      email: userData.email,
      birthday: userData.birthday,
      age: userData.age,
      contact: userData.contact,
      sex: userData.sex,
      address: {
        street: userAddress.street,
        brgy: userAddress.brgy,
        city: userAddress.city,
      },
      occupation: userData.occupation,
      civil_status: userData.civil_status,
      type: userData.type,
      isVoter: userData.isVoter,
      isHead: userData.isHead,
      username: userData.username,
      profile: userData.profile,
    };

    try {
      console.log(pfp);
      var formData = new FormData();
      formData.append("users", JSON.stringify(obj));
      formData.append("file", pfp);
      const response = await axios.patch(`${API_LINK}/users/${id}`, formData);

      // CHANGE USER CREDENTIALS

      // CHANGE USERNAME
      if (userCred.username !== userData.username) {
        changeCredentials(
          userData.username,
          userCred.username,
          userCred.oldPass,
          userCred.newPass
        );
      }

      // CHANGE PASSWORD
      if (userCred.newPass !== "") {
        changeCredentials(
          userData.username,
          userCred.username,
          userCred.oldPass,
          userCred.newPass
        );
      }

      if (response.status === 200) {
        console.log("Update successful:", response.data);
        setUserData(response.data);
        setUserAddress({
          street: response.data.address.street,
          brgy: response.data.address.brgy,
          city: response.data.address.city,
        });
        setEditButton(true);
      } else {
        console.error("Update failed. Status:", response.status);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const changeCredentials = async (
    oldUsername,
    newUsername,
    oldPassword,
    newPassword
  ) => {
    const user = {
      username: newUsername !== oldUsername ? newUsername : oldUsername,
      password: newPassword !== "" ? newPassword : oldPassword,
    };

    console.log(user);

    try {
      const response = await axios.get(
        `${API_LINK}/auth/${oldUsername}/${oldPassword}/${userData.type}`
      );

      console.log(response);

      if (response.status === 200) {
        await axios.patch(`${API_LINK}/auth/${id}`, user);
        setMessage({
          display: true,
          success: true,
          error: false,
          message: "Success!",
        });
      }
    } catch (err) {
      setMessage({
        display: true,
        success: false,
        error: true,
        message: "The password you entered is incorrect",
      });
    }
  };

  const birthdayFormat = (date) => {
    const birthdate = date === undefined ? "" : date.substr(0, 10);
    return birthdate;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleOnActive = (e) => {
    if (e.target.name === "personal") {
      setActiveButton({
        personal: true,
        credential: false,
      });
    } else {
      setActiveButton({
        personal: false,
        credential: true,
      });
    }
  };

  const handleOnEdit = (e) => {
    if (e.target.name === "edit") {
      setEditButton(false);
    } else {
      setEditButton(true);
    }
  };
  const [showSocials, setShowSocials] = useState(false);
  console.log(userData);

  return (
    <div className="mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:mr-6 lg:h-full border rounded-lg bg-white shadow-lg">
      <div className="flex flex-col w-full ">
        <div className="relative w-full">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
            <img
              className="h-[230px] w-full object-cover"
              src={banner}
              alt=""
            />
          </div>
          <div className="absolute md:top-[56%] lg:top-[55%] transform -translate-y-1/2 flex justify-center w-full">
            <div className="flex flex-col items-center">
              <div className="relative lg:w-40 lg:h-40 sm:w-32 md:w-36">
                <label
                  htmlFor="file_input"
                  onClick={handleAdd}
                  className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity hover:bg-[#295141] hover:bg-opacity-60 "
                >
                  <FaCamera size={32} style={{ color: "#ffffff" }} />
                </label>
                <input
                  disabled={editButton}
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept="image/*"
                  multiple="multiple"
                  className="hidden"
                />
                <img
                  // id="pfp"
                  src={defaultPFP}
                  className="w-full h-full rounded-full object-cover border-[5px] border-[#013D74] "
                />
              </div>
              <h6 className="font-bold mt-2 lg:text-normal">
                {/* {userData.firstName} {userData.lastName} */}
                DR. KENSHI TAKAHASHI
              </h6>

              <p className="text-sm lg:text-[14px] py-2 leading-[10px]">@dwaynesenpai</p>
            </div>
          </div>
          <div className="flex flex-col bg-white text-black justify-center items-center mx-auto rounded-md sm:mt-28 lg:p-4 mt-28 lg:w-11/12 text-center">
            <div className="border-b-[2px] w-full mb-2 border-b-gray-200">
              <h6 className="font-bold mb-2 uppercase text-normal sm:text-sm">
                Socials
              </h6>
            </div>
            <div className="lg:flex sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center items-center mx-auto ">
              <div className="flex justify-center">
                <FaFacebook className="text-sm sm:text-lg" />
                <p className="text-xs ml-2 lg:text-sm">francisco.pogi</p>
              </div>
              <div className="flex justify-center">
                <FaTwitter className="text-sm sm:text-lg" />
                <p className="text-xs ml-2 lg:text-sm">@francisco_pogi</p>
              </div>
              <div className="flex justify-center">
                <FaInstagram className="text-sm sm:text-lg" />
                <p className="text-xs ml-2 lg:text-sm">francisco.pogi</p>
              </div>
              <div className="flex justify-center">
                <FaEnvelope className="text-sm sm:text-lg" />
                <p className="text-xs ml-2 lg:text-sm">francisco.pogi</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col-reverse lg:flex-row-reverse sm:px-[5px] px-[20px] justify-center mb-[20px] ">
          <div className="flex flex-col sm:w-full lg:w-11/12 mx-auto overflow-y-auto">
            <div className="flex gap-[10px] my-5 pb-[10px] border-b-[2px] border-b-gray-200 px-[10px]">
              <button
                name="personal"
                onClick={handleOnActive}
                className={
                  activeButton.personal
                    ? "sm:text-[14px] md:text-[15px] h-[50px] px-[10px] rounded-md bg-[#013D74] text-white font-medium"
                    : "sm:text-[14px] md:text-[15px] h-[50px] px-[10px] rounded-md bg-white text-black font-medium hover:bg-[#013D74] hover:text-white"
                }
              >
                Personal Info
              </button>
              <button
                name="credential"
                onClick={handleOnActive}
                className={
                  activeButton.credential
                    ? "sm:text-[14px] md:text-[15px] h-[50px] px-[10px] rounded-md bg-[#013D74] text-white font-medium"
                    : "sm:text-[14px] md:text-[15px] h-[50px] px-[10px] rounded-md bg-white text-black font-medium hover:bg-[#013D74] hover:text-white"
                }
              >
                Account Info
              </button>
            </div>

            {activeButton.personal ? (
              <div className=" ">
                <div className="h-full lg:w-full shadow-lg  mx-auto w-11/12 sm:shadow-none  pb-[30px]">
                  {/* PERSONAL DATA */}

                  <div>
                    <div className="w-full border-b-[2px]  border-black mb-5">
                      <h6 className="font-bold">PERSONAL DATA</h6>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          First name
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="First name"
                          aria-describedby="hs-input-helper-text"
                          value={userData.firstName || ""}
                          onChange={(e) =>
                            handleUserDataChange("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Middle name
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="Middle name"
                          aria-describedby="hs-input-helper-text"
                          value={userData.middleName || ""}
                          onChange={(e) =>
                            handleUserDataChange("middleName", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Last name
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="Last name"
                          aria-describedby="hs-input-helper-text"
                          value={userData.lastName || ""}
                          onChange={(e) =>
                            handleUserDataChange("lastName", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Suffix
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="Suffix"
                          aria-describedby="hs-input-helper-text"
                          value={userData.suffix || ""}
                          onChange={(e) =>
                            handleUserDataChange("suffix", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gender"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Gender
                        </label>
                        <select
                          disabled={editButton}
                          id="gender"
                          name="gender"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          value={userData.sex || ""}
                          onChange={(e) =>
                            handleUserDataChange("sex", e.target.value)
                          }
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Birthday
                        </label>
                        <input
                          type="date"
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="Birthday"
                          aria-describedby="hs-input-helper-text"
                          value={birthdayFormat(userData.birthday) || ""}
                          onChange={(e) =>
                            handleUserDataChange("birthday", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Age
                        </label>
                        <input
                          disabled={editButton}
                          readOnly
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="Suffix"
                          aria-describedby="hs-input-helper-text"
                          value={calculateAge(userData.birthday) || ""}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Phone number
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="sm:py-2 sm:px-3 lg:py-3 lg:px-4 block w-full border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="#"
                          aria-describedby="hs-input-helper-text"
                          value={userData.contact || ""}
                          onChange={(e) =>
                            handleUserDataChange("contact", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          disabled={editButton}
                          type="email"
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="you@example.com"
                          aria-describedby="hs-input-helper-text"
                          value={userData.email || ""}
                          onChange={(e) =>
                            handleUserDataChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* ADDRESS DETAILS */}

                  <div>
                    <div className="w-full border-b-[2px] border-black my-5">
                      <h6 className="font-bold">ADDRESS DETAILS</h6>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Street
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          placeholder="Street"
                          aria-describedby="hs-input-helper-text"
                          value={userAddress.street || ""}
                          onChange={(e) =>
                            handleUserChangeAdd("street", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="brgy"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Barangay
                        </label>
                        <select
                          disabled={editButton}
                          id="brgy"
                          name="brgy"
                          value={userAddress.brgy || ""}
                          onChange={(e) =>
                            handleUserChangeAdd("brgy", e.target.value)
                          }
                          className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white dark:border-gray-700"
                        >
                          <option selected>{userAddress.brgy}</option>
                          <option>Balite</option>
                          <option>Burgos</option>
                          <option>Geronimo</option>
                          <option>Macabud</option>
                          <option>Manggahan</option>
                          <option>Mascap</option>
                          <option>Puray</option>
                          <option>Rosario</option>
                          <option>San Isidro</option>
                          <option>San Jose</option>
                          <option>San Rafael</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          City
                        </label>
                        <select
                          id="city"
                          name="city"
                          disabled={editButton}
                          readOnly
                          value={userAddress.city || ""}
                          onChange={(e) =>
                            handleUserChangeAdd("city", e.target.value)
                          }
                          className="py-3 px-4 block w-full text-black border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white dark:border-gray-700"
                        >
                          <option selected>Montalban</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* OTHER PERSONAL DATA */}

                  <div>
                    <div className="w-full border-b-[2px] border-black my-5">
                      <h6 className="font-bold">OTHER PERSONAL DATA</h6>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                      <div>
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block sm:text-xs lg:text-sm font-medium mb-2"
                        >
                          Occupation
                        </label>
                        <input
                          disabled={editButton}
                          id="input-label-with-helper-text"
                          className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                          aria-describedby="hs-input-helper-text"
                          value={userData.occupation || ""}
                          onChange={(e) =>
                            handleUserDataChange("occupation", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                          * Head of the Family?
                        </label>
                        <div className="flex items-center">
                          <input
                            disabled={editButton}
                            id="isHeadYes"
                            name="isHead"
                            type="radio"
                            value={1}
                            checked={userData.isHead}
                            onChange={(e) =>
                              handleUserDataChange("isHead", true)
                            }
                          />
                          <label htmlFor="male" className="ml-2">
                            Yes
                          </label>
                          <input
                            disabled={editButton}
                            id="isHeadNo"
                            name="isHead"
                            type="radio"
                            className="ml-4"
                            value={0}
                            checked={!userData.isHead}
                            onChange={(e) =>
                              handleUserDataChange("isHead", false)
                            }
                          />
                          <label className="ml-2">No</label>
                        </div>
                      </div>
                      <div>
                        <label className="block sm:text-xs lg:text-sm font-medium mb-2">
                          * Registered Voter
                        </label>
                        <div className="flex items-center">
                          <input
                            disabled={editButton}
                            id="isVoterYes"
                            name="isVoter"
                            type="radio"
                            value={1}
                            checked={userData.isVoter}
                            onChange={(e) =>
                              handleUserDataChange("isVoter", true)
                            }
                          />
                          <label htmlFor="male" className="ml-2">
                            Yes
                          </label>
                          <input
                            disabled={editButton}
                            className="ml-4"
                            id="isVoterNo"
                            name="isVoter"
                            type="radio"
                            value={0}
                            checked={!userData.isVoter}
                            onChange={(e) =>
                              handleUserDataChange("isVoter", false)
                            }
                          />
                          <label className="ml-2">No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="shadow-lg  pb-[30px]">
                <div className="flex flex-col w-[80%] justify-center mx-auto gap-4">
                  {message.display ? (
                    <div>
                      {message.success ? (
                        <div className="w-[100%] bg-green-400 rounded-md flex">
                          <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                            {message.message}
                          </p>
                        </div>
                      ) : null}
                      {message.error ? (
                        <div className="w-[100%] bg-red-500 rounded-md flex">
                          <p className="py-[10px] text-[12px] px-[20px] text-white font-medium">
                            {message.message}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="flex flex-col">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                      Username
                    </label>
                    <input
                      disabled={editButton}
                      id="input-label-with-helper-text"
                      className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                      placeholder="username"
                      aria-describedby="hs-input-helper-text"
                      value={userCred.username || ""}
                      onChange={(e) =>
                        handleUserChangeCred("username", e.target.value)
                      }
                    />
                  </div>
                  <div className="relative z-0">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                      Enter your old password
                    </label>
                    <input
                      type={oldpasswordShown ? "text" : "password"}
                      disabled={editButton}
                      id="input-label-with-helper-text"
                      className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                      placeholder="password"
                      aria-describedby="hs-input-helper-text"
                      onChange={(e) =>
                        handleUserChangeCred("oldPass", e.target.value)
                      }
                    />
                    <button
                      name="old"
                      type="button"
                      onClick={toggleOldPassword}
                      className="absolute right-2 sm:top-5 lg:top-7 p-2.5 mt-1 text-sm font-medium text-white"
                    >
                      {oldpasswordShown ? (
                        <AiOutlineEye style={{ color: "green" }} size={20} />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{ color: "green" }}
                          size={20}
                        />
                      )}
                    </button>
                  </div>
                  <div className="relative z-0">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block sm:text-xs lg:text-sm font-medium mb-2"
                    >
                      Enter your new password
                    </label>
                    <input
                      type={newpasswordShown ? "text" : "password"}
                      disabled={editButton}
                      readOnly={userCred.oldPass === ""}
                      id="input-label-with-helper-text"
                      className="w-full sm:py-2 sm:px-3 lg:py-3 lg:px-4 block border-2 border-solid border-[#C7D1DD] rounded-[12px] text-sm shadow-[0px_0px_12px_rgba(142,142,142,0.25)] focus:border-green-500 focus:ring-green-500"
                      placeholder="password"
                      aria-describedby="hs-input-helper-text"
                      onChange={(e) =>
                        handleUserChangeCred("newPass", e.target.value)
                      }
                    />
                    <button
                      name="new"
                      type="button"
                      onClick={toggleNewPassword}
                      className="absolute right-2 sm:top-5 lg:top-7 p-2.5 mt-1 text-sm font-medium text-white"
                    >
                      {newpasswordShown ? (
                        <AiOutlineEye style={{ color: "green" }} size={20} />
                      ) : (
                        <AiOutlineEyeInvisible
                          style={{ color: "green" }}
                          size={20}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-[20px] flex justify-center items-center gap-5">
        {editButton ? (
          <button
            name="edit"
            onClick={handleOnEdit}
            className="bg-custom-green-button text-white font-medium px-[20px] py-[5px] rounded-md"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-5">
            <button
              name="save"
              onClick={saveChanges}
              className="bg-custom-green-button text-white font-medium px-[20px] py-[5px] rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleOnEdit}
              name="cancel"
              className="bg-custom-red-button text-white font-medium px-[20px] py-[5px] rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
