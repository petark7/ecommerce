import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { clearCartAction, logUserOut } from "../redux/slices/userSlice";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="m-1">
        <FontAwesomeIcon
          className="text-3xl text-gray-600 cursor-pointer"
          icon={faUserCircle}
        />
      </label>
      <ul
        tabIndex="0"
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100
      rounded-box w-52"
      >
        <li
          onClick={() => {
            router.push("/account/order_history");
          }}
        >
          <a>Order History</a>
        </li>

        <li
          onClick={() => {
            router.push("/account/account_settings");
          }}
        >
          <a>Account Settings</a>
        </li>

        <li>
          <a
            onClick={() => {
              dispatch(logUserOut());
              dispatch(clearCartAction());
              router.push("/");
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
