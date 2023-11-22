const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Shlok1234',
  database: 'global_schema'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);

  // Perform the SELECT query
  connection.query('SELECT * FROM customer_dim', (err, results) => {
    if (err) {
      console.error('Error executing SELECT query: ' + err.stack);
      return;
    }

    // Display the results
    console.log('Results from SELECT query:');
    console.log(results);

    // Close the connection when done
    connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL connection: ' + err.stack);
        return;
      }
      console.log('MySQL connection closed.');
    });
  });
});
