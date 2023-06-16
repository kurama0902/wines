import React from "react";
import { Menu } from "./components/Menu";
import { SearchField } from "./components/SearchField";
import { LikesPopup } from "./components/LikesPopup";

import { MenuModel } from "../../shared/consts";

import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="left-side">
        <div className="logo">
          <a className="logo-link" href="/">JustWine</a>
        </div>
        <Menu menuLinks={MenuModel} />
      </div>
      <div className="right-side">
        <SearchField placehoder='Search wine...' />
        <LikesPopup />
      </div>
    </header>
  );
};
