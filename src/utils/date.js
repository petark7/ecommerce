import { format } from 'date-fns';

export const getFormattedDate = date => {
	if (date) {
		return format(new Date(date), 'M/d/yyyy HH:mm');
	}

	return null;
};
