export async function fetchLikedDataArray(setProducts) {
    if(localStorage.getItem('LikedIDs')) {
        try {
            const res = await fetch(`http://127.0.0.1:3010/api/getDataArray`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: localStorage.getItem('LikedIDs'),
            });
    
            const productsInfo = await res.json();
            setProducts(productsInfo);
        } catch (error) {
            console.error('Error', error);
        }
    }
}