import { useCallback, useEffect, useState } from 'react';

export const useGetWine = (id) => {
	const [data, setData] = useState();

	const getData = useCallback(async () => {
		try {
			let res = await fetch(`http://localhost:3010/api/getWine/${id}`);
			let wines = await res.json();
			setData(wines);
		} catch (error) {
			console.error('Error');
		}
	}, [id]);

	useEffect(() => {
		getData();
	}, [getData, id]);

	return data;
};
