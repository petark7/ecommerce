import { toast } from 'react-toastify';

export const ShowToast = (message, options) => {
    const toastType = options.success ? toast.success : toast.error;
    const position = options.position ? options.position : toast.POSITION.TOP_CENTER;

    toastType(message, {
        position
    });
};

export default ShowToast;