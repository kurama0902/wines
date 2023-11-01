import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LikedProductsContext } from "../../context/likedProductsContext";
import { LikedModal } from "../Header/components/LikedModal";

import './mobile-nav.css'

export const MobileNavigation = () => {

    let [likedProductsIDs, setAmount, isActive, setIsActive] = useContext(LikedProductsContext);

    return (
        <div className="mobile-nav-wrap">
            <div className="mobile-nav">
                <Link to={'/'} className="mob-nav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M9.90002 22V12H15.9V22M3.90002 9L12.9 2L21.9 9V20C21.9 21.1046 21.0046 22 19.9 22H5.90002C4.79545 22 3.90002 21.1046 3.90002 20V9Z" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </Link>
                <button className="mob-nav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M3.70007 3H10.7001V10H3.70007V3Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.7001 3H21.7001V10H14.7001V3Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.7001 14H21.7001V21H14.7001V14Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.70007 14H10.7001V21H3.70007V14Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button className="mob-nav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M21.5 21L17.15 16.65M11.5 19C15.9183 19 19.5 15.4183 19.5 11C19.5 6.58172 15.9183 3 11.5 3C7.08172 3 3.5 6.58172 3.5 11C3.5 15.4183 7.08172 19 11.5 19Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button onClick={() => setIsActive(!isActive)} className="mob-nav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.14 4.61012C20.1085 3.57811 18.7092 2.99829 17.25 2.99829C15.7909 2.99829 14.3916 3.57811 13.36 4.61012L12.3 5.67012L11.24 4.61012C9.09166 2.46173 5.60843 2.46173 3.46005 4.61012C1.31166 6.7585 1.31166 10.2417 3.46005 12.3901L12.3 21.2301L21.14 12.3901C22.1721 11.3586 22.7519 9.95925 22.7519 8.50012C22.7519 7.04098 22.1721 5.64164 21.14 4.61012Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button className="mob-nav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M20.1 21V19C20.1 16.7909 18.3091 15 16.1 15H8.09998C5.89084 15 4.09998 16.7909 4.09998 19V21M12.1 11C14.3091 11 16.1 9.20914 16.1 7C16.1 4.79086 14.3091 3 12.1 3C9.89084 3 8.09998 4.79086 8.09998 7C8.09998 9.20914 9.89084 11 12.1 11Z" stroke="#434960" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            {isActive && <LikedModal updateLikedWines={setAmount} closeModal={() => setIsActive(!isActive)} />}
        </div>
    )
}