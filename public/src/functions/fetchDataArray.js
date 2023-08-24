export async function fetchDataArray(name, setProducts) {
    if(localStorage.getItem(name)) {
        try {
            const res = await fetch(`http://127.0.0.1:3010/api/getDataArray`, {
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