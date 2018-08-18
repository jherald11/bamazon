var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazondb"
});

connection.connect(function(err){
    if(err) throw err;
    var query = connection.query(
        "SELECT products.item_id, products.product_name, products.price FROM products WHERE products.stock_quantity > 0",
        function(error, response, fields){
            if(error) throw error;
            console.log(response);
            inquirer.prompt([
                {
                type: "input",
                name: "item",
                message: "What item would you like to purchase? Please enter the item_id..."
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?"
            }
        ]).then(function(res){
            var update = connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
            {
                stock_quantity: parseInt(res.quantity)
            },
            {
                item_id: parseInt(res.item)
            },
            function(err, res){
                if(err) throw err;
                console.log("You purchased items");
            }
        )
        });

        }
    );
});


