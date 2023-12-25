import React, { useEffect, useState } from "react";
import MobContentSwitcher from "../../../MobContentSwitcher";
import { useSelector } from "react-redux";

import './my-orders.css'

export const MyOrders = (props) => {

    let [historyData, setHistoryData] = useState([])

    const { user } = useSelector((state) => ({
		user: state.auth.user,
	}));

    const getHistory = async () => {
        const dataResponse = await fetch('http://localhost:3010/api/getUsersOrderHistory', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: user.email})
        })

        const data = await dataResponse.json();


        console.log(data);

        setHistoryData(data)
    }

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <div className="dashboard-info-wrap">
            <header className="dashboard-header">
                <div className="name-of-page">
                    <p className="settings-text">Profile</p>
                    <span className="slash-text">/</span>
                    <p className="user-profile-text">My Orders</p>
                </div>
                <MobContentSwitcher flag={props.flag} setFlag={props.setFlag} sectionName={props.sectionName}/>
            </header>
            <main className="my-orders-wrap">
                <div className="order-history">
                    <div className="main-row row">
                        <p className="order-data">Name</p>
                        <p className="order-data">Quantity</p>
                        <p className="order-data">Cost</p>
                        <p className="order-data">Date</p>
                    </div>
                    {historyData?.map((e, index) => {
                        return (
                            <div className="row" key={index}>
                                <p className="order-data">{e.name}</p>
                                <p className="order-data">{e.quantity}</p>
                                <p className="order-data">{e.cost}</p>
                                <p className="order-data">{e.date}</p>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}