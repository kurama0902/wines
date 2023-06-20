import React from "react";
import "./liked-modal.css";

export const LikedModal = ({display, closeModal}) => {

    return (
        <div className="liked-modal-wrap" onClick={closeModal} style={{display: display}}>
            <div className="liked-modal">
                <div className="liked-info-wrap">

                </div>
            </div>
        </div>
    )
}