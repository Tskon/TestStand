window.onload = function () {
    var products = [
        {
            product: "Лампа",
            price: 100
        },
        {
            product: "Часы",
            price: 200
        },
        {
            product: "Сувенир",
            price: 300
        }
    ];
//console.log(products[0]);
    var buy_1 = document.getElementById('buy_1');
    var buy_2 = document.getElementById('buy_2');
    var buy_3 = document.getElementById('buy_3');

    var buttons = document.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
        console.log(products[i].product);
        buttons[i].addEventListener('click', function(){
            var id = this.id.substr(-1);
            console.log(id);
            // putData(products[id - 1].product, products[id - 1].price);
            document.getElementById('del1').style.visibility = 'visible';
        })
    }

    function putData(arg1, arg2) {
        var table = document.getElementById('productTable');
        var rows = table.rows;
        // var colm = table.colms;
        document.getElementById(productName1).value = arg1;
        document.getElementById(productNumber1).value = arg2;
        console.log(arg1);
        for (var i = 0; i < rows.length; i++){
            var row = document.createElement('tr');
            row.classList.add('table-row');

            for (var j = 0; j < colms.length; j++)
            {
                var cell = document.createElement('td');
                cell.classList.add('table-cell');
                cell.classList.add('cell-' + i + '-' + j);
                row.appendChild(cell);
            }
            productTable.appendChild(row);
        }
        /*for (var j = 0; j < rows.length; j++) {
           rows[j].cells[j].value = 1;*/
    };

    var d = document.getElementById('del');
    // d.onclick = function() {
    //     deleteRow(d);
    // }
    function deleteRow(r)
    {
        var i=r.parentNode.parentNode.rowIndex;
        document.getElementById('productTable').deleteRow(i);
    }
}