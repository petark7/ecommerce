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

export default PasswordField;
