import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/header/montalban-logo.png";
import { useSearchParams, useParams } from "react-router-dom";
function BarangayMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  // const { id } = useParams();
  console.log("ssdsds", id);
  useEffect(() => {
    document.title = "Barangay Menu | Barangay E-Services Management";
  }, []);
  const barangayLinks = [
    "Balite",
    "Burgos",
    "Geronimo",
    "Macabud",
    "Manggahan",
    "Mascap",
    "Puray",
    "Rosario",
    "San Isidro",
    "San Jose",
    "San Rafael",
  ];
  return (
    <div className=" mx-4 my-5 md:mx-5 md:my-6 lg:ml-[19rem] lg:mt-8 lg:px-4  lg:h-[31rem] ">
      <div className="py-2 text-center font-bold text-3xl">
        <h1>BARANGAY MANAGEMENT</h1>
      </div>
      <div className="overflow-y-auto lg:h-[27.7rem] grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 lg:w-full gap-4 sm:gap-6 p-6">
        {barangayLinks.map((barangay, index) => (
          <Link
            to={`/barangayinformation/?id=${id}&brgy=${barangay}`}
            className="h-[12rem] bg-[#013D74] shadow-lg rounded-2xl flex justify-center items-center text-white font-bold text-lg flex-col hover:bg-[#0a4e8d] transition duration-300"
            key={index}
          >
            <img src={Logo} alt="" className="h-[8rem]" />
            <h1 className="mt-1 px-4 text-md md:text-sm xl:text-lg">
              Barangay {barangay}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BarangayMenu;
