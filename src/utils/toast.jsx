import { toast } from 'react-toastify';

export const ShowToast = (message, options) => {
    const toastType = options.success ? toast.success : toast.error;
    const position = options.position ? options.position : toast.POSITION.TOP_CENTER;

	console.log (options.success, position);
    toastType(message, {
        position,
        toastId: message
    });
};

export default ShowToast;