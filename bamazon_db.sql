DROP DATABASE IF EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT (11) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("How to Code 101", "Books", 19.99, 25),
("MacBook Pro 15-inch", "Computers", 2500.99, 5),
("House MD Complete Series DVD", "Movies & TV", 79.99, 25),
("Hackers DVD w/Bonus Hackers Guide", "Movies & TV", 19.99, 7),
("Mr. Robot Season 1", "Movies & TV", 19.99, 9),
("Keurig Coffee Maker 'No Spill'", "Electronics", 59.99, 8),
("2MP Spy Cam", "Electronics", 29.99, 20),
("Glow in the Dark Yoga Pants", "Clothing", 19.99, 4),
("Wireless Charger", "Electronics", 24.99, 25),
("Dummies Guide to Android", "Books", 19.99, 25),
("Dummies Guide to iOS", "Books", 19.99, 25),
("Fast & the Furious 8 Movie Collection (DVD)", "Movies & TV", 39.99, 25);

SELECT * FROM products;