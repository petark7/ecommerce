"use client";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Product from "./Product";
import Carousel from "react-multi-carousel";
import CustomButtonGroup from "./Carousel/CustomButtonGroup";
import responsiveBreakpoints from "./Carousel/responsiveBreakpoints";

const FeaturedProducts = ({ products }) => {
  const router = useRouter();

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

FeaturedProducts.propTypes = {
  products: PropTypes.shape({
    map: PropTypes.func,
  }),
};

export default FeaturedProducts;
