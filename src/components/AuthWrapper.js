"use client";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";

export default function AuthWrapper({ children }) {
  useAuth();

  return <>{children}</>;
}

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
