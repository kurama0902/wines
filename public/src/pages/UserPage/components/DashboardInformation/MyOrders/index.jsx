import React from "react";
import MobContentSwitcher from "../../../MobContentSwitcher";
import { useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";
import { useGetRangedHistory } from "../../../../../shared/hooks/useGetRangedHistory";
import { GeneratePageBtns } from "../../../../AllWines/components/GeneratePageBtns";
import { Preloader } from "../../../../../shared/components/Counter/Preloader";

import './my-orders.css'

export const MyOrders = (props) => {

    const { user } = useSelector((state) => ({
        user: state.auth.user,
    }));

    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Number(searchParams.get('page')) || 1;

    const winesData = useGetRangedHistory(pageNumber, user.email) || {};
    const { items, pagesCount } = winesData[0] || [];
    const setData = winesData[1];

    console.log(items);


    function changePageUrl(page) {
        setSearchParams(`page=${page}`);
    }

    function changeRange(number) {
        changePageUrl(number);
        if (pageNumber !== number) {
            setData(undefined)
        }
    }

    function changeToPreviousState() {
        if (pageNumber !== 1) {
            changePageUrl(pageNumber - 1);
            setData(undefined)
        }
    }

    function changeToNextState() {
        if (pageNumber !== pagesCount) {
            const newPage = pageNumber + 1;
            changePageUrl(newPage);
            setData(undefined)
        }
    }

    return (
        <div className="dashboard-info-wrap">
            <header className="dashboard-header">
                <div className="name-of-page">
                    <p className="settings-text">Profile</p>
                    <span className="slash-text">/</span>
                    <p className="user-profile-text">My Orders</p>
                </div>
                <MobContentSwitcher flag={props.flag} setFlag={props.setFlag} sectionName={props.sectionName} />
            </header>
            <main className="my-orders-wrap">
                <div className="order-history">
                    <div className="main-row row">
                        <p className="order-data">Name</p>
                        <p className="order-data">Quantity</p>
                        <p className="order-data">Cost</p>
                        <p className="order-data">Date</p>
                    </div>

                    {items === undefined ? <Preloader /> : items?.map((e, index) => {
                        return (
                            <div className="row" key={index}>
                                <p className="order-data">{e.name}</p>
                                <p className="order-data">{e.quantity}</p>
                                <p className="order-data">{e.cost}</p>
                                <p className="order-data">{e.date}</p>
                            </div>
                        );
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
            </main>
        </div>
    )
}