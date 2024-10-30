// src/App.tsx
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

const Landing = () => {
  return (
    <div>
      <div className='common-bg'>
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
}

function App() {
  return (
    <div className="App scrollbar-hide font-f1 overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/auth/signup' element={<Signup/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/verify' element={
          <ProtectedRoute>
            <Verify/>
          </ProtectedRoute>
        }/>
        <Route path='/main/*' element={
            <Main/>
        }/>
          <Route path='/members' element={
          <ProtectedRoute>
            <Members/>
          </ProtectedRoute>
        }/>
          <Route path='/auth/details' element={
          <ProtectedRoute>
            <Details/>
          </ProtectedRoute>
        }/>
        <Route path='/auth/loading' element={<Loading/>}/>
      </Routes>
    </div>
  );
}

export default App;