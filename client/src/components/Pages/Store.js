import React from "react";
import Swiper from "react-id-swiper";
import { Grid } from "@material-ui/core";
//Assets
import ts1 from "../img/ts1.png";
import ts2 from "../img/ts2.png";
import ts3 from "../img/ts3.png";
import ts4 from "../img/ts4.png";
import ts5 from "../img/ts5.png";
import ts6 from "../img/ts6.png";

import "./Styles.css";
import "swiper/swiper-bundle.css";
// Component
import Details from "../../components/About/AboutBox";
import Storedetails from "../Store/StoreBox";

class Store extends React.Component {
  state = {
    smackers: [
      {
        image: ts1,
        id: "1",
        name: "Basic Black",
        description: "Unisex",
        rank: "60 USD",
      },
      {
        image: ts2,
        id: "2",
        name: "Basic Black Logo",
        description: "Unisex",
        rank: "60 USD",
      },
      {
        image: ts3,
        id: "3",
        name: "Basic Onix Logo",
        description: "Unisex",
        rank: "60 USD",
      },
      {
        image: ts4,
        id: "4",
        name: "Pink Minimal Logo",
        description: "Unisex",
        rank: "60 USD",
      },

      {
        image: ts5,
        id: "4",
        name: "Face Mask Logo",
        description: "Unisex",
        rank: "30 USD",
      },
      {
        image: ts6,
        id: "4",
        name: "White Tank Logo",
        description: "Unisex",
        rank: "50 USD",
      },
    ],
  };

  render() {
    // Card Team RENDER
    let storiesRender = null;
    if (this.state.smackers) {
      storiesRender = this.state.smackers.map((story) => (
        <div key={story.id}>
          <Storedetails profile={story} />
        </div>
      ));
    }
    // OPTIONS FOR Card SLIDER
    const params = {
      effect: "coverflow",
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 5,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      breakpoints: {
        1200: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    };

    return (
      <div className="bg">
        <Grid container className="About container" spacing={12}>
          <h2 className="weight800 font40 padding30">SMVCKLAB Store</h2>

          <Grid className="swiper-container">
            <Swiper effect="overflow" {...params}>
              {storiesRender}
            </Swiper>
            <div className="swiper-pagination"></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Store;
