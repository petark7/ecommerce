import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Modal = ({ children, isOpen, toggleModal }) => {
	if (!isOpen) {
		return null;
	}

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={e => {
				e.stopPropagation();
			}}
		>
			<div className="modal-box bg-white p-6 rounded-lg shadow-lg">
				<div className="" onClick={e => e.stopPropagation()}>
					<button
						type="button"
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
							toggleModal(false);
						}}
					>✕
					</button>
					{children}
				</div>
			</div>
		</div>,
		document.querySelector('#modal-root')
	);
};

Modal.propTypes = {
	children: PropTypes.node,
	isOpen: PropTypes.bool,
	toggleModal: PropTypes.func
};

export default Modal;
