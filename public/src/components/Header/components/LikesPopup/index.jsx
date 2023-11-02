import { useContext } from 'react';
import { LikedModal } from '../LikedModal';
import { HeaderHeartSVG } from '../../../../shared/SVG/HeaderHeartSVG';
import { LikedProductsContext } from '../../../../context/likedProductsContext';
import { Counter } from '../../../../shared/components/Counter';

import './likesPopup.css';

export const LikesPopup = ({ likedAmount, updateLikedWines }) => {
	let { isActive, setIsActive } = useContext(LikedProductsContext);

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
			{isActive && (
				<LikedModal
					updateLikedWines={updateLikedWines}
					isActive={isActive}
					closeModal={closeModal}
				/>
			)}
		</div>
	);
};
