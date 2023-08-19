import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ScrollContext } from '../context/userContext';
import { useState } from 'react';

import './App.css';

function App() {
	const [isScrollAble, setIsScrollAble] = useState(true)

	const components = useRoutes(routes);

	return (
		<div className={`App ${isScrollAble ? 'on-scroll' : 'off-scroll'}`}>
			<ScrollContext.Provider value={setIsScrollAble}>{components}</ScrollContext.Provider>
		</div>
	);
}

export default App;
