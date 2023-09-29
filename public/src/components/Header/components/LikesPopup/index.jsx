import { useContext, useState } from 'react';
import { LikedModal } from '../LikedModal';
import { HeaderHeartSVG } from '../../../../shared/SVG/HeaderHeartSVG';
import { ScrollContext } from '../../../../context/scrollContext';
import { Counter } from '../../../../shared/components/Counter';

import './likesPopup.css';

export const LikesPopup = ({ likedAmount, updateLikedWines }) => {
	let [isActive, setIsActive] = useState(false);
	let setIsScrollAble = useContext(ScrollContext);

	const handleOpenPopup = () => {
		setIsActive(true);
		setIsScrollAble(false);
	};

	const closeModal = () => {
		setIsActive(false);
		setIsScrollAble(true);
	};

	return (
		<div className="liked-items-btn-wrap">
			<button className="liked-items-btn" onClick={handleOpenPopup}>
				<HeaderHeartSVG />
				{likedAmount > 0 && <Counter amount={likedAmount} />}
			</button>
			{isActive && <LikedModal updateLikedWines={updateLikedWines} isActive={isActive} closeModal={closeModal} />}
		</div>
	);
};
