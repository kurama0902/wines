import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { useGetRangedUsers } from "../../../shared/hooks/useGetRangedUsers";
import { GeneratePageBtns } from "../../AllWines/components/GeneratePageBtns";

import './users.css'


export const Users = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Number(searchParams.get('page')) || 1;

    const winesData = useGetRangedUsers(pageNumber) || {};
    const { items, pagesCount } = winesData;


    function changePageUrl(page) {
        setSearchParams(`page=${page}`);
    }

    function changeRange(number) {
        changePageUrl(number);
    }

    function changeToPreviousState() {
        if (pageNumber !== 1) {
            changePageUrl(pageNumber - 1);
        }
    }

    function changeToNextState() {
        if (pageNumber !== pagesCount) {
            const newPage = pageNumber + 1;
            changePageUrl(newPage);
        }
    }

    return (
        <div className="users-ad-wrap">
            <div className="users">
                {items?.map(e => {
                    return (
                        <div className="user-data">
                            <p className="fullname">{e.firstname} {e.lastname}</p>
                            <p className="ad-email">{e.email}</p>
                            <p className="username">{e.username}</p>
                        </div>
                    )
                })}
            </div>
            <div className="pag-wrap">
                <div className="wines-pagination">
                    <button onClick={changeToPreviousState} className="previous-btn">
                        Previous
                    </button>
                    <div className="pagination-numbers">
                        <GeneratePageBtns
                            pageNumber={pageNumber}
                            changeRange={changeRange}
                            pagesCount={pagesCount}
                        />
                    </div>
                    <button onClick={changeToNextState} className="next-btn">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}