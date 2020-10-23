const sql = require('mssql');
const config = {
    user: 'rwkama63_SQLLogin_1',
    password: 'ksjp44u79n',
    database: 'BDSupermarketMSSQ',
    server: 'BDSupermarketMSSQ.mssql.somee.com',
    port: 1433,
    options: {
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: false
    }

}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = { sql, poolPromise };