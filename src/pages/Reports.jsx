import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import API_LINK from "../config/API";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker"; // Import the date picker component
import "react-datepicker/dist/react-datepicker.css";
import SRT from "../components/reports/SRT";
import RRM from "../components/reports/RRM";
import RRB from "../components/reports/RRB";
import RIB from "../components/reports/RIB";
import TRB from "../components/reports/TRB";
import moment from "moment";

const Reports = () => {
  const [services, setServices] = useState({});
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [archivedServices, setArchivedServices] = useState([]);
  const [archivedRequests, setArchivedRequests] = useState([]);
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const brgy = searchParams.get("brgy");
  const [isSpecificSelected, setIsSpecificSelected] = useState(false);
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [isWeeklySelected, setIsWeeklySelected] = useState(false);
  const [isMonthlySelected, setIsMonthlySelected] = useState(false);
  const [isAnnualSelected, setIsAnnualSelected] = useState(false);
  const [dateType, setDateType] = useState("specific");
  const [startDate, setStartDate] = useState("");
  const [specifiedDate, setSpecifiedDate] = useState(new Date());
  const [selected, setSelected] = useState("date");
  const [totalUsersSum, setTotalUsersSum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_LINK}/users/brgy_registered`);
        const data = response.data;
        console.log("ito", data);

        // Calculate the sum of totalUsers
        const sum = data.reduce((acc, item) => acc + item.totalUsers, 0);
        setTotalUsersSum(sum);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (err) {
        console.log(err);
      }
    };

    // fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [brgy]);

  const startOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday is the first day of the week
    return new Date(currentDate.setDate(diff));
  };

  // Function to get the end of the week
  const endOfWeek = (date) => {
    const currentDate = new Date(date);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() + (6 - day); // Adjust when Sunday is the first day of the week
    return new Date(currentDate.setDate(diff));
  };

  const startOfMonth = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  };

  // Function to get the end of the month
  const endOfMonth = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  };

  const startOfYear = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), 0, 1);
  };

  // Function to get the end of the year
  const endOfYear = (date) => {
    const currentDate = new Date(date);
    return new Date(currentDate.getFullYear(), 11, 31);
  };

  const handleTodayToggle = () => {
    setIsTodaySelected(false);
    setIsSpecificSelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
    setIsAnnualSelected(false);
    setIsTodaySelected(!isTodaySelected);
  };

  const handleSpecificToggle = () => {
    setIsSpecificSelected(true);
    setIsTodaySelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
    setIsAnnualSelected(false);
    setIsSpecificSelected(!isSpecificSelected);
  };

  const handleWeeklyToggle = () => {
    setIsSpecificSelected(false);
    setIsTodaySelected(false);
    setIsWeeklySelected(true);
    setIsMonthlySelected(false);
    setIsAnnualSelected(false);
    setIsWeeklySelected(!isWeeklySelected);
  };

  const handleMonthlyToggle = () => {
    setIsSpecificSelected(false);
    setIsTodaySelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(true);
    setIsAnnualSelected(false);
    setIsMonthlySelected(!isMonthlySelected);
  };

  const handleAnnualToggle = () => {
    setIsTodaySelected(false);
    setIsWeeklySelected(false);
    setIsMonthlySelected(false);
    setIsAnnualSelected(true);
    setIsAnnualSelected(!isAnnualSelected);
  };

  const getFilteredRequests = () => {
    if (isTodaySelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt).toDateString() ===
            new Date().toDateString()
      );
    } else if (isWeeklySelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfWeek(new Date()) &&
          new Date(request.createdAt) <= endOfWeek(new Date())
      );
    } else if (isMonthlySelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfMonth(new Date()) &&
          new Date(request.createdAt) <= endOfMonth(new Date())
      );
    } else if (isAnnualSelected) {
      return requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfYear(new Date()) &&
          new Date(request.createdAt) <= endOfYear(new Date())
      );
    } else {
      return requests.filter(
        (request) => request.status === "Transaction Completed"
      );
    }
  };

  const filteredRequests = getFilteredRequests();

  const totalFees = filteredRequests.reduce(
    (total, request) => total + request.fee,
    0
  );

  const estimatedRevenue = requests.reduce(
    (total, request) =>
      request.status !== "Cancelled" ? total + request.fee : total,
    0
  );

  const filteredTotalServices = isTodaySelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt).toDateString() ===
          new Date().toDateString()
      ).length
    : isWeeklySelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt) >= startOfWeek(new Date()) &&
          new Date(request.createdAt) <= endOfWeek(new Date())
      ).length
    : isMonthlySelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt) >= startOfMonth(new Date()) &&
          new Date(request.createdAt) <= endOfMonth(new Date())
      ).length
    : isAnnualSelected
    ? requests.filter(
        (request) =>
          new Date(request.createdAt) >= startOfYear(new Date()) &&
          new Date(request.createdAt) <= endOfYear(new Date())
      ).length
    : requests.length;

  const filteredCompletedServices = isTodaySelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt).toDateString() ===
            new Date().toDateString()
      ).length
    : isWeeklySelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfWeek(new Date()) &&
          new Date(request.createdAt) <= endOfWeek(new Date())
      ).length
    : isMonthlySelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfMonth(new Date()) &&
          new Date(request.createdAt) <= endOfMonth(new Date())
      ).length
    : isAnnualSelected
    ? requests.filter(
        (request) =>
          request.status === "Transaction Completed" &&
          new Date(request.createdAt) >= startOfYear(new Date()) &&
          new Date(request.createdAt) <= endOfYear(new Date())
      ).length
    : requests.filter((request) => request.status === "Transaction Completed")
        .length;

  const filteredEstimatedRevenue = isTodaySelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt).toDateString() ===
            new Date().toDateString()
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : isWeeklySelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt) >= startOfWeek(new Date()) &&
            new Date(request.createdAt) <= endOfWeek(new Date())
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : isMonthlySelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt) >= startOfMonth(new Date()) &&
            new Date(request.createdAt) <= endOfMonth(new Date())
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : isAnnualSelected
    ? requests
        .filter(
          (request) =>
            new Date(request.createdAt) >= startOfYear(new Date()) &&
            new Date(request.createdAt) <= endOfYear(new Date())
        )
        .reduce(
          (total, request) =>
            request.status !== "Cancelled" ? total + request.fee : total,
          0
        )
    : requests.reduce(
        (total, request) =>
          request.status !== "Cancelled" ? total + request.fee : total,
        0
      );

  // End for Profit

  const onSelect = (e) => {
    console.log("select", e.target.value);

    setSelected(e.target.value);

    console.log("specified select", filters(e.target.value, specifiedDate));
  };

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setSpecifiedDate(date);
  };

  const onChangeWeek = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
  };

  const onChangeMonth = (e) => {
    const date = moment(e.target.value).toDate();
    setSpecifiedDate(date);
  };

  const onChangeYear = (e) => {
    if (e.target.value === "") {
      setRequests(requests); // Replace with your initial data
    } else {
      const date = new Date(e.target.value, 0, 1);
      setSpecifiedDate(date);
    }
  };

  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({
    chart: { type: "bar" },
    xaxis: { categories: [] },
    yaxis: {
      title: {
        text: "Total Revenue",
      },
    },
  });

  const [timeRange, setTimeRange] = useState("today");
  const [specificDate, setSpecificDate] = useState(() => {
    return new Date(); // Initializes the state to today's date as a Date object
  });
  const [specificYear, setSpecificYear] = useState(new Date().getFullYear());
  const [specificMonth, setSpecificMonth] = useState(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}`
  );

  const [specificWeek, setSpecificWeek] = useState(""); // Default to current date
  useEffect(() => {
    const fetchFeeSummary = async () => {
      try {
        const params = { timeRange: timeRange };
        if (timeRange === "specific") {
          // specificDate is already in ISO format (YYYY-MM-DD)
          params.specificDate = specificDate;
        }

        if (timeRange === "weekly" && specificWeek) {
          // Send only the start of the week to the backend
          const [year, weekNumber] = specificWeek.split("-W");
          const weekStart = moment()
            .isoWeekYear(year)
            .isoWeek(weekNumber)
            .startOf("isoWeek")
            .toISOString();
          params.week = weekStart;
        }
        if (timeRange === "monthly" && specificMonth) {
          const [year, month] = specificMonth.split("-");
          params.year = parseInt(year);
          params.month = parseInt(month);
        }

        if (timeRange === "annual") {
          params.year = specificYear;
        }
        // Make the API request
        const response = await axios.get(`${API_LINK}/requests/get_revenue`, {
          params: params,
        });
        const data = response.data;

        const barangays = [
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

        const mappedData = barangays.map((brgy) => {
          const found = data.find(
            (item) => item._id.toUpperCase() === brgy.toUpperCase()
          );
          return found ? found.totalFee : 0;
        });

        setSeries([{ name: "Total Fee", data: mappedData }]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: barangays,
            title: {
              text: "Barangays",
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching fee summary:", error);
      }
    };

    fetchFeeSummary();
  }, [timeRange, specificDate, specificWeek, specificMonth, specificYear]);

  const barangays = [
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

  const [chartData, setChartData] = useState({
    options: {
      chart: { id: "fee-summary" },
      xaxis: {
        categories: barangays,
      },
    },
    series: [
      {
        name: "Total Fee",
        data: new Array(barangays.length).fill(0), // Initialize with 0s
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { timeRange: timeRange };
        if (timeRange === "specific") {
          // specificDate is already in ISO format (YYYY-MM-DD)
          params.specificDate = specificDate;
        }
        if (timeRange === "weekly" && specificWeek) {
          // Send only the start of the week to the backend
          const [year, weekNumber] = specificWeek.split("-W");
          const weekStart = moment()
            .isoWeekYear(year)
            .isoWeek(weekNumber)
            .startOf("isoWeek")
            .toISOString();
          params.week = weekStart;
        }
        if (timeRange === "monthly" && specificMonth) {
          const [year, month] = specificMonth.split("-");
          params.year = parseInt(year);
          params.month = parseInt(month);
        }

        if (timeRange === "annual") {
          params.year = specificYear;
        }
        // Make the API request
        const response = await axios.get(`${API_LINK}/requests/est_revenue`, {
          params: params,
        });
        const data = response.data;
        console.log("jj", data);
        // Map API data to barangay array, filling in zeros where no data exists
        const feeData = barangays.map((brgy) => {
          const item = data.find(
            (d) => d._id.toUpperCase() === brgy.toUpperCase()
          );
          return item ? item.totalFee : 0;
        });

        setChartData({
          ...chartData,
          series: [{ ...chartData.series[0], data: feeData }],
        });
      } catch (error) {
        console.error("Error fetching fee summary data:", error);
      }
    };

    fetchData();
  }, [timeRange, specificDate, specificWeek, specificMonth, specificYear]);
  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  // Function to handle specific date change
  const handleSpecificDateChange = (date) => {
    setSpecificDate(date);
    // You can perform additional logic here if needed
  };
  return (
    <div className="mx-4 mt-[10rem] md:mt-[2rem] p-2 lg:mt-6 lg:w-[calc(100vw_-_305px)] xxl:w-[calc(100vw_-_440px)] xxl:w-[calc(100vw_-_310px)]">
      <div className="flex flex-col scrollbarWidth scrollbarTrack scrollbarHover scrollbarThumb  h-[calc(100vh_-_95px)]">
        <div className="flex flex-col lg:flex-col justify-start items-start w-full mb-3">
          {/* <h2 className="text-lg lg:text-4xl font-bold mb-3 lg:mb-0 uppercase">
            Analytic Reports
          </h2> */}
          <div className="flex lg:justify-end mb-3 w-full lg:w-auto">
            <div className="flex flex-col w-full lg:w-auto">
              <div className="flex flex-col justify-start  w-full">
                <div
                  id="toggle-count"
                  className="flex gap-2 p-2 rounded-lg bg-gray-500 w-full lg:w-auto justify-start items-start overflow-x-auto lg:overflow-x-hidden"
                >
                  <button
                    className={`px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm lg:text-base focus:outline-none focus:ring focus:border-blue-300 ${
                      timeRange === "specific"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleTimeRangeChange("specific")}
                  >
                    Specific
                  </button>
                  <button
                    className={`px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm lg:text-base focus:outline-none focus:ring focus:border-blue-300 ${
                      timeRange === "today"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleTimeRangeChange("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm lg:text-base focus:outline-none focus:ring focus:border-blue-300 ${
                      timeRange === "weekly"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleTimeRangeChange("weekly")}
                  >
                    Weekly
                  </button>
                  <button
                    className={`px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm lg:text-base focus:outline-none focus:ring focus:border-blue-300 ${
                      timeRange === "monthly"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleTimeRangeChange("monthly")}
                  >
                    Monthly
                  </button>
                  <button
                    className={`px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium text-sm lg:text-base focus:outline-none focus:ring focus:border-blue-300 ${
                      timeRange === "annual"
                        ? "bg-green-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleTimeRangeChange("annual")}
                  >
                    Annual
                  </button>
                </div>
                {timeRange === "specific" && (
                  <div className="flex justify-center items-center bg-gray-200 shadow-sm rounded-lg p-2 mt-4">
                    <label className="mr-4 text-lg font-medium text-gray-700">
                      Select Specific Date:
                    </label>
                    <input
                      type="date"
                      value={specificDate.toISOString().split("T")[0]}
                      onChange={(e) =>
                        setSpecificDate(new Date(e.target.value))
                      }
                      className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg text-gray-700"
                    />
                  </div>
                )}

                {timeRange === "weekly" && (
                  <div className="flex justify-center items-center bg-gray-200 shadow-sm rounded-lg p-4 mt-4">
                    <label className="mr-4 text-lg font-medium text-gray-700">
                      Select Specific Week:
                    </label>
                    <div className="relative">
                      <input
                        type="week"
                        value={specificWeek}
                        onChange={(e) => setSpecificWeek(e.target.value)}
                        className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg text-gray-700"
                      />
                    </div>
                  </div>
                )}

                {timeRange === "monthly" && (
                  <div className="flex justify-center items-center bg-gray-200 shadow-sm rounded-lg p-4 mt-4">
                    <label className="mr-4 text-lg font-medium text-gray-700">
                      Select Month:
                    </label>
                    <input
                      className="text-gray-400 py-1 px-3 rounded-md font-medium shadow-sm text-sm border border-black"
                      type="month"
                      id="month"
                      name="month"
                      value={specificMonth} // Directly use specificMonth as value
                      onChange={(e) => setSpecificMonth(e.target.value)} // Update specificMonth with the input's value directly
                    />
                  </div>
                )}

                {timeRange === "annual" && (
                  <div className="flex justify-center items-center bg-gray-200 shadow-sm rounded-lg p-4 mt-4">
                    <label className="mr-4 text-lg font-medium text-gray-700">
                      Select Year:
                    </label>
                    <input
                      type="number"
                      value={specificYear}
                      min="1950"
                      max={new Date().getFullYear() + 10}
                      onChange={(e) =>
                        setSpecificYear(parseInt(e.target.value))
                      }
                      className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg text-gray-700"
                    />
                  </div>
                )}

                {/* END OF DATE INPUTS */}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h4 className="text-lg  font-bold mb-3">
              TOTAL APPROVED BARANGAYS SERVICES
            </h4>
            <p className="text-xl text-[#408D51] font-bold">
              {filteredTotalServices}
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-bold mb-3">
              TOTAL NUMBER OF REGISTERED RESIDENTS
            </h4>
            <p className="text-xl text-[#408D51] font-bold">{totalUsersSum}</p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full ">
          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5 justify-center items-center">
            <h1 className="mt-5 ml-5 font-medium text-black">
              Total Service Revenue per Barangay
            </h1>
            <div className="flex rounded-xl">
              {series.length > 0 && (
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  className="flex w-11/12 rounded-xl"
                />
              )}
            </div>
          </div>
          <div className="bg-[#e9e9e9] w-full lg:w-1/2 rounded-xl mt-5 justify-center items-center">
            <h1 className="mt-5 ml-5 font-medium text-black">
              Est. Service Revenue per Barangay
            </h1>
            <div className="flex rounded-xl">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                className="flex w-11/12 rounded-xl"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full ">
          <RRM />
          <RRB />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full ">
          <SRT />
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-2 w-full ">
          <RIB />
        </div>
      </div>
    </div>
  );
};

export default Reports;
