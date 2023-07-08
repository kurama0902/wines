import React from "react";
import { MainSlider } from "./MainSlider";
import { FilterAndSortSection } from "./FilterAndSortSection";
import { Brands } from "./Brands";
import { ProductsSection } from "./ProductsSection";
import { ProductsSectionNewSale } from "./ProductsSectionNewSale";
import { ProductsSectionPremiumWines } from "./ProductsSectionPremiumWines";

import './main.css'

export const Main = () => {
    return (
        <main className="main">
            <MainSlider/>
            <Brands/>
            <FilterAndSortSection sectionName='popularWines'/>
            <ProductsSection/>
            <FilterAndSortSection sectionName='winesNewSale'/>
            <ProductsSectionNewSale />
            <FilterAndSortSection sectionName='premiumwines'/>
            <ProductsSectionPremiumWines />
        </main>
    )
}