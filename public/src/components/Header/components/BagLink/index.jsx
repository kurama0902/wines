import React from "react";

import { BagSVG } from "../../../../shared/SVG/BagSVG";
// import { Counter } from "../../../../shared/components/Counter";

import './bag-link.css'
import { Counter } from "../../../../shared/components/Counter";

export const BagLink = ({busketAmount, busketAmountDisplay}) => {
    return (
        <a className="bag-link" href="/shopping-bag">
            <BagSVG />
            <Counter amount={busketAmount} display={busketAmountDisplay}/>
        </a>
    )
}