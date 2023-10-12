import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllWines } from '../../shared/hooks/useGetAllWines'

import './all-wines.css'

export const AllWines = () => {

    const allWines = useGetAllWines();
    const [winesList, setWinesList] = useState(allWines);
    const [pageNumber, setPageNumber] = useState(1);
    const [range, setRange] = useState([0, 8]);

    function changeRange(number, pageNumber) {
        if(number !== pageNumber) {
            setPageNumber(number);
            setRange([8 * number - 8, 8 * number])
        }
    }

    function changeToPreviousState() {
        if(range[0] !== 0) {
            setRange([range[0] - 8, range[1] - 8]);
            setPageNumber(pageNumber - 1);
        }
    }

    function changeToNextState() {
        if(range[1] < winesList?.length) {
            setRange([range[0] + 8, range[1] + 8]);
            setPageNumber(pageNumber + 1);
        }
    }

    function generatePageBtns() {
        const pageNums = [];

        for(let i = 0; i < Math.ceil(winesList?.length / 8); i++) {
            pageNums.push(i + 1);
        }

        return pageNums.map(number => {
            return <button key={number} onClick={() => {changeRange(number, pageNumber)}} className={`page-number ${pageNumber === number ? 'border-active': ''}`}>{number}</button>
        });
    }
    

    useEffect(() => {
        setWinesList(allWines);
    }, [allWines])

    return (
        <div className="all-wines-wrap">
            <h1 className="wines-list-label">Wines list:</h1>
            <div className="all-wines-section">
                {winesList?.slice(range[0], range[1]).map((wine) => {
                return <Link to={`/wine?id=${wine.id}`} key={wine.id} className="wine-wrap">
                    <img className="wine-img" src={wine.imgURL} alt="" />
                    <p className="wine-name">{wine.description}</p>
                </Link>
                })}
            </div>
            <div className="wines-pagination">
                <button onClick={changeToPreviousState} className="previous-btn">Previous</button>
                <div className="pagination-numbers">
                    {generatePageBtns()}
                </div>
                <button onClick={changeToNextState} className="next-btn">Next</button>
            </div>
        </div>
    )

}