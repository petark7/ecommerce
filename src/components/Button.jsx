import PropTypes from "prop-types";
const Button = ({
  className,
  width = "w-full",
  label,
  handleClick,
  children,
  type = "button",
  color = "gray-700",
}) => {
  const eventHandler =
    type === "submit" ? { onSubmit: handleClick } : { onClick: handleClick };

  return (
    <button
      type={type}
      className={`${className} ${width} p-5 px-8 mt-5 bg-${color} font-bold text-white active:scale-[0.98] rounded-md`}
      {...eventHandler}
    >
      {label}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
