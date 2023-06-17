
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
    static  updateNameAdmin=async(dtoadmin)=>
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
    static  updatePassword=async(idadmin,newpassword,currentpassword)=>
    {
      
        let resultquery=0;
        let queryinsert = `
        
        DECLARE @IdAdministrator int = ${idadmin};
        DECLARE @newpassword varchar(100) = '${newpassword}';
        DECLARE @currentpassword varchar(100)= '${currentpassword}';

        IF NOT EXISTS (SELECT IdAdministrator FROM Administrator WHERE 
            IdAdministrator = @IdAdministrator AND 
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

                 Update Administrator Set 
                 Passwordd = HASHBYTES('SHA2_256', @newpassword) 
                 where IdAdministrator=@IdAdministrator

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
    static  deleteAdmin=async(idadmin)=>
    {
        let resultquery=0;
        let queryinsert = `

                    DECLARE @IdAdministrator int = '${idadmin}';

                        IF  EXISTS (SELECT IdAdministrator
                             FROM Administrator WHERE 
                            IdAdministrator = @IdAdministrator 
                            and active=1)
                       
                        BEGIN
                        
                                UPDATE Administrator
                                SET active = 0
                                WHERE IdAdministrator = @IdAdministrator

                                select 1 deletesuccess
 
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
             resultquery = result.recordset[0].deletesuccess;
            }
            pool.close();
          return resultquery;
        
    }

    //GET INFORMATION
        
    static getInformation(dtoadmin,result)
    {
        dtoadmin.IdAdministrator = result.IdAdministrator;
        dtoadmin.NameAdmin = result.NameAdmin;
        dtoadmin.UserrName = result.UserrName;
        
    }

}

module.exports = { DataAdministrator };