const { Conection } = require("./Connection");
class DataSuppliers {
    //SET

    static  registerSuppliers=async(dtosuppliers)=>
    {
        let {SupplierName,AddressSupplier,CitySupplier,StateSupplier,PhoneSupplier,
            EmailSupplier
        }=dtosuppliers;
      
        let resultquery=0;
        let queryinsert = `

            DECLARE @SupplierName varchar(100) = '${SupplierName}';
            DECLARE @AddressSupplier varchar(100)= '${AddressSupplier}';
            DECLARE @CitySupplier varchar(100)= '${CitySupplier}';
            DECLARE @StateSupplier varchar(100)= '${StateSupplier}';
            DECLARE @PhoneSupplier varchar(100)= '${PhoneSupplier}';
            DECLARE @EmailSupplier varchar(100)=' ${EmailSupplier}';
      
            IF EXISTS (SELECT EmailSupplier FROM Suppliers 
                WHERE EmailSupplier = @EmailSupplier
                 )
            BEGIN
                SELECT -1 AS existemail
            END
            ELSE
              BEGIN
                insert into Suppliers 
                 values 
                (@SupplierName,@AddressSupplier,
                  @CitySupplier,@StateSupplier,@PhoneSupplier,
                  @EmailSupplier)

                select 1 insertsuccess
                     
            END
      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
            resultquery = result.recordset[0].existemail;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].insertsuccess;
            }
            pool.close();
          return resultquery;
        
    }
    static  updateSuppliers=async(dtosuppliers)=>
    {
        let {SupplierId,SupplierName,AddressSupplier,CitySupplier,StateSupplier,PhoneSupplier
        }=dtosuppliers;
      
        let resultquery=0;
        let queryinsert = `
            
                    DECLARE @SupplierId int = '${SupplierId}';
                    DECLARE @SupplierName varchar(100) = '${SupplierName}';
                    DECLARE @AddressSupplier varchar(100)= '${AddressSupplier}';
                    DECLARE @CitySupplier varchar(100)= '${CitySupplier}';
                    DECLARE @StateSupplier varchar(100)= '${StateSupplier}';
                    DECLARE @PhoneSupplier varchar(100)= '${PhoneSupplier}';
                   

                        IF EXISTS (SELECT SupplierId
                             FROM Suppliers WHERE SupplierId = @SupplierId 
                            )
                       
                        BEGIN
                                UPDATE Suppliers
                                SET SupplierName = @SupplierName,
                                AddressSupplier = @AddressSupplier,
                                CitySupplier = @CitySupplier,
                                StateSupplier = @StateSupplier,
                                PhoneSupplier = @PhoneSupplier
                             where SupplierId=@SupplierId

                                select 1 updatesuccess
                          
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidsuppliers;
                         END

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidsuppliers;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].updatesuccess;
            }
            pool.close();
          return resultquery;
        
    }
    
 

}
module.exports = { DataSuppliers };
