import React, { useState } from "react";
import { UserSVG } from "../UserSVG";

import './user-popup.css'

export const UserPopup = () => {

    let [display, setDisplay] = useState('none');

    const handleUsersPopup = () => {
        if(display === 'flex') {
            setDisplay('none');
        } else {
            setDisplay('flex');
        }
    }

    return (
        <div className="user-btn-wrap">
            <button className="user-btn" onClick={handleUsersPopup}>
                <UserSVG />
            </button>
            <div className="user-popup-wrap" style={{display: display}}>
                <button className="user-page-btn">User's Page</button>
                <button className="login-btn">Login</button>
            </div>
        </div>
    )
}