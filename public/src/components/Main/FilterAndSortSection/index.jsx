import React from "react";
import { FilterPopup } from "../FilterPopup";
import { SortDropdown } from "../SortDropdown";

import './filter-and-sort-section.css'

export const FilterAndSortSection = () => {
    return (
        <section className="filter-and-sort-section">
            <FilterPopup/>
            <SortDropdown/>
        </section>
    )
}