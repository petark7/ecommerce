"use client";

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
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductList = ({ products }) => {
  return (
    <Carousel infinite showDots={false} responsive={customResponsive}>
      {products.map((product) => (
        <div key={product.id} className="mx-2">
          {" "}
          {/* Add margin between items */}
          <Product product={product} />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductList;
