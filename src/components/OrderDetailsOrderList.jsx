import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const OrderDetailsOrderList = ({ order }) => {
  const [orderProductsJSX, setOrderProductsJSX] = useState();

  useEffect(() => {
    if (order?.cart?.length > 0) {
      const productsJSX = order?.cart.map((product, index) => (
        <tr key={product.id} className="h-[80px]">
          <th>{index + 1}</th>
          <td className="flex gap-3 items-center">
            <Image
              className="w-[100px] h-[100px] object-cover object-center rounded"
              src={product?.main_image}
              alt={product?.name}
              width={200}
              height={100}
            />
            <Link href={`/product-details/${product.id}`}>
              <div className="text-center cursor-pointer hover:text-red-400 font-semibold uppercase">
                {product?.name}
              </div>
            </Link>
          </td>
          <td>${product?.price}</td>
          <td className="text-center">{product?.amount}</td>
          <td>${product?.price * product.amount}</td>
        </tr>
      ));

      setOrderProductsJSX(productsJSX);
    }
  }, [order]);
  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th />
            <th className="uppercase">Product</th>
            <th className="uppercase">Price</th>
            <th className="uppercase">Quantity</th>
            <th className="uppercase">Total</th>
          </tr>
        </thead>
        <tbody>{orderProductsJSX}</tbody>
      </table>
    </div>
  );
};

OrderDetailsOrderList.propTypes = {
  order: PropTypes.shape({
    cart: PropTypes.array,
  }),
};

export default OrderDetailsOrderList;
