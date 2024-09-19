import PropTypes from "prop-types";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import QuantityCounter from "../components/QuantityCounter";
import {
  addToCart,
  decrementProductAmount,
  removeFromCart,
  selectIsUpdating,
} from "../redux/slices/cartSlice";
import { selectUser } from "../redux/slices/userSlice";

const CheckoutItem = ({ product }) => {
  const isUpdating = useSelector(selectIsUpdating);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const incrementProduct = () => {
    if (!isUpdating && user) {
      dispatch(addToCart(product));
    } else if (!user) {
      // Code when user is not logged in
      dispatch(addToCart(product));
    }
  };

  const decrementProduct = () => {
    if (!isUpdating && user) {
      dispatch(decrementProductAmount(product));
    } else if (!user) {
      // Code when user is not logged in
      dispatch(decrementProductAmount(product));
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <img
            className="max-w-[70px] object-cover object-center mr-15"
            src={product.image}
          />

          <div className="max-w-sm">
            <Link
              className="font-bold mr-18 cursor-pointer  hover:text-red-400"
              href={`/product-details/${product.id}`}
            >
              {product.title}
            </Link>
          </div>
        </div>
      </td>

      <td>
        <QuantityCounter
          quantity={product.amount}
          incrementAction={incrementProduct}
          decrementAction={decrementProduct}
        />
      </td>

      <td className="font-semibold">${product.price * product.amount}</td>
      <th>
        <FontAwesomeIcon
          className="text-xl text-gray-500 cursor-pointer  hover:text-red-400"
          icon={faClose}
          onClick={() => dispatch(removeFromCart(product.id))}
        />
      </th>
    </tr>
  );
};

CheckoutItem.propTypes = {
  product: PropTypes.shape({
    amount: PropTypes.number,
    id: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default CheckoutItem;
