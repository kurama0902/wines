import React from "react";
import { DropdownArrowSVG } from "../DropdownArrowSVG";

import './sort.css'

export const SortDropdown = () => {
    return (
        <div className="sort-by-wrap">
            <label className="sort-by-label" htmlFor="sort-by">Sort by</label>
            <select id="sort-by" className="sort-by">
                <option value="1">Relevance</option>
                <option value="0">По спаданню</option>
            </select>
            <div className="arrow">
                <DropdownArrowSVG />
            </div>
        </div>
    )
}