import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetWine } from '../../shared/hooks/useGetWine';

import './wine-page.css';

export const WinePage = () => {
	let [searchParams] = useSearchParams();

	const wineID = searchParams.get('id');

	const wine = useGetWine(wineID);

	if (!wine) {
		return 'Sorry but this wine is not avaliable!';
	}
	return (
		<div className="wine-description-wrap">
			<div className="wine-description">
				<img className="wine-picture" src={`${wine?.imgURL}`} alt="" />
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum non consectetur neque
					architecto corporis velit suscipit tempore laboriosam dolor magnam, placeat, deleniti
					dolore quo. Voluptate eius corrupti ducimus. Nemo, excepturi!
				</p>
			</div>
		</div>
	);
};
