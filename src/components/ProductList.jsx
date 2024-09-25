"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Product from "./Product";
import Carousel from "react-multi-carousel";

const customResponsive = {
  superLargeDesktop: {
    // the naming can be any
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

const CustomButtonGroup = ({ next, previous }) => {
  return (
    <div className="relative top-1/2 w-full flex justify-between -translate-y-1/2">
      <button
        className="absolute -top-52 md:-left-14 bg-gray-300 font-bold text-xl w-10 
        h-10 flex items-center justify-center rounded-full hover:bg-gray-400"
        onClick={previous}
      >
        {"<"}
      </button>
      <button
        className="absolute -top-52 right-0 md:-right-14 bg-gray-300 font-bold 
        text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400"
        onClick={next}
      >
        {">"}
      </button>
    </div>
  );
};

const FeaturedProducts = ({ products }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-30">
      <Carousel
        arrows={false}
        customButtonGroup={<CustomButtonGroup />}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside
        infinite
        showDots={false}
        responsive={customResponsive}
      >
        {products.map((product) => (
          <div key={product.id} className="mx-2">
            {" "}
            {/* Add margin between items */}
            <Product product={product} />
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center">
        <Button
          className={"w-72"}
          label="View All Featured Products"
          handleClick={() => {
            router.push("/products/featured");
          }}
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
