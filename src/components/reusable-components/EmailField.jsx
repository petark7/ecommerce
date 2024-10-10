import PropTypes from "prop-types";
const EmailField = ({ register, errors }) => {
  return (
    <>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
        type="text"
        placeholder="Email"
        className="input input-bordered w-full"
      />
      {errors.email && (
        <span className="text-red-600">{errors.email.message}</span>
      )}
    </>
  );
};

EmailField.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  register: PropTypes.func,
};

export default EmailField;
