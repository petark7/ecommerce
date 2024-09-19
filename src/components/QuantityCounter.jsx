import PropTypes from "prop-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuantityCounter = ({ quantity, incrementAction, decrementAction }) => (
  <div className="flex flex-1 justify-between border min-w-[80px] h-[40px] rounded-md">
    <div
      className="flex flex-1 items-center justify-center cursor-pointer"
      onClick={() => {
        if (quantity > 1) {
          decrementAction();
        }
      }}
    >
      <FontAwesomeIcon icon={faMinus} />
    </div>

    <div className="flex items-center justify-center select-none">
      {quantity}
    </div>

    <div
      className="flex flex-1 items-center justify-center cursor-pointer"
      onClick={() => {
        incrementAction();
      }}
    >
      <FontAwesomeIcon icon={faPlus} />
    </div>
  </div>
);

QuantityCounter.propTypes = {
  decrementAction: PropTypes.func,
  incrementAction: PropTypes.func,
  quantity: PropTypes.number,
};

export default QuantityCounter;
