import React, { useState } from "react";
import { AboutUsModal } from "../AboutUsModal";

import './about-us.css'

export const AboutUsSection = () => {
    let [flag, setFlag] = useState(false);

    const changeVisibility = () => {
        setFlag(!flag)
    }

    return (
        <div className="about-us-section" id="about-us">
            <h3 className="about-label">About us</h3>
            <div className="about-us-info">
                <p>We are started from 2000</p>
                <p>We are in many countries</p>
                <p>So many kinds of wines</p>
                <p onClick={changeVisibility} className="learn-more">Learn more...</p>
            </div>

            {flag ? <AboutUsModal flag={flag} setFlag={setFlag} /> : <></>}
        </div>
    )
}