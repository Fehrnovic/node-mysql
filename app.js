const config = require('config');
const mysql = require('mysql');

const express = require('express');
const app = express();

const dbConfig = config.get('Database.dbConfig');

const connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});


connection.query({
    sql: 'SELECT * FROM `test`'
    }, function (error, results, fields) {
    console.log('Results :', results);
});


app.use(express.json());


app.get('/', (req, res) => {
    res.send('This is the main page');
});


const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`))