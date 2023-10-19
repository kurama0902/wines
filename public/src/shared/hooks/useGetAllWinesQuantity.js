import { useEffect, useState } from "react";

export const useGetAllWinesQuantity = () => {
    const [data, setData] = useState();

    async function getData() {
        try {
            let res = await fetch('http://localhost:3010/api/getAllWinesQuantity');
            let length = await res.json();
            setData(length);
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