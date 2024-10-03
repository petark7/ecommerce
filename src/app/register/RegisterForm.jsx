import PropTypes from "prop-types";
import Button from "../../components/Button";
import EmailField from "../../components/reusable-components/EmailField";
import PasswordField from "../../components/reusable-components/PasswordField";
import ConfirmPasswordField from "../../components/reusable-components/ConfirmPasswordField";

const RegisterForm = ({
  handleSubmit,
  handleRegister,
  register,
  errors,
  password,
}) => {
  return (
    <>
      <form
        className="flex flex-col w-full gap-3"
        onSubmit={handleSubmit(handleRegister)}
      >
        <EmailField register={register} errors={errors} />
        <PasswordField register={register} errors={errors} />
        <ConfirmPasswordField
          register={register}
          errors={errors}
          password={password}
        />

        <Button className={"uppercase"} type="submit" color="red-500">
          Register
        </Button>
      </form>
    </>
  );
};

RegisterForm.propTypes = {
  errors: PropTypes.shape({
    confirmPassword: PropTypes.shape({
      message: PropTypes.string,
    }),
    email: PropTypes.shape({
      message: PropTypes.string,
    }),
    password: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  handleRegister: PropTypes.func,
  handleSubmit: PropTypes.func,
  password: PropTypes.string,
  register: PropTypes.func,
};

export default RegisterForm;
