import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuantityCounter = ({ quantity, incrementAction, decrementAction }) => (
	<div className="flex h-full flex-1 justify-between border min-w-[80px] p-2">
		<div
			className="flex items-center justify-center cursor-pointer" onClick={() => {
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
			className="flex items-center justify-center cursor-pointer" onClick={() => {
				incrementAction();
			}}
		>
			<FontAwesomeIcon icon={faPlus} />
		</div>

	</div>
);

export default QuantityCounter;
