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
    <div className="mx-4 my-4 overflow-y-auto lg:h-[calc(100vh_-_105px)]">
      <StatisticsDashboard />
      <div className="w-full flex flex-col lg:flex-col ">
        <SubPendingRequest />
        <EventsCalendar />
      </div>
    </div>
  );
}

export default Dashboard