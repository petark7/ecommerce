"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "../../redux/slices/userSlice";
import { auth } from "../../firebase/utils";
import Button from "../../components/Button";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  const handleLogin = () => {
    try {
      dispatch(login({ email, password }));
      if (user.uid) {
        router.push("/");
      }
    } catch {
      // Handle error
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-7 items-center md:shadow-lg p-8 md:p-14 m-3 md:m-10">
        {/* descriptive text at top */}
        <div className="font-light text-4xl">Welcome!</div>
        <div className="text-lg text-center">
          Glad to see you here! Enter your credentials to login:
        </div>
        <div className="w-full">
          <div>TEST ACCOUNT:</div>
          <div>email: testuser@gmail.com</div>
          <div>password: 123456</div>
        </div>

        {/* email, password and forgot password */}
        <form
          className="flex flex-col w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
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
          {/* TODO: forgot password not yet implemented */}
          {/* <div className="w-full text-end underline text-red-500 cursor-pointer">Forgot password?</div> */}
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
