import { API } from "../shared/API";

export async function fetchDataArray(name, setProducts) {
    console.log(API, 'API');
    if(localStorage.getItem(name)) {
        try {
            const res = await fetch(`${API}api/getDataArray`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: localStorage.getItem(name),
            });
    
            const productsInfo = await res.json();
            setProducts(productsInfo);
        } catch (error) {
            console.error('Error', error);
        }
    }
}