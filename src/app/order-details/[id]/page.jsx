"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Loading from "react-fullscreen-loading";
import OrderDetailsOrderList from "../../../components/OrderDetailsOrderList";
import {
  fetchOrders,
  selectOrders,
  selectOrdersStatus,
} from "../../../redux/slices/ordersSlice";
import { selectUser } from "../../../redux/slices/userSlice";
import OrderDetailsSummary from "../../../components/OrderDetailsSummary";
import OrderDetailsDeliveryTracker from "../../../components/OrderDetailsDeliveryTracker";
import { useParams } from "next/navigation";

const Page = () => {
  const orders = useSelector(selectOrders);
  const loadingStatus = useSelector(selectOrdersStatus);
  const [order, setOrder] = useState();
  const { id: orderId } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [dateFormatted, setDateFormatted] = useState();

  // Get orders if not already set in store
  useEffect(() => {
    if (orders?.length === 0 && user?.uid) {
      dispatch(fetchOrders(user?.uid));
    }
  }, [user, orders?.length, dispatch]);

  useEffect(() => {
    setOrder(orders?.find((order) => order.id === orderId));
  }, [orders, orderId]);

  useEffect(() => {
    if (order?.createdAt) {
      setDateFormatted(
        format(new Date(order?.createdAt), "MMMM d, yyyy hh:mm a")
      );
    }
  }, [order]);

  return (
    <section className="flex flex-col items-center container mx-auto my-10 min-h-screen p-4 flex-wrap lg:flex-nowrap">
      <div className="text-3xl font-semibold mb-5">Order Details</div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="flex h-fit gap-3 md:border md:p-7 md:rounded-xl w-full md:w-fit lg:w-full md:shadow">
          {/* orders and total */}
          <div className="w-full">
            <div className="flex flex-col gap-2 bg-gradient-to-r from-[#FF5E62] to-[#FF9966] p-10 rounded-lg">
              <div className="text-3xl text-white font-semibold">
                Order{" "}
                <span className="text-2xl uppercase">
                  {" "}
                  # {order?.id.slice(0, 5)}
                </span>
              </div>
              <div className="font-thin text-white">{dateFormatted}</div>
            </div>

            <div className="flex flex-col mt-10 md:mt-0 md:p-10 gap-20">
              {/* items ordered */}
              {loadingStatus === "idle" || loadingStatus === "loading" ? (
                <Loading loading className="bg-red-500" background="white" />
              ) : (
                <OrderDetailsOrderList order={order} />
              )}
              {/* order summary */}
              <OrderDetailsSummary total={Number(order?.total)} shipping={10} />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[400px]">
          <OrderDetailsDeliveryTracker statuses={order?.statuses} />
        </div>
      </div>
    </section>
  );
};

export default Page;
