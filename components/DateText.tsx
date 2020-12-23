const DateText: React.FC<{ date: string }> = function ({ date }) {
	const format = new Date(date).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return <time dateTime={date}>{format}</time>;
};

export default DateText;
