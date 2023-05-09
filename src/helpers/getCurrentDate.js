export const getCurrentDate = () => {
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
	const hour = date.getHours();
	const minute = date.getMinutes();
	const ampm = hour >= 12 ? 'PM' : 'AM';
	const formattedTime =
		monthName +
		' ' +
		day +
		', ' +
		year +
		' at ' +
		hour +
		':' +
		(minute < 10 ? '0' + minute : minute) +
		ampm;
	return formattedTime;
};
