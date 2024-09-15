"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faLock, faWrench } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../../components/Layout";
import ManagePassword from "../../../components/ManagePassword";
import AccountSettings from "../../../components/AccountSettings";
import ManageAddresses from "../../../components/ManageAddresses";
import OrderHistory from "../../../components/OrderHistory";

export const dynamic = "force-dynamic";

const Page = () => {
  const [activeButton, setActiveButton] = useState("account_settings");
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      id: "account_settings",
      label: (
        <div className="flex flex-row gap-2 justify-center items-center">
          <FontAwesomeIcon size="lg" icon={faWrench} />
          <p>Account Settings</p>
        </div>
      ),
      action: () => {
        router.push("/account/account_settings");
      },
    },
    {
      id: "manage_password",
      label: (
        <div className="flex flex-row gap-2 justify-center items-center">
          <FontAwesomeIcon size="lg" icon={faLock} />
          <p>Manage Password</p>
        </div>
      ),
      action: () => {
        router.push("/account/manage_password");
      },
    },
    {
      id: "order_history",
      label: (
        <div className="flex flex-row gap-2 justify-center items-center">
          <FontAwesomeIcon size="lg" icon={faHistory} />
          <p>Order History</p>
        </div>
      ),
      action: () => {
        router.push("/account/order_history");
      },
    },
  ];

  useEffect(() => {
    const currentPage = pathname.split("/").pop();
    setActiveButton(currentPage || "account_settings");
  }, [pathname]);

  return (
    <Layout>
      <section className="container mx-auto p-10 flex flex-col gap-10">
        <div className="flex items-center justify-center ">
          <ul className="flex flex-col lg:flex-row gap-4 p-4 items-center py-6 w-full border rounded">
            {items.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className={`text-center w-full p-3 px-5 hover:bg-gray-200
                rounded transition duration-200 hover:cursor-pointer 
                ${activeButton === item.id && "bg-red-200"}`}
                onClick={item.action}
              >
                <a className="font-semibold">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="border p-5">
            {activeButton === "account_settings" && <AccountSettings />}
            {activeButton === "manage_password" && <ManagePassword />}
            {activeButton === "manage_addresses" && <ManageAddresses />}
            {activeButton === "order_history" && <OrderHistory />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;
