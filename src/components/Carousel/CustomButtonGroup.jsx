import PropTypes from "prop-types";
const CustomButtonGroup = ({ next, previous }) => {
  return (
    <div className="relative top-1/2 w-full flex justify-between -translate-y-1/2">
      <button
        className="absolute -top-52 md:-left-14 bg-gray-300 font-extrabold text-xl w-10 
          h-10 flex items-center justify-center rounded-full hover:bg-gray-400"
        onClick={previous}
      >
        {"<"}
      </button>
      <button
        className="absolute -top-52 right-0 md:-right-14 bg-gray-300 font-extrabold 
          text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-400"
        onClick={next}
      >
        {">"}
      </button>
    </div>
  );
};

CustomButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
};

export default CustomButtonGroup;
