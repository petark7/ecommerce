"use client";
import Image from "next/image";
import image1 from "../../assets/hero-images/1.jpg";
import image2 from "../../assets/hero-images/2.jpg";
import image3 from "../../assets/hero-images/3.jpg";
import image4 from "../../assets/hero-images/4.jpg";
import CustomCarousel from "../CustomCarousel";
import { useClickWithoutDrag } from "../../hooks/useClickWithoutDrag";

const HomeCarousel = () => {
  const { handleMouseDown, handleMouseUp } = useClickWithoutDrag();

  const images = [
    { src: image1, route: "/onsale" },
    { src: image2, route: "/newproducts" },
    { src: image3, route: "/categories" },
    { src: image4, route: "/special-offers" },
  ];

  return (
    <CustomCarousel className={"h-full flex"}>
      {images.map((image, index) => (
        <Image
          className={`select-none cursor-pointer`}
          key={index}
          onMouseDown={handleMouseDown}
          onMouseUp={(e) => handleMouseUp(e, image.route)}
          onLoadingComplete={(img) => img.setAttribute("draggable", "false")}
          src={image.src}
          alt={`Carousel image ${index + 1}`}
        />
      ))}
    </CustomCarousel>
  );
};

export default HomeCarousel;
