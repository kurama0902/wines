import React from "react";
import MobContentSwitcher from "../../../MobContentSwitcher";

import './my-orders.css'

export const MyOrders = (props) => {
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
                
            </main>
        </div>
    )
}