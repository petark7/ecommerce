"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectIsUpdating } from "../../../redux/slices/cartSlice";
import { selectUser } from "../../../redux/slices/userSlice";
import ShowToast from "../../../utils/toast";
import { ADD_PRODUCT_SUCCESS } from "../../../constants/toastMessages";

const ClientComponent = ({ product }) => {
  const dispatch = useDispatch();
  const isUpdating = useSelector(selectIsUpdating);
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col gap-4 max-w-[700px]">
      <div className="text-2xl font-semibold text-center lg:text-left">
        {product?.name}
      </div>
      <div className="text-red-400 text-2xl">${product?.price}</div>
      <div className="text-xl">{product?.description}</div>
      <div>
        <button
          type="button"
          className="flex font-semibold justify-center p-4 mt-4 lg:mt-5 border w-full lg:w-[200px] bg-gray-700 text-white rounded-md"
          onClick={() => {
            if (!isUpdating && user) {
              dispatch(addToCart(product));
              ShowToast(ADD_PRODUCT_SUCCESS, {
                success: true,
                position: "bottom-right",
              });
            } else if (!user) {
              dispatch(addToCart(product));
              ShowToast(ADD_PRODUCT_SUCCESS, {
                success: true,
                position: "bottom-right",
              });
            }
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ClientComponent;
