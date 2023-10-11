import React, { useEffect, useState } from "react";

export const useGetAllWines = () => {
    const [data, setData] = useState();

    async function getData() {
        try {
            let res = await fetch('http://127.0.0.1:3010/api/getAllWines');
            let wines = await res.json();
            setData(wines);
        } catch (error) {
            console.error('Error');
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // console.log(data);
    return data;
}