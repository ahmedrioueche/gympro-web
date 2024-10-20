import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/landing/Navbar';
import Banner from './components/landing/Banner';
import Footer from './components/landing/Footer';
import Features from './components/landing/Features';
import CTA from './components/landing/CTA';
import FAQ from './components/landing/FAQ';
import Contact from './components/landing/Contact';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

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
    <Router>
      <div className="App scrollbar-hide font-f1 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/auth/signup' element={<Signup/>}/>
          <Route path='/auth/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
