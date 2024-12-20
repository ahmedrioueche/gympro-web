import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import SideMenu from './SideBar';
import SkeletonHome from '../ui/SkeletonHome';
import AppFooter from './AppFooter';
import ErrorBoundary from '../ui/ErrorBoundary';

// Lazy load components
const Home = React.lazy(() => import('./Home'));
const Authentication = React.lazy(() => import('./facialRec/Authentication copy'));
const AddUser = React.lazy(() => import('./facialRec/AddMember'));
const Members = React.lazy(() => import('./members/Members'));
const MemberProfile = React.lazy(() => import('./members/MemberProfile'));
const GymDashboard = React.lazy(() => import('./dashboard/Dashboard'));
const Settings = React.lazy(() => import('./settings/Settings'));
const Feedback = React.lazy(() => import('./Feedback'));
const UserProfile = React.lazy(() => import('./UserProfile'));
const Help = React.lazy(() => import('./Help'));
const Test = React.lazy(() => import('./facialRec/Test'));

const Main = () => {
  return (
    <div className="flex min-h-screen flex-col scrollbar-hide">
      {/* Navbar at the top */}
      <AppNavbar />

      {/* Main content container */}
      <div className="flex h-full flex-1 overflow-hidden">
        {/* SideMenu with fixed width and full height */}
        <SideMenu />

        {/* Render nested routes */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-light-background dark:bg-dark-background">
          <Suspense fallback={<SkeletonHome />}>
            <Routes>
              <Route
                path="home"
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                }
              />
              <Route
                path="authentication"
                element={
                  <ErrorBoundary>
                    <Authentication />
                  </ErrorBoundary>
                }
              />
              <Route
                path="add-member"
                element={
                  <ErrorBoundary>
                    <AddUser />
                  </ErrorBoundary>
                }
              />
              <Route
                path="members"
                element={
                  <ErrorBoundary>
                    <Members />
                  </ErrorBoundary>
                }
              />
              <Route
                path="profile/:memberId"
                element={
                  <ErrorBoundary>
                    <MemberProfile />
                  </ErrorBoundary>
                }
              />
              <Route
                path="dashboard"
                element={
                  <ErrorBoundary>
                    <GymDashboard />
                  </ErrorBoundary>
                }
              />
              <Route
                path="settings"
                element={
                  <ErrorBoundary>
                    <Settings />
                  </ErrorBoundary>
                }
              />
              <Route
                path="feedback"
                element={
                  <ErrorBoundary>
                    <Feedback />
                  </ErrorBoundary>
                }
              />
              <Route
                path="profile"
                element={
                  <ErrorBoundary>
                    <UserProfile />
                  </ErrorBoundary>
                }
              />
              <Route
                path="help"
                element={
                  <ErrorBoundary>
                    <Help />
                  </ErrorBoundary>
                }
              />
              <Route
                path="test"
                element={
                  <ErrorBoundary>
                    <Test />
                  </ErrorBoundary>
                }
              />
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
