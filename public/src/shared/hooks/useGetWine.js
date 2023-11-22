import { useCallback, useEffect, useState } from 'react';
import { API } from '../API';

export const useGetWine = (id) => {
	const [data, setData] = useState();

	const getData = useCallback(async () => {
		try {
			let res = await fetch(`${API}api/getWine/${id}`);
			let wines = await res.json();
			setData(wines);
		} catch (error) {
			console.error('Error');
		}
	}, [id]);

	useEffect(() => {
		getData();
	}, [getData, id]);

	// console.log(data);
	return data;
};
