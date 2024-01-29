import { useCallback, useEffect, useState } from 'react';

export const useGetRangedWines = (pageNum) => {
	const [data, setData] = useState();

	const getData = useCallback(async () => {
		try {
			let res = await fetch('http://localhost:3010/api/getRangedWines', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ page: pageNum }),
			});
			let wines = await res.json();
			setData(wines);
		} catch (error) {
			console.error('Error');
		}
	}, [pageNum]);

	useEffect(() => {
		getData();
	}, [getData, pageNum]);

	return {data, setData};
};
