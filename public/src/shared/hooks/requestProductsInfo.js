import { useEffect, useState } from 'react';

export const useRequestProductsInfo = (name) => {
	const productsIDs = localStorage.getItem(name);
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const res = await fetch(`http://127.0.0.1:3010/api/getDataArray`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: productsIDs,
			});
	
			const productsInfo = await res.json();
			setData(productsInfo);
		} catch (error) {
			console.error('Error', error);
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return data;
};
