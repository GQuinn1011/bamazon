var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

function displayInventory() {
    connection.query('SELECT * FROM Products', function(err, res) {
        if (err) { console.log(err) };
        var theDisplayTable = new Table({
            head: ["ID #", "Item", "Department", "Price", "Quantity"],
            colWidths: [7, 45, 15, 10, 10]
        });
        for (i = 0; i < res.length; i++) {
            theDisplayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(theDisplayTable.toString());
        inquirerForUpdates();
    });
};

function inquirerForUpdates() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose an option below to manage current inventory:",
        choices: ["Restock Inventory", "View Low Inventory", "Add New Product", "Remove An Existing Product", "Exit System"]
    }]).then(function(answers) {
        switch (answers.action) {
            case "Restock Inventory":
                restockRequest();
                break;
            case "View Low Inventory":
                LowInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Remove An Existing Product":
                removeProduct();
                break;
            case "Exit System":
                connection.end();
                break;
        }
    });
};

function restockRequest() {
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "What is the item number of the item you would like to restock?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "What is the quantity you would like to add?"
        },
    ]).then(function(answers) {
        var quantityAdded = answers.Quantity;
        var productId = answers.ID;

        connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: quantityAdded
            },
            {
                item_id: productId
            }
        ], function(err, res) {
            if (err) { console.log(err) };

            displayInventory();
        });
    });
};

function LowInventory() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity DESC`, (err, res) => {
        if (res.length > 0) {
            var lowInventoryTable = new Table({
                head: ["ID #", "Product Name", "Price", "Quantity"],
                colWidths: [7, 45, 10, 10]
            });

            for (var i = 0; i < res.length; i++) {
                lowInventoryTable.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
            }

            console.log(lowInventoryTable.toString());
            restockRequest();

        } else {
            console.log("\nNo products need restocking at this time!\n");
            inquirerForUpdates();
        }

    });
};

function addProduct() {
    inquirer.prompt([{
            name: "Name",
            type: "input",
            message: "What is name of product you would like to add for sale?"
        },
        {
            name: "Department",
            type: "input",
            message: "What is the Department for product?"
        },
        {
            name: "Price",
            type: "input",
            message: "What is the price of the product?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "What is the quantity you would like to add?"
        },

    ]).then(function(answers) {
        connection.query("INSERT INTO products SET ?", {
            product_name: answers.Name,
            department_name: answers.Department,
            price: answers.Price,
            stock_quantity: answers.Quantity
        }, function(err, res) {});
        displayInventory();
    });
}

function removeProduct() {
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "What is the ID number of the product you would like to remove?"
    }]).then(function(answer) {
        var id = answer.ID;
        removeInventory(id);
    });
};

function removeInventory(id) {
    connection.query('DELETE FROM products WHERE item_id = ' + id);
    displayInventory();
};

displayInventory();