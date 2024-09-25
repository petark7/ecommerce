import PropTypes from "prop-types";
import Image from "next/image";
import Button from "../Button";
import clsx from "clsx";

const colorMap = {
  blue: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-700",
  },
  pink: {
    bg: "bg-pink-400",
    hover: "hover:bg-pink-600",
  },
  yellow: {
    bg: "bg-yellow-600",
    hover: "hover:bg-yellow-500",
  },
};

const CategoryComponent = ({ imageSrc, buttons }) => {
  return (
    <div className="relative">
      <Image
        className="object-cover"
        layout="responsive"
        src={imageSrc}
        alt="category"
        width={100}
        height={100}
      />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center p-10 bg-opacity-80 bg-black">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={clsx(
              colorMap[button.color].bg,
              colorMap[button.color].hover,
              "transition duration-300 text-white mt-2"
            )}
          >
            {button.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

CategoryComponent.propTypes = {
  buttons: PropTypes.shape({
    map: PropTypes.func,
  }),
  imageSrc: PropTypes.any,
};

export default CategoryComponent;
