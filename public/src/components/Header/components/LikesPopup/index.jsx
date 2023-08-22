import { useContext, useState } from 'react';
import { LikedModal } from '../LikedModal';
import { HeaderHeartSVG } from '../../../../shared/SVG/HeaderHeartSVG';
import { ScrollContext } from '../../../../context/userContext';
import { Counter } from '../../../../shared/components/Counter';

import './likesPopup.css';
import { useRequestProductsInfo } from '../../../../shared/hooks/requestProductsInfo';

export const LikesPopup = ({ likedAmount }) => {
	let [isActive, setIsActive] = useState(false);
	let setIsScrollAble = useContext(ScrollContext)

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
			<LikedModal isActive={isActive} closeModal={closeModal} />
		</div>
	);
};
