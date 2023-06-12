const { Conection } = require("./Connection");

class DataRatingsProduct{

    //SET 

    static  ratingProduct=async(idproduct,idcustomer,rating)=>
    {
      
        let resultquery=0;
        let queryinsert = `
            
        DECLARE @Rating int = ${rating};
        DECLARE @IdProduct int = ${idproduct};
        DECLARE @IdCustomer int = ${idcustomer};

      
        IF @Rating BETWEEN 1 AND 5
		BEGIN
		 IF EXISTS (SELECT IdCustomer FROM Customer WHERE 
							IdCustomer = @IdCustomer and active=1)
        
			BEGIN
				 IF EXISTS (SELECT IdProduct FROM Product WHERE 
							IdProduct = @IdProduct and active=1)
        
				  BEGIN

					IF NOT EXISTS (SELECT RatingId FROM ProductRatings WHERE 
						IdProduct = @IdProduct and IdCustomer=@IdCustomer )
       
					BEGIN

								insert into ProductRatings 
								values 
								(@Rating,@IdProduct,@IdCustomer)

								select 1 insertsuccess
							
           
					 END
					ELSE
					BEGIN
							UPDATE ProductRatings
							SET Rating = @Rating
							WHERE IdProduct = @IdProduct
							AND IdCustomer=@IdCustomer;

							select 2 updatesuccess    
					 END 

				 END
				 ELSE
				 BEGIN
					SELECT -1 AS noexistproduct;
				 END
			END
			ELSE
			BEGIN
				SELECT -3 AS noexistcustomer;
			END
		END
		ELSE
		BEGIN
				SELECT -2 AS invalidrating;
		END	
              
        `;
        
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)       
         resultquery = result.recordset[0].invalidrating;
         if(resultquery===undefined)
         {
             resultquery = result.recordset[0].noexistproduct;
             if (resultquery===undefined) {
                 resultquery = result.recordset[0].insertsuccess;
                 if (resultquery===undefined) {
                    resultquery = result.recordset[0].noexistcustomer;
                    if (resultquery===undefined) {
                        resultquery = result.recordset[0].updatesuccess;
                       
                    }
                }
             }
             
         }
         pool.close();
          return resultquery;
        
    }

  

}
module.exports = { DataRatingsProduct };
