import React, { useState } from "react";

import { NotificationsSVG } from "../../../../shared/SVG/NotificationsSVG";
import { NotificationsModal } from "../NotificationsModal";
// import { Counter } from "../../../../shared/components/Counter";

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
                {/* <Counter/> */}
            </button>
            <NotificationsModal display={display} closeModal={closeModal} />
        </div>
    )
}