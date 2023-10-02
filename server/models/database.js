const { Pool } = require('pg');

const PG_URI =
  'postgres://gjvhfhjo:jCdlDHZ53fIpt5yZBdLKCQ3fDIIsnCA8@mahmud.db.elephantsql.com/gjvhfhjo';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log(`query ${text}`);
    return pool.query(text, params, callback);
  },
};
