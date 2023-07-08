import { useState } from 'react';
import { LikedModal } from '../LikedModal';
import { HeaderHeartSVG } from '../../../../shared/SVG/HeaderHeartSVG';
// import { Counter } from '../../../../shared/components/Counter';

import './likesPopup.css';

export const LikesPopup = () => {

	let [display, setDisplay] = useState('none');

	const handleOpenPopup = () => {
		setDisplay('flex');
	};

	const closeModal = () => {
		setDisplay('none');
	}

	return (
		<div className="liked-items-btn-wrap">
			<button className="liked-items-btn" onClick={handleOpenPopup}>
				<HeaderHeartSVG />
				{/* <Counter /> */}
			</button>
			<LikedModal display={display} closeModal={closeModal} />
		</div>
	);
};
