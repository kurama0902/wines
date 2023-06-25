import React from "react";
import "./liked-modal.css";

export const LikedModal = ({ display, closeModal }) => {

    return (
        <div className="modal-wrap" style={{display: display}}>
            <div className="close-area" onClick={closeModal} style={{ display: display }}></div>
            <div className="liked-modal" style={{ display: display }}>
                <div className="liked-info-wrap">

                </div>
            </div>
        </div>
    )
}