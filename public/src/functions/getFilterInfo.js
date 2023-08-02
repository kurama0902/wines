export const getFilterInfo = (arr, type) => {
    let collector = {};

    arr.forEach((item) => {
        if (!collector[item[type]]) {
            collector[item[type]] = item[type];
        }
    });

    let result = [];
    for (let key of Object.keys(collector)) {
        result = [...result, collector[key]];
    }

    return result;
};