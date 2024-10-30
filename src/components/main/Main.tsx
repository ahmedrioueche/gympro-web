import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import SideMenu from './SideBar';
import SkeletonHome from './SkeletonHome';
import AppFooter from './AppFooter';

// Lazy load components
const Home = React.lazy(() => import('./Home'));
const AddUser = React.lazy(() => import('./AddUser'));
const Members = React.lazy(() => import('./members/Members'));
const MemberProfile = React.lazy(() => import('./members/MemberProfile'));
const GymDashboard = React.lazy(() => import('./dashboard/Dashboard'));
const Settings = React.lazy(() => import('./settings/Settings'));

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen scrollbar-hide">
      {/* Navbar at the top */}
      <AppNavbar />
      
      {/* Main content container */}
      <div className="flex flex-1 overflow-hidden h-full">
        {/* SideMenu with fixed width and full height */}
        <SideMenu />
        
        {/* Render nested routes */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-light-background dark:bg-dark-background">
          <Suspense fallback={<SkeletonHome />}>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="add-member" element={<AddUser />} />
              <Route path="members" element={<Members />} />
              <Route path="profile/:memberId" element={<MemberProfile />} />
              <Route path="dashboard" element={<GymDashboard />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      {/* Footer at the bottom */}
      <AppFooter />
    </div>
  );
};

export default Main;
