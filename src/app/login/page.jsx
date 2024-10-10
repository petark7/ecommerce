"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import mobile from "is-mobile";
import { login } from "../../redux/slices/userSlice";
import { auth, loginWithGoogle } from "../../firebase/utils";
import Button from "../../components/Button";
import EmailField from "../../components/reusable-components/EmailField";
import PasswordField from "../../components/reusable-components/PasswordField";
import ShowToast from "../../utils/toast";
import GoogleIcon from "../../assets/google-brands-solid.svg";
const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    }
  });

  const googleLogin = async () => {
    try {
      await loginWithGoogle({ isMobile: mobile() });
      ShowToast("User logged in successfully.", { success: true });
    } catch (error) {
      // Handle the error in the UI
      ShowToast(error.message, { success: false });
    }
  };

  const handleLogin = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-7 items-center justify-center md:shadow-lg p-8 md:p-14 m-3 md:m-10 w-[500px] h-[650px]">
        {/* descriptive text at top */}
        <div className="font-light text-4xl">Welcome!</div>
        <div className="text-lg text-center">
          Glad to see you here! Enter your credentials to login:
        </div>
        <div className="w-full">
          <div>TEST ACCOUNT:</div>
          <div>email: newuser@gmail.com</div>
          <div>password: Test$123</div>
        </div>

        {/* email, password and forgot password */}
        <form
          className="flex flex-col w-full gap-3"
          onSubmit={handleSubmit(handleLogin)}
        >
          <EmailField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
          {/* TODO: forgot password not yet implemented */}

          {/* login buttons */}
          <div>
            <Button type="submit" color="red-500">
              LOGIN
            </Button>

            <Button
              className={"flex gap-3 items-center justify-center bg-blue-500"}
              type={"button"}
              handleClick={() => {
                googleLogin({ isMobile: mobile });
              }}
            >
              <GoogleIcon className="text-white ml-2" height={25} width={25} />
              LOGIN WITH GOOGLE
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
