import { useState } from 'react';
import { LikedModal } from '../LikedModal';
import { HeaderHeartSVG } from '../../../../shared/SVG/HeaderHeartSVG';

import './likesPopup.css';
import { Counter } from '../../../../shared/components/Counter';

export const LikesPopup = ({likedAmount, likedAmountDisplay}) => {

	let [display, setDisplay] = useState('none');

	const handleOpenPopup = () => {
		setDisplay('flex');
		/////////////////////////////////////////////
	};

	const closeModal = () => {
		setDisplay('none');
	}

	return (
		<div className="liked-items-btn-wrap">
			<button className="liked-items-btn" onClick={handleOpenPopup}>
				<HeaderHeartSVG />
				<Counter amount={likedAmount} display={likedAmountDisplay}/>
			</button>
			<LikedModal display={display} closeModal={closeModal} />
		</div>
	);
};
