import { toast } from 'react-toastify';

export const ShowToast = (message, success = true, center = true) => {
	if (success) {
		if (center) {
			toast.success(message, {
				position: toast.POSITION.TOP_CENTER,
				toastId: message
			});
		} else if (!center) {
			toast.success(message, {
				position: toast.POSITION.TOP_RIGHT,
				toastId: message
			});
		}
	} else if (!success) {
		if (center) {
			toast.error(message, {
				position: toast.POSITION.TOP_CENTER,
				toastId: message
			});
		} else if (!center) {
			toast.error(message, {
				position: toast.POSITION.TOP_RIGHT,
				toastId: message
			});
		}
	}
};

export default ShowToast;

