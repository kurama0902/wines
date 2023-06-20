import React from "react";

import './bag-link.css'
import { BagSVG } from "../BagSVG";

export const BagLink = () => {
    return (
        <a className="bag-link" href="/shopping-bag">
            <BagSVG/>
        </a>
    )
}