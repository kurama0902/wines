import { useEffect, useState } from 'react';

export const WindowSizeContainer = ({ children }) => {
	const [width, setWidth] = useState(window.innerWidth);

	const getWidth = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', getWidth);

		return () => {
			window.removeEventListener('resize', getWidth);
		};
	}, []);

	return children(width);
};
