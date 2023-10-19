import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetRangedWines } from '../../shared/hooks/useGetRangedWines'
import { useGetAllWinesQuantity } from "../../shared/hooks/useGetAllWinesQuantity";

import './all-wines.css'

export const AllWines = () => {

    const [rangedWines, setRangedWines] = useGetRangedWines();
    const [winesList, setWinesList] = useState(rangedWines);
    const [pageNumber, setPageNumber] = useState(1);
    const winesQuantity = useGetAllWinesQuantity();

    function changeRange(number, pageNumber) {
        setPageNumber(number);
        setRangedWines(number);
    }

    function changeToPreviousState() {
        if(pageNumber !== 1) {
            setPageNumber(pageNumber - 1);
            setRangedWines(pageNumber - 1);
        }
    }

    function changeToNextState() {
        if(pageNumber !== Math.ceil(winesQuantity / 8)) {
            setPageNumber(pageNumber + 1);
            setRangedWines(pageNumber + 1);
        }
    }

    function generatePageBtns() {
        const pageNums = [];

        for(let i = 0; i < Math.ceil(winesQuantity / 8); i++) {
            pageNums.push(i + 1);
        }

        return pageNums.map(number => {
            return <Link to={`?page=${number}`}><button key={number} onClick={() => {changeRange(number, pageNumber)}} className={`page-number ${pageNumber === number ? 'border-active': ''}`}>{number}</button></Link>
        });
    }
    

    useEffect(() => {
        setWinesList(rangedWines);
    }, [rangedWines])

    return (
        <div className="all-wines-wrap">
            <h1 className="wines-list-label">Wines list:</h1>
            <div className="all-wines-section">
                {winesList?.map((wine) => {
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

