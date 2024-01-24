import { createBrowserRouter, Outlet } from "react-router-dom";
import Error404 from "../config/Error404";
import Dashboard from "../pages/Dashboard";
import Announcements from "../pages/Announcements";
//import AnimationLayout from "../components/global/AnimationLayout";
import Navbar from "../components/global/Navbar";
import Inquiries from "../pages/Inquiries";
import Residents from "../pages/BarangayTabs/BrgyResidents";
import Information from "../pages/BarangayTabs/Brgyinformation";
import Settings from "../pages/Settings";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/login/ForgotPassword";
import SecurityPin from "../pages/login/SecurityPin";
import ChangePassword from "../pages/login/ChangePassword";
import ArchivedAnnouncements from "../pages/ArchivedAnnouncements";
import ArchivedInquiries from "../pages/ArchivedInquiries";
import ArchivedResidents from "../pages/BarangayTabs/BrgyArchivedResidents";
import ArchivedServices from "../pages/BarangayTabs/BrgyArchivedServices";
import ArchivedServiceReq from "../pages/BarangayTabs/BrgyArchivedServiceReq";
import ArchivedOfficials from "../pages/BarangayTabs/BrgyArchivedOfficials";
import BarangayMenu from "../pages/BarangayMenu";
import BarangayInfo from "../pages/BarangayInfo";
import BrgyArchivedAnnouncement from "../pages/BarangayTabs/BrgyArchivedAnnouncement";
import BrgyArchivedInquiries from "../pages/BarangayTabs/BrgyArchivedInquiries";
import AccountManagement from "../pages/AccountManagement";
import ArchivedAccountManagement from "../pages/ArchivedAccountManagement";
import MunicipalityOffcials from "../pages/MunicipalityOffcials";
import ArchivedMunicipalityOfficials from "../pages/ArchivedMunicipalityOfficials";
import MAboutusInfo from "../pages/MunicipalInfo/MAboutusInfo";
import ArchivedAboutusInfo from "../pages/MunicipalInfo/ArchivedMAboutus"
import MServicesInfo from "../pages/MunicipalInfo/MServicesInfo";
import ArchivedServicesInfo from "../pages/MunicipalInfo/ArchivedMServices"
import MTouristSpot from "../pages/MunicipalInfo/MTouristSpot";
import ArchivedTouristSpot from "../pages/MunicipalInfo/ArchivedTouristSpot";
const pages = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/pin/:email",
    element: <SecurityPin />,
  },
  {
    path: "/change/:email",
    element: <ChangePassword />,
  },
  {
    path: "/dashboard",
    element: <Navbar comp={<Dashboard />} />,
  },

  {
    path: "/announcements",
    element: <Navbar comp={<Announcements />} />,
  },
  {
    path: "/archivedannoucements",
    element: <Navbar comp={<ArchivedAnnouncements />} />,
  },
  {
    path: "/inquiries",
    element: <Navbar comp={<Inquiries />} />,
  },
  {
    path: "/archivedinquiries",
    element: <Navbar comp={<ArchivedInquiries/>} />,
  },
  {
    path: "/aboutus_info",
    element: <Navbar comp={<MAboutusInfo />} />,
  },
  {
    path: "/archived_aboutus_info",
    element: <Navbar comp={<ArchivedAboutusInfo />} />,
  },
  {
    path: "/services_info",
    element: <Navbar comp={<MServicesInfo />} />,
  },
  {
    path: "/archived_services_info",
    element: <Navbar comp={<ArchivedServicesInfo />} />,
  },
  {
    path: "/tourist_spot",
    element: <Navbar comp={<MTouristSpot />} />,
  },
  {
    path: "/archived_tourist_spot",
    element: <Navbar comp={<ArchivedTouristSpot />} />,
  },
  {
    path: "/municipalityofficials",
    element: <Navbar comp={<MunicipalityOffcials />} />,
  },
  {
    path: "/archivedmunicipalityofficials",
    element: <Navbar comp={<ArchivedMunicipalityOfficials />} />,
  },
  {
    path: "/accountmanagement",
    element: <Navbar comp={<AccountManagement />} />,
  },
  {
    path: "/archivedaccountmanagement",
    element: <Navbar comp={<ArchivedAccountManagement />} />,
  },
  {
    path: "/brgyarchivedservices",
    element: <Navbar comp={<ArchivedServices />} />,
  },
  {
    path: "/brgyarchivedservicesreq",
    element: <Navbar comp={<ArchivedServiceReq />} />,
  },
  {
    path: "/brgyarchivedofficials",
    element: <Navbar comp={<ArchivedOfficials />} />,
  },
  {
    path: "/barangaymenu",
    element: <Navbar comp={<BarangayMenu />} />,
  },
  {
    path: "/barangayinformation",
    element: <Navbar comp={<BarangayInfo />} />,
  },
  {
    path: "/brgyarchivedinquiries",
    element: <Navbar comp={<BrgyArchivedInquiries />} />,
  },
  {
    path: "/brgyarchivedannoucements",
    element: <Navbar comp={<BrgyArchivedAnnouncement />} />,
  },
  {
    path: "/brgyarchivedresidents",
    element: <Navbar comp={<ArchivedResidents />} />,
  },
  {
    path: "/brgyinfo",
    element: <Navbar comp={<Information />} />,
  },
  {
    path: "/settings",
    element: <Navbar comp={<Settings />} />,
  },
];

const Route = createBrowserRouter([
  {
    element: <Outlet />, //replace AnimationLayout
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;
