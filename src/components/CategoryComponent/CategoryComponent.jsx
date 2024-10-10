import PropTypes from "prop-types";
import Image from "next/image";
import Button from "../Button";
import clsx from "clsx";
import Link from "next/link";

const colorMap = {
  blue: {
    bg: "bg-blue-400",
    hover: "hover:bg-blue-600",
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

const CategoryComponent = ({ imageSrc, buttons, link }) => {
  return (
    <div className="relative">
      <Link href={link}>
        <Image
          className="object-cover cursor-pointer"
          layout="responsive"
          src={imageSrc}
          alt="category"
          width={100}
          height={100}
        />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-center p-10 bg-opacity-80 bg-black">
        {buttons.map((button) => (
          <Link key={button.id} href={button.link}>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

CategoryComponent.propTypes = {
  buttons: PropTypes.shape({
    map: PropTypes.func,
  }),
  imageSrc: PropTypes.string,
  link: PropTypes.string,
};

export default CategoryComponent;
