import React from 'react'
import { useEffect } from 'react'
import StatisticsDashboard from '../components/dashboard/StatisticsDashboard';
import SubPendingRequest from '../components/dashboard/SubPendingRequest';
import EventsCalendar from '../components/dashboard/UpcomingEvents';

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Barangay E-Services Management"
  }, []);

  return (
    <div className="mx-4 my-4 mt-[10rem] lg:mt-4">
      <StatisticsDashboard />
      <div className="w-full flex flex-col lg:flex-col ">
        <SubPendingRequest />
        <EventsCalendar />
      </div>
    </div>
  );
}

export default Dashboard