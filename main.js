function getFunc() {
    let test = 4
    return function () {
        console.log(test)
    }
}

const testF = getFunc()