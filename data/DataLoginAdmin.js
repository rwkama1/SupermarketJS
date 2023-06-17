const { Conection } = require("./Connection");
const { VarChar,Int } = require("mssql");
const { DTOAdministrator } = require("../entity/DTOAdministrator");
const { DataAdministrator } = require("./DataAdministrator");


class DataLoginAdmin {

    static  loginAdmin=async(username,password)=>
    {
        let resultquery=0;
        let queryinsert = `
        

        DECLARE @IdAdministrator int

        SELECT @IdAdministrator = IdAdministrator
        FROM Administrator
        WHERE UserrName = @UserrName AND 
        Passwordd = HASHBYTES('SHA2_256', @Passwordd) AND
        Active = 1

        IF @IdAdministrator IS NULL
        BEGIN
            SELECT -1 as wrongdata
        END
        ELSE
        BEGIN
            INSERT INTO LoginAdministrator (IdAdmin, LoginDateAndTime)
            VALUES (@IdAdministrator, GETUTCDATE())

             SELECT 
             Administrator.IdAdministrator,
             Administrator.NameAdmin,
             Administrator.UserrName
            FROM Administrator 
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
             let dtoadmin = new DTOAdministrator();
            DataAdministrator.getInformation(dtoadmin, result.recordset[0]);
            resultquery=dtoadmin; 
            }
        pool.close();
         return resultquery;
        
    }
    static existLoginAdmin=async(idadmin,username)=>
{
   
     let querysearch=
     `

     SELECT CASE WHEN COUNT(*) > 0 
     THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END AS Exist
     FROM LoginAdministrator
     WHERE IdAdmin = @IdAdministrator and IdAdmin IN (
        SELECT IdAdministrator FROM Administrator WHERE UserrName
         = @UserrName
     )

     `;
        let pool = await Conection.conection();   
       const result = await pool.request()
       .input('IdAdministrator', Int, idadmin)
       .input('UserrName', VarChar, username)
       .query(querysearch)
        let exist = result.recordset[0].Exist;
       pool.close();
       return exist;
    

     }
    static  logout=async(idadmin)=>
    {
        let resultquery=0;
        let deletequery = `
       
        IF NOT EXISTS (SELECT IdAdmin FROM LoginAdministrator
             WHERE 
             IdAdmin = @IdAdministrator)
        BEGIN
            SELECT -1 as notexistloginadmin
        END
        else
        begin
            delete from LoginAdministrator
             where IdAdmin=@IdAdministrator
            select 1 as userdeslogged
        end

        `
        let pool = await Conection.conection();
 
        const result = await pool.request()    
        .input('IdAdministrator', Int, idadmin)
        .query(deletequery)
        resultquery = result.recordset[0].notexistloginadmin;
        if(resultquery===undefined)
        {
           resultquery = result.recordset[0].userdeslogged;
        }
        pool.close();
        return resultquery;
        
    }
}

module.exports = { DataLoginAdmin };
