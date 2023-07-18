import React from "react";

import './counter.css'

export const Counter = ({amount}) => {
    return (
        <div className="counter">{amount}</div>
    )
}