import React from "react";

import './brand.css'

export const Brand = ({brands}) => {


    const {name, img} = brands;

    return (
        <div className={`country-brand ${name}`}>
            <img className="country-img" src={img} alt="" />
            <h3>{name}</h3>
        </div>
    )
}