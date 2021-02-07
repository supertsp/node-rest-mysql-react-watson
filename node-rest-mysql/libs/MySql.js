const mysql = require('mysql');

module.exports = class MySql {

    connection;
    host;
    port;
    user;
    password;
    schema;
    lastResult;

    static setConnectionParams(host, port, user, password, schema) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.schema = schema;
    }

    static async executeQuery(sql) {
        this.lastResult = await getNewPromisseConnection(this.host, this.port, this.user, this.password, this.schema, sql);
        return this.lastResult;
    }

    static getLastResult() {
        return this.lastResult;
    }

}

function getNewPromisseConnection(host, port, user, password, schema, sql) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            database: schema
        });
        
        connection.connect((error) => {
            if (error) reject(error);

            connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                    connection.destroy();
                } 
        
                resolve(result);
                connection.destroy();
            });
        });
    });
}
