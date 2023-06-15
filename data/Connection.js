const sql  = require("mssql");

class Conection
{
     static conection=async () => {
        let sqlconfig = {
         
            user: 'rwkama65_SQLLogin_2',
            password:'k7efzh6c2e',
            database: 'supermarkett',
           server: 'supermarkett.mssql.somee.com',
            options: {
                    trustedConnection: false,
                    enableArithAbort: true,
                    encrypt: false
                }
            
        }
        const pool = await  sql.connect(sqlconfig);
        return pool
  
       }
}

module.exports = { Conection };