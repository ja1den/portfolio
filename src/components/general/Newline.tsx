import React, { Fragment } from 'react';

const Newline: React.FunctionComponent = ({ children }) => {
	return (
		<>
			{React.Children.map(children, (child, i) => {
				if (typeof child === 'string') {
					const split = child.split('\n');
					return split.map((line, index) => (
						<Fragment key={index}>
							{line}
							{index < split.length && <br />}
						</Fragment>
					));
				}
				return child;
			})}
		</>
	);
};

export default Newline;
