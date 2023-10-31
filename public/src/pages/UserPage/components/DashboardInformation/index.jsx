import React from "react";
import { NotFound } from "../../../NotFound/NotFound";

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
                <div className="users-description-wrap">
                    <div className="text-wrap">
                        <div className="users-desc-text-wrap">
                            <p className="users-desc-text">User Profile</p>
                        </div>
                    </div>
                    <div className="users-description">
                        <div className="users-position">
                            <img className="users-picture" src="https://images.unsplash.com/photo-1628187832510-94b4d90445af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                            <div className="pi">
                                <p className="users-name">Diman LOLOLOL</p>
                                <p className="position">Front-end</p>
                                <p className="time-zone">Eastern European Time (EET), Cairo UTC +3</p>
                            </div>
                        </div>
                        <div className="update-picture-wrap">
                            <button className="upload-photo">Upload Photo</button>
                            <button className="delete-photo">Delete</button>
                        </div>
                    </div>
                </div>
                <div className="info-fields-wrap">
                    <div className="first-and-last">
                        <div className="first-name">
                            <label htmlFor="">First Name</label>
                            <input type="text" placeholder="First name" className="input-name" />
                        </div>
                        <div className="last-name">
                            <label htmlFor="">Last Name</label>
                            <input type="text" placeholder="Last name" className="input-lastname" />
                        </div>
                    </div>
                    <div className="user-name-wrap">
                        <label htmlFor="" className="user-name-label">User name</label>
                        <input type="text" placeholder="Username" className="input-username" />
                    </div>
                </div>
                <div className="contact-info-wrap">
                    <div className="email-wrap">
                        <label htmlFor="" className="email-label">Email</label>
                        <input type="email" placeholder="Email" className="input-email" />
                        <svg className="email-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M25.6667 10.0426V19.5416C25.6667 21.5635 24.0841 23.2157 22.0902 23.3273L21.875 23.3333H6.12504C4.10317 23.3333 2.45092 21.7507 2.33937 19.7568L2.33337 19.5416V10.0426L13.594 15.9418C13.8484 16.0749 14.1517 16.0749 14.406 15.9418L25.6667 10.0426ZM6.12504 4.66663H21.875C23.8405 4.66663 25.4568 6.16219 25.6478 8.07743L14 14.1788L2.35226 8.07743C2.53621 6.23312 4.04175 4.77798 5.90815 4.67273L6.12504 4.66663Z" fill="#ABB1BB" />
                        </svg>
                    </div>
                    <div className="phone-wrap">
                        <label htmlFor="" className="phone-label">Phone</label>
                        <input type="tel" placeholder="Phone" className="input-phone" />
                        <svg className="phone-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M18.375 2.33337C19.8247 2.33337 21 3.50863 21 4.95837V23.0417C21 24.4914 19.8247 25.6667 18.375 25.6667H9.625C8.17525 25.6667 7 24.4914 7 23.0417V4.95837C7 3.50863 8.17525 2.33337 9.625 2.33337H18.375ZM15.4583 21H12.5417C12.0584 21 11.6667 21.3918 11.6667 21.875C11.6667 22.3583 12.0584 22.75 12.5417 22.75H15.4583C15.9416 22.75 16.3333 22.3583 16.3333 21.875C16.3333 21.3918 15.9416 21 15.4583 21Z" fill="#ABB1BB" />
                        </svg>
                    </div>
                </div>
                <div className="сhange-pass-wrap">
                    <div className="current-and-new">
                        <div className="current-pass">
                            <label htmlFor="">Current password</label>
                            <input type="password" placeholder="Current password" className="input-current-pass" />
                        </div>
                        <div className="new-pass">
                            <label htmlFor="">New password</label>
                            <input type="password" placeholder="New password" className="input-new-pass" />
                        </div>
                    </div>
                    <div className="confirming-new-pass">
                        <label htmlFor="" className="confirming-label">Confirming the new password</label>
                        <input type="password" placeholder="Confirm new password" className="input-cfnew-pass" />
                    </div>
                </div>
            </main>
        </div>
    )
}