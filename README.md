# Bamazon

## Introduction

Bamazon is a command line node app. It has 3 different command functions. You can shop as a customer, update inventory as a manager, and see cost analysis as a supervisor.

Click here for a video demo of the working app: https://drive.google.com/file/d/1p9cA3GoYEU8bf0kvTgSYAuq9XP60Wolo/view?usp=sharing

### Prerequisites

Download and install on your computer:
* MySQL Workbench
* NodeJS

## Getting Started

* Clone the Repository
* Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and won't be commited to Github.
```
node_modules
.DS_Store
```
* In the MySQL database file make sure you input your own password (the one you setup when you installed MySQL)
```
    host: "localhost",
    port: 3306,
    user: "root",
    password: "", 
    database: "bamazon_db"
```
* After you've completed the above steps you then have to install the following node modules in the command line in terminal/bash:
```
npm install <package name>
  * cli-table
  * mysql
  * inquirer
  
```


### List of Features/Functions

To run program type in the command line:
* node bamazonCustomer.js  
  * This will bring you to the shopping portal, where you will see a list of products for sale.
  
* node bamazonManager.js
  * This will show you:
    * Restock Inventory - which will allow you to input new quantity of the product you want to restock.
    * View Low Inventory - it will show you any product that has a quantity of 4 or less.
    * Add New Product - this will allow you to add a product for sale.
    * Remove an Existing Product - this will allow you to remove a product for sale from the list.
    * Exit System - this will return you to the terminal command line.
  
* node bamazonSupervisor.js
  * This is still a work in progress did not have time to code this yet. Will update in future release.
  
### Built With
  
1. MySQL Workbench
1. javascript
1. node.js
1. https://www.npmjs.com/ - for node modules
  
