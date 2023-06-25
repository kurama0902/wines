import { useEffect, useState } from 'react';

export const useGetRequest = (name) => {
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			let res = await fetch(`http://localhost:3010/api/${name}`, {
				method: 'GET',
			});
			let json = await res.json();
			setData(json);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return data
};
