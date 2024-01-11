import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { useGetRangedUsers } from "../../../shared/hooks/useGetRangedUsers";
import { GeneratePageBtns } from "../../AllWines/components/GeneratePageBtns";
import { DeleteUserSVG } from "../../../shared/SVG/DeleteUserSVG";

import './users.css'
import { Preloader } from "../../../shared/components/Counter/Preloader";


export const Users = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Number(searchParams.get('page')) || 1;

    const winesData = useGetRangedUsers(pageNumber) || [];

    console.log(winesData);

    const { items, pagesCount, flag } = winesData[0] || [];
    const setData = winesData[1];

    console.log(flag, "Flag");


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

    const deleteUser = async (email) => {
        await fetch('http://localhost:3010/api/deleteUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })

        let res = await fetch('http://localhost:3010/api/getRangedUsers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page: pageNumber }),
        });
        let wines = await res.json();
        setData(wines)
    }

    return (
        <div className="users-ad-wrap">
            {flag === true ? <h1 className='no-label'>No registered users</h1> : <div className="users">
                {items === undefined ? <Preloader /> : items?.map((e) => {
                    
                    return (
                        <div className="user-data" key={e.email}>
                            <p className="fullname">{e.firstname} {e.lastname}</p>
                            <p className="ad-email">{e.email}</p>
                            <p className="username">{e.username}</p>
                            <DeleteUserSVG deleteFn={() => deleteUser(e.email)} />
                        </div>
                    )
                })}
            </div>}
            {!flag && <div className="pag-wrap">
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
            </div>}
        </div>
    )
}