const findLatestWeight = function(weights) {
    if (weights.length === 1) return weights[0]

    const maxVal = Math.max.apply(Math, weights)
    let filteredArr = weights.filter(num => num !== maxVal)
    const filteredMaxVal = Math.max.apply(Math, weights)
    const filteredMaxValIndex = weights.indexOf(filteredMaxVal)

    filteredArr[filteredMaxValIndex] = maxVal - filteredMaxVal

    return findLatestWeight(filteredArr)
}

console.log(findLatestWeight([2,7,4,1,8,1]))