import React from "react";

import './all-wines.css'

export const AllWines = () => {

    

    return (
        <div className="all-wines-wrap">
            <div className="all-wines-section">
                {}
            </div>
            <div className="wines-pagination">
                <button className="previous-btn">Previous</button>
                <div className="pagination-numbers">
                    <div className="page-number">1</div>
                    <div className="page-number">2</div>
                    <div className="page-number">3</div>
                    <div className="page-number">4</div>
                    <div className="page-number">5</div>
                    <div className="page-number">6</div>
                    <div className="page-number">7</div>
                </div>
                <button className="next-btn">Next</button>
            </div>
        </div>
    )
}