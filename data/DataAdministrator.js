
const { Conection } = require("./Connection");

class DataAdministrator {

    //SET

    static  registerAdmin=async(dtoadmin)=>
    {
        let {NameAdmin,UserrName,Passwordd
        }=dtoadmin;
      
      



        let resultquery=0;
        let queryinsert = `
        
        DECLARE @NameAdmin varchar(50) = '${NameAdmin}';
        DECLARE @UserrName varchar(50)= '${UserrName}';
        DECLARE @Passwordd varchar(100)= '${Passwordd}';
      
      
        IF EXISTS ( SELECT UserrName FROM Administrator 
            WHERE UserrName =@UserrName and active=1
            )
        BEGIN
            select -1 as existusername
        END
        ELSE
        BEGIN

                IF LEN(@UserrName) < 8
                BEGIN
                    select -2 as incorrectusername
                END
                ELSE
                BEGIN
                    IF LEN(@Passwordd) < 8
                    BEGIN
                        select -3 as incorrectpassword
                    END
                    ELSE
                    BEGIN
                       
                        insert into Administrator 
                        values 
                        (@NameAdmin,@UserrName,
                        HASHBYTES('SHA2_256', @Passwordd),1)

                        select 1 insertsuccess
                     
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
            pool.close();
          return resultquery;
        
    }
    static  updateAdmin=async(dtoadmin)=>
    {
        let {IdAdministrator,NameAdmin
        }=dtoadmin;
      
        let resultquery=0;
        let queryinsert = `
        
                        DECLARE @IdAdministrator int = '${IdAdministrator}';
                        DECLARE @NameAdmin varchar(100) = '${NameAdmin}';

                        IF EXISTS (SELECT IdAdministrator 
                            FROM Administrator WHERE 
                            IdAdministrator = @IdAdministrator
                             and active=1)
                       
                        BEGIN
                          

                                UPDATE Administrator
                                SET NameAdmin = @NameAdmin
                            
                                WHERE IdAdministrator = @IdAdministrator;

                                select 1 updatesuccess

                          
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidadmin;
                         END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidadmin;
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
    
    //GET
    
    static  getCustomerById=async(idcustomer)=>
    {
        let resultquery=0;
        let queryinsert = `
        
                        DECLARE @idcustomer int = ${idcustomer};

                        IF  EXISTS (SELECT IdCustomer FROM Customer WHERE 
                            IdCustomer = @idcustomer and active=1)
                       
                        BEGIN
                           
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
                            from 
                            Customer as c
                            WHERE 
                            c.Active = 1
                            and c.idcustomer = @idcustomer
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
                let dtocustomer = new DTOCustomer();
                this.getInformation(dtocustomer, result.recordset[0]);
                resultquery=dtocustomer;
            }
            pool.close();
          return resultquery;
        
    }

    //GET INFORMATION
    
    static getInformation(dtoadmin,result)
    {
        dtoadmin.IdAdministrator = result.IdAdministrator;
        dtoadmin.NameAdmin = result.NameAdmin;
        dtoadmin.UserrName = result.Userrname;
        dtoadmin.Passwordd = result.Passwordd;
        dtoadmin.Active = result.Active;
       
    }

}

module.exports = { DataAdministrator };