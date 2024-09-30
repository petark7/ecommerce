"use client";
import PropTypes from "prop-types";
import Button from "./Button";
import Product from "./Product";
import Carousel from "react-multi-carousel";
import CustomButtonGroup from "./Carousel/CustomButtonGroup";
import responsiveBreakpoints from "./Carousel/responsiveBreakpoints";
import Link from "next/link";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="flex flex-col gap">
      <Carousel
        arrows={false}
        customButtonGroup={<CustomButtonGroup />}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside
        infinite
        showDots={false}
        responsive={responsiveBreakpoints}
      >
        {products.map((product) => (
          <div key={product.id} className="mx-2">
            <Product product={product} />
          </div>
        ))}
      </Carousel>
      <div className="flex justify-center">
        <Link href={"/products/features"}>
          <Button
            width="md:w-72 w-full"
            className="bg-red-400"
            label="View All Featured Products"
          />
        </Link>
      </div>
    </div>
  );
};

FeaturedProducts.propTypes = {
  products: PropTypes.shape({
    map: PropTypes.func,
  }),
};

export default FeaturedProducts;
