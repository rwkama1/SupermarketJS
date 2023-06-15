const { Conection } = require("./Connection");
class DataOffer {

    //SET

    static  registerOffer=async(dtooffer)=>
    {
        let {DescriptionOffer,DiscountPercentage,Startt_date,End_date,IdProduct
        }=dtooffer;

        let resultquery=0;
        let queryinsert = `

                    
					DECLARE @DescriptionOffer varchar(100) = '${DescriptionOffer}';
                    DECLARE @Start_date DATE= '${Startt_date}';
                    DECLARE @End_date DATE= '${End_date}';
                    DECLARE @IdProduct int= ${IdProduct};

                     DECLARE @DiscountPercentage DECIMAL(5, 2);
                     SET @DiscountPercentage = ${DiscountPercentage}; 

                    DECLARE @RegularPrice DECIMAL(10, 2);

                    SELECT @RegularPrice = PriceProduct
                    FROM Product
                    WHERE IdProduct = @IdProduct;

                    DECLARE @OfferPrice DECIMAL(10, 2);
                    SET @OfferPrice = @RegularPrice - (@RegularPrice * (@DiscountPercentage / 100.0));

                    IF @Start_date < @End_date
                    BEGIN

                        IF  EXISTS (SELECT IdProduct FROM Product WHERE 
                        IdProduct = @IdProduct and active=1)
                            
                        BEGIN   
                            IF  NOT EXISTS (SELECT IdProduct FROM offers WHERE 
                            IdProduct = @IdProduct )
                                
                            BEGIN 

                            INSERT  INTO Offers 
                            values 
                            (@DescriptionOffer,@OfferPrice,@Start_date,
                            @End_date,@IdProduct)

                            select 1 insertsuccess

                            END
                            ELSE
                            BEGIN
                                SELECT -3 AS existoffer
                            END
                        END
                        ELSE
                        BEGIN
                            SELECT -1 AS existingidproduct
                        END
                    END
                    ELSE
                    BEGIN
                            SELECT -2 AS errordates
                    END
      
        `;

        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
            resultquery = result.recordset[0].existingidproduct;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].errordates;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].existoffer;
                    if(resultquery===undefined)
                    {
                        resultquery = result.recordset[0].insertsuccess;
                       
                        
                    }
                    
                }
                
            }
            pool.close();
          return resultquery;
        
    } 
    static  updateOffer=async(dtooffer)=>
    {
        let {DescriptionOffer,DiscountPercentage,Startt_date,End_date,IdProduct
        }=dtooffer;

      
        let resultquery=0;	
        let queryinsert = `
        
        DECLARE @DescriptionOffer varchar(100) = '${DescriptionOffer}';
        DECLARE @Start_date DATE= '${Startt_date}';
        DECLARE @End_date DATE= '${End_date}';
        DECLARE @IdProduct int= ${IdProduct};

         DECLARE @DiscountPercentage DECIMAL(5, 2);
         SET @DiscountPercentage = ${DiscountPercentage}; 

        DECLARE @RegularPrice DECIMAL(10, 2);

        SELECT @RegularPrice = PriceProduct
        FROM Product
        WHERE IdProduct = @IdProduct;

        DECLARE @OfferPrice DECIMAL(10, 2);
        SET @OfferPrice = @RegularPrice - (@RegularPrice * (@DiscountPercentage / 100.0));

        IF @Start_date < @End_date
        BEGIN

            IF  EXISTS (SELECT IdProduct FROM Product WHERE 
            IdProduct = @IdProduct and active=1)
                
            BEGIN   
                IF   EXISTS (SELECT IdProduct FROM offers WHERE 
                IdProduct = @IdProduct )
                    
                BEGIN 

                UPDATE Offers
                SET DescriptionOffer = @DescriptionOffer,
                Offer_Price = @OfferPrice,
                Startt_date= @Start_date,
                End_date= @End_date               
                WHERE  IdProduct = @IdProduct;

                select 1 updatesuccess

                END
                ELSE
                BEGIN
                    SELECT -3 AS notexistoffer
                END
            END
            ELSE
            BEGIN
                SELECT -1 AS existingidproduct
            END
        END
        ELSE
        BEGIN
                SELECT -2 AS errordates
        END

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].existingidproduct;
          if(resultquery===undefined)
          {
              resultquery = result.recordset[0].errordates;
              if(resultquery===undefined)
              {
                  resultquery = result.recordset[0].notexistoffer;
                  if(resultquery===undefined)
                  {
                      resultquery = result.recordset[0].updatesuccess;
                     
                      
                  }
                  
              }
              
          }
            pool.close();
              return resultquery;
        
    }

    
}
module.exports = { DataOffer };
