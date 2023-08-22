let flag = true;

export const searchInfo = (e, setSeacrhedProducts) => {
	// if (flag) {
	// 	setFlag(false);
	// 	setTimeout(() => {
	// 		fetch('http://localhost:3010/api/search-info', {
	// 			method: 'post',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				inputValue: e.target.value,
	// 			}),
	// 		})
	// 			.then((res) => res.json())
	// 			.then((info) => {
	// 				setSeacrhedProducts(info);
	// 				console.log(info, `sub str: ${e.target.value}`);
	// 				setFlag(true);
	// 			});
	// 	}, 4000);
	// }
	if (flag) {
		flag = false;
		setTimeout(() => {
			fetch('http://localhost:3010/api/search-info', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					inputValue: e.target.value,
				}),
			})
				.then((res) => res.json())
				.then((info) => {
					setSeacrhedProducts(info);
					console.log(info, `sub str: ${e.target.value}`);
					flag = true;
				});
		}, 1000);
	}
};

