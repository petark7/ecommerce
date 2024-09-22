import PropTypes from "prop-types";
const Section = ({ title, children }) => {
  return (
    <div>
      <hr className="mb-5 tex-red-500" />
      <h1 className="w-full text-center text-2xl uppercase font-semibold mb-5">
        {title}
      </h1>
      <hr className="mb-5 tex-red-500" />
      {children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Section;
