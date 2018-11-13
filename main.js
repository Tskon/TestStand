const val1 = +prompt("Введите число");
const pow1 = +prompt("Введите степень");

function power(val, pow) {
    if (pow === 0) {
        return 1;
    }
    return val * power(val, pow - 1);
}

alert(power(val1, pow1));