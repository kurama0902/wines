import { useEffect, useState } from 'react';

export const useRequestProductsInfo = () => {
	const productsIDs = localStorage.getItem('addedToBusketIDs');
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const res = await fetch('http://127.0.0.1:3010/api/shopping-bag', {
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
