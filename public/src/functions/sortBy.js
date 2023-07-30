export const sortBy = (direction, arr) => {
    if(direction === 1) {
        return arr.sort((a, b) => a.cost - b.cost)
    }

    return arr.sort((a, b) => b.cost - a.cost)
}