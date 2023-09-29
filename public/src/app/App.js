import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ScrollContext } from '../context/scrollContext';
import { useState } from 'react';
import cn from 'classnames';

import './App.css';

function App() {
	const [isScrollAble, setIsScrollAble] = useState(true);

	const components = useRoutes(routes);

	const classNames = cn('App', {
		'on-scroll': isScrollAble,
		'off-scrolll': !isScrollAble,
	});

	return (
		<div className={classNames} id="root">
			<ScrollContext.Provider value={setIsScrollAble}>{components}</ScrollContext.Provider>
		</div>
	);
}

export default App;
