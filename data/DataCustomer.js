const { Conection } = require("./Connection");
class DataCustomer {
    //#region CRUD
    static  registerCustomer=async(dtocustomer)=>
    {
        let {namecustomer,userrname,password,streetname,streetnumber,
            unit_apartament,city,statee,phone,email
        }=dtocustomer;
      
        let resultquery=0;
        let queryinsert = `
        
        DECLARE @namecustomer varchar(100) = '${namecustomer}';
        DECLARE @userrname varchar(100)= '${userrname}';
        DECLARE @password varchar(100)= '${password}';
        DECLARE @streetname varchar(100)= '${streetname}';
        DECLARE @streetnumber varchar(100)= '${streetnumber}';
        DECLARE @unit_apartament varchar(100)=' ${unit_apartament}';
        DECLARE @city varchar(100)= '${city}';
        DECLARE @statee varchar(100)= '${statee}';
        DECLARE @phone varchar(100)= '${phone}';
        DECLARE @email varchar(100)= '${email}';
      
        IF EXISTS ( SELECT UserrName FROM Customer 
            WHERE UserrName =@userrname and active=1
            )
        BEGIN
            select -1 as existusername
        END
        ELSE
        BEGIN
            IF EXISTS (SELECT Email FROM Customer WHERE Email = @email
                 and active=1 )
            BEGIN
                SELECT -4 AS existemail
            END
            ELSE
                begin
                IF LEN(@userrname) < 8
                BEGIN
                    select -2 as incorrectusername
                END
                ELSE
                BEGIN
                    IF LEN(@password) < 8
                    BEGIN
                        select -3 as incorrectpassword
                    END
                    ELSE
                    BEGIN
                       
                        insert into Customer 
                        values 
                        (@namecustomer,@userrname,
                        HASHBYTES('SHA2_256', @password),'',@streetname,
                        @streetnumber,@unit_apartament,@city,@statee,@phone,@email,GETDATE(),1)

                        select 1 insertsuccess
                     
                    END
                END
             END
        END
      
        `;

        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
            resultquery = result.recordset[0].existusername;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].existemail;
                if (resultquery===undefined) {
                    resultquery = result.recordset[0].incorrectusername;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].incorrectpassword;
                        if(resultquery===undefined)
                        {
                            resultquery = result.recordset[0].insertsuccess;
                        }
                    } 
                }
                
            }
            pool.close();
          return resultquery;
        
    }
    static  updateCustomer=async(dtocustomer)=>
    {
        let {idcustomer,namecustomer,streetname,streetnumber,
            unit_apartament,city,statee,phone,
        }=dtocustomer;
      
        let resultquery=0;
        let queryinsert = `
        
                        DECLARE @idcustomer int = '${idcustomer}';
                        DECLARE @namecustomer varchar(100) = '${namecustomer}';
                        DECLARE @streetname varchar(100)= '${streetname}';
                        DECLARE @streetnumber varchar(100)= '${streetnumber}';
                        DECLARE @unit_apartament varchar(100)=' ${unit_apartament}';
                        DECLARE @city varchar(100)= '${city}';
                        DECLARE @statee varchar(100)= '${statee}';
                        DECLARE @phone varchar(100)= '${phone}';

                        IF EXISTS (SELECT IdCustomer FROM Customer WHERE IdCustomer = @idcustomer and active=1)
                       
                        BEGIN
                          

                                UPDATE Customer
                                SET NameCustomer = @namecustomer,
                                Street_name = @streetname,
                                Street_number = @streetnumber,
                                Unit_apartment = @unit_apartament,
                                City = @city,
                                Statee = @statee,
                                Phone  = @phone
                                WHERE IdCustomer = @idcustomer;

                                select 1 updatesuccess

                          
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidcustomer;
                         END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidcustomer;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].updatesuccess;
            }
            pool.close();
          return resultquery;
        
    }
    static  updatePassword=async(idcustomer,newpassword,currentpassword)=>
    {
      
        let resultquery=0;
        let queryinsert = `
        
        DECLARE @idcustomer int = ${idcustomer};
        DECLARE @newpassword varchar(100) = '${newpassword}';
        DECLARE @currentpassword varchar(100)= '${currentpassword}';

        IF NOT EXISTS (SELECT IdCustomer FROM Customer WHERE 
            IdCustomer = @idcustomer AND 
            Passwordd = HASHBYTES('SHA2_256', @currentpassword) 
            AND Active = 1)
        BEGIN
            SELECT -1 as notexists
        END
        ELSE
        BEGIN
            IF LEN(@newpassword) < 8
            BEGIN
                select -2 as incorrectnewpassword
            END
            ELSE
            BEGIN

                 Update Customer Set 
                 Passwordd = HASHBYTES('SHA2_256', @newpassword) 
                 where IdCustomer=@idcustomer

                select 1 as updatesuccess
              
            END
        END
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].notexists;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].incorrectnewpassword;
             if(resultquery===undefined)
             {
              resultquery = result.recordset[0].updatesuccess;
             }
            }
            pool.close();
          return resultquery;
        
    }
    static  deleteCustomer=async(idcustomer)=>
    {
        let resultquery=0;
        let queryinsert = `
        
                        DECLARE @idcustomer int = '${idcustomer}';
                       

                        IF  EXISTS (SELECT IdCustomer FROM Customer WHERE 
                            IdCustomer = @idcustomer and active=1)
                       
                        BEGIN
                           

                                UPDATE Customer
                                SET active = 0
                                WHERE IdCustomer = @idcustomer

                                  select 1 deletesuccess

                            
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidcustomer;
                         END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidcustomer;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].deletesuccess;
            }
            pool.close();
          return resultquery;
        
    }

}
module.exports = { DataCustomer };
