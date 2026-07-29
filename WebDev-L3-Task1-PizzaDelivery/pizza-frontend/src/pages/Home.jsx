import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import FeaturedPizzas from "../components/home/FeaturedPizzas";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedPizzas />
      <Footer />

    </div>
  );
};

export default Home;