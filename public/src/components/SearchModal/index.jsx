import React, { useState } from "react";
import { SearchedProductsPopup } from '../Header/components/SearchedProductsPopup'
import { searchInfo } from "../../functions/searchInfo";

import './searchModal.css'

export const SearchModal = ({isShowSearchModal, closeModal}) => {

    const [searchedProducts, setSearchedProducts] = useState([]);

    return (
        <div className="search-modal">
            <div onClick={() => closeModal(!isShowSearchModal)} className="close-wrap"></div>
            <div className="search-wrap-container">
                <input onChange={(e) => searchInfo(e, setSearchedProducts)} placeholder="Search wine..." className="mob-search" type="text" />
                <SearchedProductsPopup searchedProducts={searchedProducts} />
            </div>
        </div>
    )
}