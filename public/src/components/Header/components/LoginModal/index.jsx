import React from "react";

import './login-modal.css';

export const LoginModal = (display) => {
    console.log(display);
    console.log(display);

    return (
        <div className={`login-modal-wrap ${(display.display.loginModalDisplay) ? "visible" : 'invisible'}`}>
            <div className="login-modal-bg" onClick={display.display.handleLoginBgClick}></div>
            <div className="login-modal">
                <h1>Login</h1>
                <form action="" className="login-form" onSubmit={ async (e) => {
                    e.preventDefault();
                    let result = await fetch('http://localhost:3010/api/login', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: '',
                            pass: ''
                        })
                    })
                }}>
                    <input className="email" placeholder="Please, enter your email.." type="email" />
                    <input className="password" placeholder="Please, enter your password.." type="password" />
                    <input className="submit" type="submit" value={'Submit'} />
                </form>
            </div>
        </div>
    )
}