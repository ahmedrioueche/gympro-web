import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/landing/Navbar';
import Banner from './components/landing/Banner';
import Footer from './components/landing/Footer';
import Features from './components/landing/Features';
import CTA from './components/landing/CTA';
import FAQ from './components/landing/FAQ';
import Contact from './components/landing/Contact';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Verify from './components/auth/Verify';
import Loading from './components/auth/Loading';
import { ProtectedRoute } from './components/ProtectedRoute';
import Main from './components/main/Main';
import Details from './components/auth/Details';
import Members from './components/main/members/Members';
import MemberProfile from './components/main/members/MemberProfile';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Landing Page Component
const Landing = () => {
  return (
    <div>
      <div className="common-bg">
        <Navbar />
        <Banner />
      </div>
      <Features />
      <FAQ />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App overflow-x-hidden font-f1 scrollbar-hide">
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Landing />
            </ErrorBoundary>
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/auth/signup"
          element={
            <ErrorBoundary>
              <Signup />
            </ErrorBoundary>
          }
        />
        <Route
          path="/auth/login"
          element={
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          }
        />
        <Route
          path="/auth/verify"
          element={
            <ErrorBoundary>
              <ProtectedRoute>
                <Verify />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/auth/details"
          element={
            <ErrorBoundary>
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/auth/loading"
          element={
            <ErrorBoundary>
              <Loading />
            </ErrorBoundary>
          }
        />

        {/* Main App Routes */}
        <Route
          path="/main/*"
          element={
            <ErrorBoundary>
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/members"
          element={
            <ErrorBoundary>
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/members/:id"
          element={
            <ErrorBoundary>
              <ProtectedRoute>
                <MemberProfile />
              </ProtectedRoute>
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
