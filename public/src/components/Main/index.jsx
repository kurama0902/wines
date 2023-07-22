import React from "react";
import { MainSlider } from "./MainSlider";
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
            <ProductsSection likedProductsIDs={likedProductsIDs} setAmount={setAmount} busketProductsIDs={busketProductsIDs} setBusketAmount={setBusketAmount}/>
            <ProductsSectionNewSale />
            <ProductsSectionPremiumWines />
        </main>
    )
}