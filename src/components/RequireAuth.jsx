import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  // REMOVED INEFFECTIVE CODE
  // TODO: FIND A WAY TO IMPLEMENT PROTECTED ROUTES CORRECTLY

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default RequireAuth;
