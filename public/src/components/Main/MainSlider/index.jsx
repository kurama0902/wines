import React from "react";
import Slider from "react-slick";

import winesSlider1 from '../../.././imgs/wines-slider1.jpg'
import winesSlider2 from '../../.././imgs/wines-slider2.jpg'
import winesSlider3 from '../../.././imgs/wines-slider3.jpg'
import winesSlider4 from '../../.././imgs/wines-slider4.jpeg'

import './slider.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export const MainSlider = () => {
  return (
    <div className="slider">
      <Slider {...settings}>
        <div className="slide-wrap">
          <img className="slider-img" src={winesSlider1} alt="lol" />
          <h1>The best wine</h1>
        </div>
        <div className="slide-wrap">
          <img className="slider-img" src={winesSlider2} alt="lol" />
          <h1>Wine from different countries</h1>
        </div>
        <div className="slide-wrap">
          <img className="slider-img" src={winesSlider3} alt="lol" />
          <h1>Different types</h1>
        </div>
        <div className="slide-wrap">
          <img className="slider-img" src={winesSlider4} alt="lol" />
          <h1>Just taste it</h1>
        </div>
      </Slider>
    </div>
  );
}