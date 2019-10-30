var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    itemTable();
});


function itemTable() {

    var table = new Table({
        head: ["ID #", "Product", "Department", "Price", "Quantity"],
        colWidths: [7, 45, 15, 10, 10]
    });

    listItems();

    function listItems() {


        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
            }
            console.log("\nCurrent Bamazon Inventory\n");
            console.log(table.toString());
            console.log("");
            purchaseChoice();
        });
    }
}

function purchaseChoice() {

    inquirer.prompt([{
            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the product you would like to buy.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this product would you like to buy?",

        }
    ]).then(function(userPurchase) {


        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("\nInsufficient quantity! Please select a different quantity or product.\n");
                    purchaseChoice();

                } else {
                    console.log("You've selected: \n");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("\n");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber + "\n");

                    var updateQuantity = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    purchaseConfirm(updateQuantity, purchaseId);
                }
            }
        });
    });
}

function purchaseConfirm(updateQuantity, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this product and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateQuantity
            }, {
                item_id: purchaseId
            }], function(err, res) {

                console.log("\nPurchase complete.\n");
                continueShopping();
            });

        } else {
            console.log("We're sorry we were unable to assist you today.");
            continueShopping();
        }
    });
}

function continueShopping() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirmShopping",
        message: "Would you like to make a another purchase?",
        default: true

    }]).then(function(userConfirmShopping) {
        if (userConfirmShopping.confirmShopping === true) {
            itemTable();
        } else {
            console.log("Thank you for shopping at Bamazon!");
            connection.end();

        }
    })
}