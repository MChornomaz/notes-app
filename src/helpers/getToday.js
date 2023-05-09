export const getToday = () => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const date = new Date();
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	const formattedTime = monthName + ' ' + day + ', ' + year;
	return formattedTime;
};
