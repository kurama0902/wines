import React from "react";

import './dashboard-info.css'

export const DashboardInformation = () => {
    return (
        <div className="dashboard-info-wrap">
            <header className="dashboard-header">
                <div className="name-of-page">
                    <p className="settings-text">Settings</p>
                    <span className="slash-text">/</span>
                    <p className="user-profile-text">User Profile</p>
                </div>
            </header>
            <main className="users-info-wrap">
                <div className="users-description">
                    
                </div>
            </main>
        </div>
    )
}