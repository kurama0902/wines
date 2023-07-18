import React from "react";
import { Menu } from "./components/Menu";
import { SearchField } from "./components/SearchField";
import { LikesPopup } from "./components/LikesPopup";
import { MenuModel } from "../../shared/consts";
import { NotificationsPopup } from "./components/NotificactionsPopup";
import { UserPopup } from "./components/UserPopup";
import { BagLink } from "./components/BagLink";

import "./Header.css";


export const Header = ({likedAmount, busketAmount}) => {
  return (
    <header className="header-wrap">
      <div className="first-section">
        <div className="left-side">
          <div className="logo">
            <a className="logo-link" href="/">JustWine</a>
          </div>
          <Menu menuLinks={MenuModel} />
        </div>
        <div className="right-side">
          <SearchField placehoder='Search wine...' />
          <LikesPopup likedAmount={likedAmount} />
          <NotificationsPopup />
          <BagLink busketAmount={busketAmount}/>
          <UserPopup />
        </div>
      </div>
      <div className="second-section">
        <SearchField placehoder='Search wine...' />
      </div>
    </header>
  );
};
