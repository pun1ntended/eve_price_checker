const express          = require('express'),
      router           = express.Router(),
      pg               = require('pg'),
      path             = require('path'),
      connectionString = process.env.DATABASE_URL | 'postgres://localhost:5432/postgres'; //change this to production database when ready

router.get('/api/v1/items', function (req, res, next) {

});