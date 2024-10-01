"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { register } from "../../redux/slices/userSlice";
import { auth } from "../../firebase/utils";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push("/");
    }
  });

  const handleRegister = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    dispatch(register({ email, password }));
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-7 items-center md:shadow-lg p-8 md:p-14 m-3 md:m-10">
        {/* descriptive text at top */}
        <div className="font-light text-4xl">Register</div>
        <div className="text-lg text-center">
          Enter your information below to register.
        </div>

        {/* email, password */}
        <form
          className="flex flex-col w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            handleRegister();
          }}
        >
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />

          {/* login buttons */}
          <Button className={"uppercase"} type="submit" color="red-500">
            Register
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Page;
