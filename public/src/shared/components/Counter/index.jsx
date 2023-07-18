import React from "react";

import './counter.css'

export const Counter = ({amount, display}) => {
    return (
        <div style={{display: display}} className="counter">{amount}</div>
    )
}