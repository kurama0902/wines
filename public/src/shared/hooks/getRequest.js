import { useEffect, useState } from 'react';

export const useGetRequest = (name) => {
	const [data, setData] = useState([]);

	 async function getData () {
		try {
			let res = await fetch(`http://localhost:3010/api/${name}`, {
				method: 'GET',
			});
			let json = await res.json();
			setData(json);
		} catch (error) {
			console.error(`${name} ERROR`,error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return data
};