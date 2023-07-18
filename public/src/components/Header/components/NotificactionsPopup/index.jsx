import React, { useState } from "react";

import { NotificationsSVG } from "../../../../shared/SVG/NotificationsSVG";
import { NotificationsModal } from "../NotificationsModal";

import './notifications-popup.css';

export const NotificationsPopup = () => {

    let [display, setDisplay] = useState('none');

    const openModal = () => {
        setDisplay('flex')
    }

    const closeModal = (e) => {
        if (e.target.className !== 'notifications-info-wrap') {
            setDisplay('none')
        }
    }

    return (
        <div>
            <button onClick={openModal} className="notifications">
                <NotificationsSVG />
                
            </button>
            <NotificationsModal display={display} closeModal={closeModal} />
        </div>
    )
}