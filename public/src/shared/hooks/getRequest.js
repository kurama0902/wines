import { useEffect, useState } from 'react';
import { API } from '../API';

export const useGetRequest = (name) => {
	const [data, setData] = useState([]);

	 async function getData () {
		try {
			let res = await fetch(`${API}api/${name}`, {
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