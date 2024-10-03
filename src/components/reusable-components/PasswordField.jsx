import PropTypes from "prop-types";
const PasswordField = ({ register, errors }) => {
  return (
    <>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          pattern: {
            value:
              // eslint-disable-next-line no-useless-escape
              /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~])[^\s]{2,}$/,
            message:
              "Password must contain at least one uppercase letter and one special character",
          },
        })}
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
      />
      {errors.password && (
        <span className="text-red-600">{errors.password.message}</span>
      )}
    </>
  );
};

PasswordField.propTypes = {
  errors: PropTypes.shape({
    password: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  register: PropTypes.func,
};

export default PasswordField;
