import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Advantages from '../components/Advantages';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Advantages />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
};

export default LandingPage;
