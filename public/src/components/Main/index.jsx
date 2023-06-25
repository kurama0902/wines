import React from "react";
import { MainSlider } from "./MainSlider";
import { FilterAndSortSection } from "./FilterAndSortSection";
import { Brands } from "./Brands";
import { ProductsSection } from "./ProductsSection";

import './main.css'

export const Main = () => {
    return (
        <main className="main">
            <MainSlider/>
            <Brands/>
            <FilterAndSortSection/>
            <ProductsSection/>
        </main>
    )
}