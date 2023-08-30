import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import Wrapper from "./Wrapper";
import Title from "./Title";
import Subtitle from "./Subtitle";
import "./Slider.css";


const bogliasco = "https://c1.wallpaperflare.com/preview/403/473/138/shop-clothes-clothing-shopping-mall.jpg";
const countyClare = "https://i.imgur.com/idjXzVQ.jpg";
const craterRock = "https://i.imgur.com/8DYumaY.jpg";
const giauPass = "https://i.imgur.com/8IuucQZ.jpg";

export default function Slider() {
  return (
    <HeroSlider
       height={"100vh"}
     
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 1000,
        slidingDelay: 1,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>Discover <span className="title-span">Sustainable & Affordable</span> Fashion at The Swap Shop</Title>
          <Subtitle>
          Seize the Opportunity! It's Time to Swap Your Way to the Best Wardrobe of Your Life.
          </Subtitle>
        </Wrapper>
      </Overlay>

      {/* <Slide
        shouldRenderMask
        // label="Giau Pass - Italy"
        background={{
          backgroundImageSrc: giauPass
        }}
      /> */}

      <Slide
        shouldRenderMask
        // label="Bogliasco - Italy"
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      {/* <Slide
        shouldRenderMask
        // label="County Clare - Ireland"
        background={{
          backgroundImageSrc: countyClare
        }}
      /> */}

      {/* <Slide
        shouldRenderMask
        // label="Crater Rock, OR - United States"
        background={{
          backgroundImageSrc: craterRock
        }}
      /> */}

      {/* <MenuNav /> */}
    </HeroSlider>
  );
}
