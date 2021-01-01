const DateText: React.FC<{ date: string }> = function ({ date }) {
	const string = new Date(date).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return <time dateTime={date}>{string}</time>;
};

export default DateText;
