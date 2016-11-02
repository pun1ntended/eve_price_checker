const pg = require("pg"),
      data = require('./data.js'),
      conString = "pg://localhost:5432/eve_items";

var client = new pg.Client(conString);
client.connect();
client.query("CREATE TABLE IF NOT EXISTS items(typeID integer, itemName varchar(64))");
var query = client.query("SELECT * FROM items");
query.on('row', function (row, result) {
  result.addRow(row)
});
query.on('end', function(result) {
  console.log(result.rows.length + ' rows were received');
  client.end();
});
