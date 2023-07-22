import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

import './App.css';

function App() {
	const components = useRoutes(routes);

	return (
		<div className="App">
			{components}
		</div>
	);
}

export default App;
