import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllWines } from "../../shared/hooks/useGetAllWines";

import './wine-page.css'

export const WinePage = () => {

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const wineID = params.get('id');

    const allProducts = useGetAllWines();
    const [wine, setWine] = useState([]);

    useEffect(() => {
        setWine(allProducts?.find(wine => wine.id === +wineID))
    }, [allProducts])

    console.log(wine);

    return (
        <div className="wine-description-wrap">
            <div className="wine-description">
                <img className="wine-picture" src={`${wine?.imgURL}`} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum non consectetur neque architecto corporis velit suscipit tempore laboriosam dolor magnam, placeat, deleniti dolore quo. Voluptate eius corrupti ducimus. Nemo, excepturi!</p>
            </div>
        </div>
    )
}