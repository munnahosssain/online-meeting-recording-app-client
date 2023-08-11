import React from "react";
import Parallax from "./Parallax/Parallax";
import Poster from "./Poster";
import AboutClient from "./AboutClient";
import Banner from "./Banner/Banner";
import Testimonials from "./Home/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <Poster />
      <AboutClient />
      <Parallax />
      <Testimonials/>
    </>
  );
};

export default Home;