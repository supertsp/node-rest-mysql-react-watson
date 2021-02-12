const mysql = require('mysql');

let pool;

const define = ({ host, user, password, schema, port }) => {
  pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: schema,
    port: port,
    connectionLimit : 10,
  });
};

const query = (query, parameters = {}) => {
  return new Promise((resolve, reject) => {
    pool.query(query, parameters, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ results, fields });
    });
  })
}

module.exports = {
  define,
  query,
};