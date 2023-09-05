export const sortOrders = (orders, sortBy) => {
	const ordersCopy = [...orders]; // Create a copy of the array
	return ordersCopy.sort((a, b) => {
		switch (sortBy) {
			case 'date': {
				return new Date(b.createdAt) - new Date(a.createdAt);
			}

			case 'total': {
				return Number(b.total) - Number(a.total);
			}

			case 'quantity': {
				return b.cart.length - a.cart.length;
			}

			default: {
				return 0;
			}
		}
	});
};

export const getItemQuantity = cart => {
	const totalQuantity = cart.reduce((accumulator, item) => accumulator + item.amount, 0);
	return totalQuantity;
};
