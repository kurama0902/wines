import React, { useRef, useState } from "react";

import './admin-authorization.css'
import { AdminPanel } from "..";
import { Preloader } from "../../../shared/components/Counter/Preloader";

export const AdminAuthorization = () => {

    const [flag, setFlag] = useState(false);

    const inputsData = useRef({
        email: '',
        password: ''
    });

    const changeInputData = (e) => {
        const inputName = e.name;
        const inputValue = e.value;
        inputsData.current[inputName] = inputValue;
        console.log(inputsData.current, "|  inputs data");
        console.log(inputName, inputValue, "|  inputs value");
    }

    return (
        flag === true ? <AdminPanel /> : 
        <div className="admin-authorization-wrap">
            <form className="admin-form-auth" onSubmit={async e => {
                e.preventDefault();

                const res = await fetch('http://localhost:3010/api/admin-auth', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inputsData.current)
                })
                console.log(res);

                if (res.status === 200) {
                    setFlag(true);
                }
            }}>
                <h1 className="auth-log-label">Login</h1>
                <div className="auth-inputs">
                    <input name="email" type="email" placeholder="Enter please the email" className="auth-input" onChange={(e) => changeInputData(e.target)}/>
                    <input name="password" type="password" placeholder="Enter please the password" className="auth-input" onChange={(e) => changeInputData(e.target)}/>
                </div>
                <input className="auth-submit" type="submit" value={'Submit'} />
            </form>
            <Preloader />
        </div>
    )
}