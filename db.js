const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DivineSecrets',
  password: 'Rafat#01',
  port: '5432',
});

module.exports = pool;