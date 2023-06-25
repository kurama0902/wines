import React, { useEffect, useState } from "react";
import { Brand } from "../Brand";

import './brands.css';

export const Brands = () => {

    const [brands, setBrands] = useState([]);

    const getBrands = async () => {
        try {
            let res = await fetch("http://localhost:3010/api/brands", {
                method: "GET",
            })
            let r = await res.json();
            setBrands(r.brandCategories)
        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getBrands()
        console.log('Worked');
    }, [])

    return (
        <section className="brands-wrap">
            {
                brands.map(item => {
                    return <Brand brands={item} key={item.name} />
                })
            }
        </section>
    )
}