const { Conection } = require("./Connection");

class DataCategory {
    
    //SET

    static  registerCategory=async(namecategory,descriptioncategory)=>
    {
      
        let resultquery=0;
        let queryinsert = `
            
            DECLARE @namecategory varchar(100) = '${namecategory}';
            DECLARE @descriptioncategory varchar(100)= '${descriptioncategory}';
            
            insert into Category 
             values 
             (@namecategory,@descriptioncategory)

            select 1 insertsuccess
      
        `;
        
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)       
          resultquery = result.recordset[0].insertsuccess;
            pool.close();
          return resultquery;
        
    }
    static  updateCategory=async(idcategory,namecategory,descriptioncategory)=>
    {
       
      
        let resultquery=0;	
        let queryinsert = `
        
                        DECLARE @IdCategory int = '${idcategory}';
                        DECLARE @NameCategory varchar(100) = '${namecategory}';
                        DECLARE @DescriptionCategory varchar(100)= '${descriptioncategory}';

                        IF EXISTS (SELECT IdCategory FROM Category WHERE 
                            IdCategory = @IdCategory )
                       
                        BEGIN
                                UPDATE Category
                                SET NameCategory = @NameCategory,
                                DescrriptionCategory = @DescriptionCategory                          
                                WHERE IdCategory = @IdCategory;

                                select 1 updatesuccess

                          
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidcategory;
                         END

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidcategory;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].updatesuccess;
            }
            pool.close();
          return resultquery;
        
    }

}
module.exports = { DataCategory };
