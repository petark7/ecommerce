"use client";

import Link from "next/link";
import notFoundImage from "../assets/notfound.svg";
import Image from "next/image";

const Page = () => {
  return (
    <section
      className="flex flex-col md:flex-row md:items-center
      gap-4 justify-center p-10 h-screen"
    >
      <div className="flex flex-col md:flex-row md:items-center md:w-[1000px]">
        <Image src={notFoundImage} alt="404 not found" width={400} />
        <div className="flex flex-col gap-4">
          <div className="text-4xl">Page not found :(</div>

          <div className="text-xl">
            You either wandered to a place that doesn&apos;t exist or don&apos;t
            have permissions to visit. Sorry!
          </div>

          <Link href={"/"}>
            <button
              type="button"
              className="md:max-w[100px] mt-5 md:w-[250px] border bg-red-500 text-xl
            text-white py-4 font-semibold rounded-md"
            >
              Go to home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
