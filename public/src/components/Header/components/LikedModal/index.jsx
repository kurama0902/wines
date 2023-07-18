import React from 'react';

import './liked-modal.css';

export const LikedModal = ({ isActive, closeModal }) => {
	return (
		<div className={`modal-wrap ${isActive && 'active'}`}>
			<div className="close-area" onClick={closeModal}></div>
			<div className="liked-modal">
				<div className="liked-info-wrap"></div>
			</div>
		</div>
	);
};
