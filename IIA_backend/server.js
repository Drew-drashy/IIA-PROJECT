const express = require('express');
const mysql = require('mysql2'); // Use mysql2 instead of mysql
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Shlok1234",
    database: "global_schema",
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

app.get('/', async (req, res) => {
    return res.json("From Backend side");
});

app.get('/customer_data', async (req, res) => {
    const sql = "SELECT * FROM customer_dim";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});
app.get('/product_data', async (req, res) => {
    const sql = "SELECT * FROM product_dim";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/date_data', async (req, res) => {
    const sql = "SELECT * FROM date_dim";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/category_data', async (req, res) => {
    const sql = "SELECT * FROM category_dim";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/sales_data', async (req, res) => {
    const sql = "SELECT * FROM sales_fact";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/stock_data', async (req, res) => {
    const sql = "SELECT * FROM stock_fact";
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});
app.get('/stock_anal', async (req, res) => {
    const sql = `
    SELECT Category_dim.CategoryName, SUM(Stock_Fact.Stock) AS totalStock
    FROM Stock_Fact
    INNER JOIN Category_dim ON Stock_Fact.CategoryID = Category_dim.CategoryID
    GROUP BY Category_dim.CategoryName
  `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});
app.get('/cust_anal', async (req, res) => {
    const sql = `
    SELECT City, COUNT(*) AS customerCount
    FROM Customer_dim
    GROUP BY City
  `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/date_anal', async (req, res) => {
    const sql = `
    SELECT CONCAT(Month, ' ', Year) AS TimePeriod, COUNT(*) AS eventCount
    FROM Event_Fact
    INNER JOIN date_dim ON Event_Fact.Time_ID = date_dim.Time_ID
    GROUP BY TimePeriod
    ORDER BY Year, MONTH(FIELD(Month, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'))
  `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/product_anal', async (req, res) => {
    const sql = `
    SELECT ProductName, SUM(Price * Quantity) AS totalSales
    FROM Product_dim
    GROUP BY ProductName
  `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/sales_anal', async (req, res) => {
//     const sql = `
//     SELECT ProductID, SUM(Quantity) AS totalQuantity
//     FROM Sales_Fact
//     GROUP BY ProductID
//   `;
    const sql= `SELECT p.ProductName, s.Quantity
    FROM Product_dim p
    JOIN Sales_Fact s ON p.ProductID = s.ProductID`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/category_anal', async (req, res) => {
    const sql = `
    SELECT CategoryName, COUNT(*) AS productCount
    FROM Product_dim
    INNER JOIN Category_dim ON Product_dim.CategoryID = Category_dim.CategoryID
    GROUP BY CategoryName
  `;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});





app.listen(8081, () => {
    console.log("Listening on port 8081");
});
