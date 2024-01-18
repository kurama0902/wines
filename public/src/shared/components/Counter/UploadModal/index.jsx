import React, { useState } from "react";

import './upload-modal.css'

export const UploadModal = ({visibility, setVisibility}) => {

    const [value, setValue] = useState(null);

    return (
        <div className="upload-modal">
            <div onClick={() => setVisibility(!visibility)} className="close-bg"></div>
            <div className="upload-picture">
                <label className="f-label" htmlFor="f-input">{value || "Drag or choose"}</label>
                <input onChange={(e) => {
                    const fileName = e.target.value.split('\\');
                    setValue(fileName[fileName.length - 1]);

                }} id="f-input" className="file-input" type="file" />
                <button className="update-picture-btn">Update picture</button>
            </div>
        </div>
    )
}