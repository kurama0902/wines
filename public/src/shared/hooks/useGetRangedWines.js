import { useEffect, useState } from "react";

export const useGetRangedWines = () => {
    const [data, setData] = useState();

    async function getData(pageNum = 1) {
        try {
            let res = await fetch('http://localhost:3010/api/getRangedWines', {
                method: 'post',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({page: pageNum})
            });
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
    return [data, getData];
}