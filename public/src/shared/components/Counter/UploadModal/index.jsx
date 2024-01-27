import React, { useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../../../redux/actions/authActions";

import './upload-modal.css'

export const UploadModal = ({flag, setFlag, visibility, setVisibility}) => {

    const [value, setValue] = useState(null);
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();

    const { user } = useSelector((state) => ({
        user: state.auth.user,
    }));


    return (
        <div className="upload-modal">
            <div onClick={() => setVisibility(!visibility)} className="close-bg"></div>
            <div className="upload-picture">
                <label className="f-label" htmlFor="f-input">{value || "Choose"}</label>
                <input onChange={(e) => {
                    const fileName = e.target.value.split('\\');
                    setValue(fileName[fileName.length - 1]);
                    setFile(e.target.files[0])
                }} id="f-input" className="file-input" type="file" />
                <button onClick={() => {
                    const formData = new FormData();

                    formData.append('avatar', file);
                    formData.append('email', user.email)

                    try {
                        setFlag(true)
                        axios.post('http://localhost:3010/api/updatePhoto', formData)
                            .then(res => {
                                dispatch(saveUser({...user, imgURL: res.data}))
                                setFlag(false)
                            })                                    
                    } catch (error) {
                        console.log("AXIOS ERROR", error);
                    }

                    setVisibility(!visibility)
                    
                }} className="update-picture-btn">Update picture</button>
            </div>
        </div>
    )
}