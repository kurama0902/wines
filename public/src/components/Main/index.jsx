import React from "react";
import { MainSlider } from "./MainSlider";
import { FilterAndSortSection } from "./FilterAndSortSection";
import { Brands } from "./Brands";
import { ProductsSection } from "./ProductsSection";
import { ProductsSectionNewSale } from "./ProductsSectionNewSale";
import { ProductsSectionPremiumWines } from "./ProductsSectionPremiumWines";

import './main.css'

export const Main = ({likedProductsIDs, setAmount, busketProductsIDs, setBusketAmount}) => {
    return (
        <main className="main">
            <MainSlider/>
            <Brands/>
            <FilterAndSortSection sectionName='popularWines'/>
            <ProductsSection likedProductsIDs={likedProductsIDs} setAmount={setAmount} busketProductsIDs={busketProductsIDs} setBusketAmount={setBusketAmount}/>
            <FilterAndSortSection sectionName='winesNewSale'/>
            <ProductsSectionNewSale />
            <FilterAndSortSection sectionName='premiumwines'/>
            <ProductsSectionPremiumWines />
        </main>
    )
}