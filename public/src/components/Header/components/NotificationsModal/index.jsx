import React from "react";

import './notifications-modal.css'

export const NotificationsModal = ({display, closeModal}) => {
    return (
        <div className="notifications-modal-wrap" onClick={closeModal} style={{display: display}}>
            <div className="notifications-modal">
                <div className="notifications-info-wrap">

                </div>
            </div>
        </div>
    )
}