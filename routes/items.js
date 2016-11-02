const express          = require('express'),
      router           = express.Router(),
      pg               = require('pg'),
      path             = require('path'),
      conString = 'pg://localhost:5432/eve_items'; //change this to production database when ready

router.get('/', (req, res, next) => {
  const results = [];
  var client = new pg.Client(conString); // Get a Postgres client from the connection pool
  client.connect();
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY typeID ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      res.send(JSON.stringify(results));
      client.end();
    });
});
router.get('/:item_id', (req, res, next) => {
  var id = req.params.item_id;
  const results = [];
  var client = new pg.Client(conString); // Get a Postgres client from the connection pool
  client.connect();
  // SQL Query > Select Data
  const query = client.query('SELECT * FROM items WHERE typeID = $1', [id]);
  // Stream results back one row at a time
  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
    res.send(JSON.stringify(results));
    client.end();
  });
});


module.exports = router;