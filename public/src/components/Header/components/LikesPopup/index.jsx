import { useState } from 'react';
import { LikedModal } from '../LikedModal';
import { HeaderHeartSVG } from '../../../../shared/SVG/HeaderHeartSVG';
import { Counter } from '../../../../shared/components/Counter';

import './likesPopup.css';

export const LikesPopup = ({ likedAmount }) => {
	let [isActive, setIsActive] = useState(false);

	const handleOpenPopup = () => {
		setIsActive(true);
	};

	const closeModal = () => {
		setIsActive(false);
	};

	return (
		<div className="liked-items-btn-wrap">
			<button className="liked-items-btn" onClick={handleOpenPopup}>
				<HeaderHeartSVG />
				{likedAmount > 0 && <Counter amount={likedAmount} />}
			</button>
			<LikedModal isActive={isActive} closeModal={closeModal} />
		</div>
	);
};
