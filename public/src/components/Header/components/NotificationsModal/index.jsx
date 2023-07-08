import React from "react";

import './notifications-modal.css'

export const NotificationsModal = ({ display, closeModal }) => {
    return (
        <div className="modal-wrap" style={{ display: display }}>
            <div className="close-area" onClick={closeModal} style={{ display: display }}></div>
            <div className="notifications-modal" style={{ display: display }}>
                <div className="notifications-info-wrap">

                </div>
            </div>
        </div>
    )
}