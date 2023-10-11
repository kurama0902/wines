import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllWines } from '../../shared/hooks/useGetAllWines'

import './all-wines.css'

export const AllWines = () => {

    const allWines = useGetAllWines();
    const [winesList, setWinesList] = useState(allWines);
    const [range, setRange] = useState([0, 8])

    function changeRange(number) {
        if(number > 1) {
            setRange([8 * number, 8 * number * number])
        } else {
            setRange([0, 8])
        }
    }

    function changeToPreviousState(number) {
        
    }

    function generatePageNumbers() {
        const pageNums = [];

        for(let i = 0; i < Math.trunc(winesList.length / 8); i++) {
            pageNums.push(i + 1);
        }

        return pageNums;
    }

    useEffect(() => {
        setWinesList(allWines);
    }, [allWines])

    return (
        <div className="all-wines-wrap">
            <h1 className="wines-list-label">Wines list:</h1>
            <div className="all-wines-section">
                {winesList?.slice(range[0], range[1]).map((wine) => {
                return <Link key={wine.id} className="wine-wrap">
                    <img className="wine-img" src={wine.imgURL} alt="" />
                    <p className="wine-name">{wine.description}</p>
                </Link>
                })}
            </div>
            <div className="wines-pagination">
                <button className="previous-btn">Previous</button>
                <div className="pagination-numbers">
                    {generatePageNumbers().map(number => {
                        return <button onClick={() => changeRange(number)} className="page-number">{number}</button>
                    })}
                </div>
                <button className="next-btn">Next</button>
            </div>
        </div>
    )

}