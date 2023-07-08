import React from "react";

import './filter.css';
import { FilterSVG } from "../../../shared/SVG/FilterSVG";


export const FilterPopup = () => {
    return (
        <button className="filter-btn">
            <FilterSVG/>
            <p>Filter</p>
        </button>
    )
}