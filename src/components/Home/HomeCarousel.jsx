"use client";
import Image from "next/image";

import CustomCarousel from "../CustomCarousel";
import { useClickWithoutDrag } from "../../hooks/useClickWithoutDrag";
import { images } from "./carouselImages";

const HomeCarousel = () => {
  const { handleMouseDown, handleMouseUp } = useClickWithoutDrag();

  return (
    <CustomCarousel className={"h-full flex"}>
      {images?.map((image, index) => (
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
