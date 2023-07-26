import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';

import './user-popup.css';

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);

	const handleUsersPopup = () => {
		setDisplay((prevState) => {
			return !prevState;
		});
	};

	return (
		<div className="user-btn-wrap">
			<button className="user-btn" onClick={handleUsersPopup}>
				<UserSVG />
			</button>
			{display && (
				<>
					<div className="back" onClick={handleUsersPopup}></div>

					<div className="user-popup-wrap">
						<button className="user-page-btn">User's Page</button>
						<button className="login-btn">Login</button>
					</div>
				</>
			)}
		</div>
	);
};
