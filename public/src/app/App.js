import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { UserContext } from '../context/userContext';
import { useState } from 'react';

import './App.css';

function App() {
	const [user, setUser] = useState({
		name: 'Alex'
	});

	const components = useRoutes(routes);

	return (
		<div className="App">
			<UserContext.Provider value={[user, setUser]}>{components}</UserContext.Provider>
		</div>
	);
}

export default App;
