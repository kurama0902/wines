import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';
import { LoginModal } from '../LoginModal';

import './user-popup.css';

const isLogined = localStorage.getItem('auth');

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);
	let [isUserLogined, setIsUserLogined] = useState(false);
	let [loginModalDisplay, setLoginModalDisplay] = useState(false);
	let [loginLogoutText, setLoginLogout] = useState(isLogined ? 'Log out' : 'Login');

	const handleUsersPopup = () => {
		setDisplay((prevState) => {
			return !prevState;
		});
	};

	const handleLoginBgClick = () => {
		setLoginModalDisplay((prevState) => !prevState);
	};

	const Logout = () => {
		document.cookie =
			'user=creepysimbaplay@gmail.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		localStorage.removeItem('user');
		// window.location.reload(false);
	};

	return (
		<>
			<div className="user-btn-wrap">
				<button className="user-btn" onClick={handleUsersPopup}>
					<UserSVG />
				</button>
				{display && (
					<>
						<div className="back" onClick={handleUsersPopup}></div>

						<div className="user-popup-wrap">
							<a
								href="/user-page"
								className={`user-page-link ${loginLogoutText === 'Login' ? 'user-link-hide' : ''}`}
							>
								User's Page
							</a>
							{isUserLogined && (
								<button onClick={Logout} className="login-btn">
									Logout
								</button>
							)}
							{!isUserLogined && (
								<button onClick={handleLoginBgClick} className="login-btn">
									Login
								</button>
							)}
						</div>
					</>
				)}
			</div>
			{loginModalDisplay && (
				<LoginModal
					display={{ loginModalDisplay, handleLoginBgClick }}
					isUserLogined={isUserLogined}
					setUserLogin={setIsUserLogined}
				/>
			)}
		</>
	);
};
