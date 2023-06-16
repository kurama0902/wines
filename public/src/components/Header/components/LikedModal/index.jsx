import React, { useState } from "react";
import "./liked-modal.css";

export const LikedModal = ({display, changeToNoneState}) => {

    let [displayNone, setDisplayNone] = useState('flex');

    function closeModal() {
        setDisplayNone('none');
        changeToNoneState();
    }

    return (
        <div className="liked-modal-wrap" onClick={closeModal} style={(displayNone == 'none') ? {display: displayNone} : {display: display}}>
            <div className="liked-modal">
                <div className="liked-info-wrap">

                </div>
            </div>
        </div>
    )
}