"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { onAuthStateChanged } from "firebase/auth";
import { createAccount } from "../../redux/slices/userSlice";
import { auth } from "../../firebase/utils";
import RegisterForm from "./RegisterForm";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleRegister = ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    dispatch(createAccount({ email, password }));
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div
        className="flex flex-col gap-7 items-center justify-center 
        md:shadow-lg p-8 md:p-14 m-3 md:m-10 w-[500px] h-[600px]"
      >
        <div className="font-light text-4xl">Register</div>
        <div className="text-lg text-center">
          Enter your information below to register.
        </div>

        <RegisterForm
          handleSubmit={handleSubmit}
          handleRegister={handleRegister}
          register={register}
          errors={errors}
          password={password}
        />
      </div>
    </section>
  );
};

export default Page;
