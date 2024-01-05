import React, { useState } from "react";
import { Users } from "./Users";

import './admin-panel.css';

export const AdminPanel = () => {

    const [option, setOption] = useState('users');

    const options = {
        users: <Users/>,
        // goods: <Goods/>
    }

    return (
        <div className="admin-panel-wrap">
            <nav className="options-nav">
                <h1 className="options-label">Options</h1>
                <div className="nav-btns">
                    <button onClick={() => setOption('users')} className="nav-btn">Users</button>
                    <button onClick={() => setOption('goods')} className="nav-btn">Goods</button>
                </div>
            </nav>
            {options[option]}
        </div>
    )
}