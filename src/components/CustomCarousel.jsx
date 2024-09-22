import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomCarousel = ({
  children,
  className,
  customResponsive,
  showDots,
}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      className={className}
      responsive={customResponsive ? customResponsive : responsive}
      showDots={showDots}
    >
      {children}
    </Carousel>
  );
};

CustomCarousel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CustomCarousel;