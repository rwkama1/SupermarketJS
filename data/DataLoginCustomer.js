const { Conection } = require("./Connection");
const { VarChar,Int } = require("mssql");
const { DataCustomer } = require("./DataCustomer");
const { DTOCustomer } = require("../entity/DTOCustomer");

class DataLoginCustomer {

    static  loginCustomer=async(username,password)=>
    {
        let resultquery=0;
        let queryinsert = `
        

        DECLARE @IdCustomer int

        SELECT @IdCustomer = IdCustomer
        FROM Customer
        WHERE UserrName = @UserrName AND 
        Passwordd = HASHBYTES('SHA2_256', @Passwordd) AND
        Active = 1

        IF @IdCustomer IS NULL
        BEGIN
            SELECT -1 as wrongdata
        END
        ELSE
        BEGIN
            INSERT INTO LoginCustomer (IdCustomer, LoginDateAndTime)
            VALUES (@IdCustomer, GETUTCDATE())

             SELECT 
             c.idcustomer,
            c.NameCustomer,
            c.Userrname,
             c.Street_name,
            c.Street_number,
            c.Unit_apartment,
            c.City,
            c.Statee,
            c.Phone,
            c.Email,
            c.RegistrationDate
            FROM Customer c
            WHERE UserrName = @UserrName AND 
            Passwordd = HASHBYTES('SHA2_256', @Passwordd) AND
            Active = 1
            
        END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('UserrName', VarChar, username)
        .input('Passwordd', VarChar, password)
        .query(queryinsert)     
        resultquery = result.recordset[0].wrongdata;
        if(resultquery===undefined)
            {
             let dtocustomer = new DTOCustomer();
            DataCustomer.getInformation(dtocustomer, result.recordset[0]);
            resultquery=dtocustomer; 
            }
        pool.close();
         return resultquery;
        
    }
    static existLoginCustomer=async(idcustomer,username)=>
{
   
     let querysearch=
     `

     SELECT CASE WHEN COUNT(*) > 0 
     THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS Exist
     FROM LoginCustomer
     WHERE IdCustomer = @IdCustomer and IdCustomer IN (
        SELECT IdCustomer FROM Customer WHERE UserrName
         = @UserrName
     )

     `;
        let pool = await Conection.conection();   
       const result = await pool.request()
       .input('IdCustomer', Int, idcustomer)
       .input('UserrName', VarChar, username)
       .query(querysearch)
        let exist = result.recordset[0].Exist;
       pool.close();
       return exist;
    

     }
    static  logout=async(idcustomer)=>
    {
        let resultquery=0;
        let deletequery = `
       
        IF NOT EXISTS (SELECT idcustomer FROM LoginCustomer WHERE 
            idcustomer = @idcustomer)
        BEGIN
            SELECT -1 as notexistlogincustomer
        END
        else
        begin
            delete from LoginCustomer where idcustomer=@idcustomer
            select 1 as userdeslogged
        end

        `
        let pool = await Conection.conection();
 
        const result = await pool.request()    
        .input('idcustomer', Int, idcustomer)
        .query(deletequery)
        resultquery = result.recordset[0].notexistlogincustomer;
        if(resultquery===undefined)
        {
           resultquery = result.recordset[0].userdeslogged;
        }
        pool.close();
        return resultquery;
        
    }
}

module.exports = { DataLoginCustomer };
