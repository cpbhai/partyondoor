import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

const HomeSlider = () => {
  const images = [
    {
      url: "1.jpg",
    },
    {
      url: "/2.jpg",
    },
    {
      url: "/3.1.jpg",
    },
    {
      url: "/4.jpg",
    },
  ];
  return (
    <div className="homeSlideMainDiv">
      <Slide easing="cubic-out" duration={3000}>
        <div className="each-slide">
          <div
            className="homedeskSlide"
            style={{ backgroundImage: `url(${images[0].url})` }}
          >
            <span>Cakes &amp; Party Food</span>
          </div>
          <div
            className="homephoneSlide"
            style={{ backgroundImage: `url(phone/${images[0].url})` }}
          >
            <span>Cakes &amp; Party Food</span>
          </div>
          <div
            className="hometabSlide"
            style={{ backgroundImage: `url(${images[0].url})` }}
          >
            <span>Cakes &amp; Party Food</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="homedeskSlide"
            style={{ backgroundImage: `url(${images[1].url})` }}
          >
            <span>Reception Decorators</span>
          </div>
          <div
            className="homephoneSlide"
            style={{ backgroundImage: `url(phone/${images[1].url})` }}
          >
            <span>Reception Decorators</span>
          </div>
          <div
            className="hometabSlide"
            style={{ backgroundImage: `url(${images[1].url})` }}
          >
            <span>Reception Decorators</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="homedeskSlide"
            style={{ backgroundImage: `url(${images[2].url})` }}
          >
            <span>Catering Services</span>
          </div>
          <div
            className="homephoneSlide"
            style={{ backgroundImage: `url(phone/3.1.jpeg)` }}
          >
            <span>Catering Services</span>
          </div>
          <div
            className="hometabSlide"
            style={{ backgroundImage: `url(${images[2].url})` }}
          >
            <span>Catering Services</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            className="homedeskSlide"
            style={{ backgroundImage: `url(${images[3].url})` }}
          >
            <span>DJs &amp; Sound Systems</span>
          </div>
          <div
            className="homephoneSlide"
            style={{ backgroundImage: `url(phone/4.jpeg)` }}
          >
            <span>DJs &amp; Sound Systems</span>
          </div>
          <div
            className="hometabSlide"
            style={{ backgroundImage: `url(${images[3].url})` }}
          >
            <span>DJs &amp; Sound Systems</span>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default HomeSlider;
