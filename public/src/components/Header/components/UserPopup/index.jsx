import React, { useState } from 'react';
import { UserSVG } from '../../../../shared/SVG/UserSVG';
import { LoginModal } from '../LoginModal';

import './user-popup.css';

export const UserPopup = () => {
	let [display, setDisplay] = useState(false);
	let [loginModalDisplay, setLoginModalDisplay] = useState(false);
	let [loginLogoutText, setLoginLogout] = useState(!document.cookie.includes('user') ? 'Login' : 'Log out');

	const handleUsersPopup = () => {
		setDisplay((prevState) => {
			return !prevState;
		});
	};

	const handleLoginBgClick = () => {
		setLoginModalDisplay((prevState) => {
			return !prevState;
		});
	};

	const Logout = () => {
		document.cookie = "user=creepysimbaplay@gmail.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload(false);
	}

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
						<a href='/user-page' className={`user-page-link ${loginLogoutText === 'Login' ? 'user-link-hide' : ''}`}>User's Page</a>
						<button onClick={loginLogoutText === 'Login' ? handleLoginBgClick : Logout} className="login-btn">{loginLogoutText}</button>
					</div>
				</>
			)}
		</div>
		<LoginModal display={{loginModalDisplay, handleLoginBgClick}} setLoginLogout={setLoginLogout}/>
	
		</>
	);
};
