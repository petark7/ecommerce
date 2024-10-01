"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { onAuthStateChanged } from "firebase/auth";
import { createAccount } from "../../redux/slices/userSlice";
import { auth } from "../../firebase/utils";
import Button from "../../components/Button";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    }
  });

  const handleRegister = ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    dispatch(createAccount({ email, password }));
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-7 items-center md:shadow-lg p-8 md:p-14 m-3 md:m-10">
        <div className="font-light text-4xl">Register</div>
        <div className="text-lg text-center">
          Enter your information below to register.
        </div>

        <form
          className="flex flex-col w-full gap-3"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* Email Field */}
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

          {/* Password Field */}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}

          {/* Confirm Password Field */}
          <input
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />
          {errors.confirmPassword && (
            <span className="text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Register Button */}
          <Button className={"uppercase"} type="submit" color="red-500">
            Register
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Page;
