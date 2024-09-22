"use client";
import Image from "next/image";
import CustomCarousel from "./CustomCarousel";
import { useClickWithoutDrag } from "../hooks/useClickWithoutDrag";
import Carousel from "react-multi-carousel";

const SponsorsCarousel = () => {
  const { handleMouseDown, handleMouseUp } = useClickWithoutDrag();

  const images = [
    "/sponsor-images/adidas.png",
    "/sponsor-images/armani.png",
    "/sponsor-images/boss.png",
    "/sponsor-images/calvin.png",
    "/sponsor-images/chanel.png",
    "/sponsor-images/converse.png",
    "/sponsor-images/dolce.png",
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <Carousel
      autoPlay
      customTransition="all 1s linear"
      transitionDuration={1000}
      autoPlaySpeed={1}
      arrows={false}
      infinite
      draggable={false}
      responsive={responsive}
      className={"h-full flex"}
    >
      {images.map((image, index) => (
        <div key={index} className="mr-4">
          <Image
            width={130}
            height={100}
            src={image}
            alt={`Carousel image ${index + 1}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default SponsorsCarousel;
