import React, { useEffect, useState } from "react";

export const useGetAllWines = () => {
    const [data, setData] = useState();

    function getData() {
        try {
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return data;
}