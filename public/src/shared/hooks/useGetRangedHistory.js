import { useCallback, useEffect, useState } from 'react';

export const useGetRangedHistory = (pageNum, email) => {
	const [data, setData] = useState();

	const getData = useCallback(async () => {
		try {
			let res = await fetch('http://localhost:3010/api/getRangedHistory', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ page: pageNum, email: email}),
			});

			let wines = await res.json();
			setData(wines);
		} catch (error) {
			console.error('Error');
		}
	}, [email, pageNum]);

	useEffect(() => {
		getData();
	}, [getData, pageNum]);

	return [data, setData];
};
