"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "../../redux/slices/userSlice";
import { auth } from "../../firebase/utils";
import Button from "../../components/Button";
import EmailField from "../../components/reusable-components/EmailField";
import PasswordField from "../../components/reusable-components/PasswordField";

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
          <Button type="submit" color="red-500">
            LOGIN
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Page;
