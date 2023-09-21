import React from 'react';
import { Menu } from './components/Menu';
import { SearchField } from './components/SearchField';
import { LikesPopup } from './components/LikesPopup';
import { MenuModel } from '../../shared/consts';
import { NotificationsPopup } from './components/NotificactionsPopup';
import { UserPopup } from './components/UserPopup';
import { BagLink } from './components/BagLink';
import { Link } from 'react-router-dom';

import './Header.css';

export const Header = ({ likedAmount, busketAmount, updateLikedWines }) => {
	return (
		<header className="header-wrap">
			<div className="first-section">
				<div className="left-side">
					<div className="logo">
						<Link className="logo-link" to="/">
							JustWine
						</Link>
					</div>
					<Menu menuLinks={MenuModel} />
				</div>
				<div className="right-side">
					<SearchField placehoder="Search wine..." />
					<LikesPopup updateLikedWines={updateLikedWines} likedAmount={likedAmount} />
					<NotificationsPopup />
					<BagLink busketAmount={busketAmount} />
					<UserPopup />
				</div>
			</div>
			<div className="second-section">
				<SearchField placehoder="Search wine..." />
			</div>
		</header>
	);
};
