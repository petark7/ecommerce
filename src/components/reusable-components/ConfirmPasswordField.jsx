import PropTypes from "prop-types";
const ConfirmPasswordField = ({ register, errors, password }) => {
  return (
    <>
      <input
        {...register("confirmPassword", {
          required: "Password confirmation is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
        type="password"
        placeholder="Confirm Password"
        className="input input-bordered w-full"
      />
      {errors.confirmPassword && (
        <span className="text-red-600">{errors.confirmPassword.message}</span>
      )}
    </>
  );
};

ConfirmPasswordField.propTypes = {
  errors: PropTypes.shape({
    confirmPassword: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  password: PropTypes.string,
  register: PropTypes.func,
};

export default ConfirmPasswordField;
