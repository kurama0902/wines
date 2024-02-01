import React from "react";
import { AnimatedLoading } from "../../../SVG/AnimatedLoading";


import './preloader.css'

export const Preloader = () => {
    return (
        <div className="preloader-wrap">
            <h1>Just Wines</h1>
            <AnimatedLoading />
        </div>
    )
}