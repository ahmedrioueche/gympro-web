import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import SideMenu from './SideBar';
import SkeletonHome from '../ui/SkeletonHome';
import AppFooter from './AppFooter';

// Lazy load components
const Home = React.lazy(() => import('./Home'));
const Authentication = React.lazy(() => import('./facialRec/Authentication'));
const AddUser = React.lazy(() => import('./facialRec/AddMember'));
const Members = React.lazy(() => import('./members/Members'));
const MemberProfile = React.lazy(() => import('./members/MemberProfile'));
const GymDashboard = React.lazy(() => import('./dashboard/Dashboard'));
const Settings = React.lazy(() => import('./settings/Settings'));
const Feedback = React.lazy(() => import('./Feedback'));
const UserProfile = React.lazy(() => import('./UserProfile'));
const Help = React.lazy(() => import('./Help'));
const Test = React.lazy(() => import('./Test'));

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
              <Route path="authentication" element={<Authentication />} />
              <Route path="add-member" element={<AddUser />} />
              <Route path="members" element={<Members />} />
              <Route path="profile/:memberId" element={<MemberProfile />} />
              <Route path="dashboard" element={<GymDashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="help" element={<Help />} />
              <Route path="test" element={<Test />} />
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
