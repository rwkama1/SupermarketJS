
const { DTOProduct } = require("../entity/DTOProduct");
const { Conection } = require("./Connection");

class DataSale
{
       //SET

       static registerOnlineSale=async(dtosale,arraydetailsale)=>
    {
        let resultquery;
        let {PaymentMethod,Observation,Vat,IdCustomer
        }=dtosale;
          let queryinsert = `  
        
          DECLARE @SaleId INT;
          DECLARE @Subtotal DECIMAL(10, 2);
          DECLARE @VatRate DECIMAL(5, 2);
          DECLARE @TotalAmount DECIMAL(10, 2);
          
          -- Input parameters

          DECLARE @IdCustomer int = ${IdCustomer};
          DECLARE @PaymentMethod VARCHAR(50) = '${PaymentMethod}';
          DECLARE @Observation VARCHAR(100) = '${Observation}';
          DECLARE @VatPercentage DECIMAL(5, 2) = ${Vat}; -- VAT percentage provided as a parameter

           IF NOT EXISTS ( SELECT IdCustomer FROM Customer 
            WHERE IdCustomer =@IdCustomer and active=1
                )
            BEGIN
                select -1 as notexistscustomer
            END
            ELSE
            BEGIN
                BEGIN TRANSACTION  

                -- Insert the sale into the Sale table

                INSERT INTO Sale (Sale_Date, Subtotal, PaymentMethod,
                    Vat, Total_amount, Observation, Statee, IdCustomer)
                VALUES (getdate(), 0, @PaymentMethod, 0, 0, @Observation,
                'Pending', @IdCustomer);
                
                -- Get the ID of the newly inserted sale

                SET @SaleId = SCOPE_IDENTITY();
                
                -- Insert the sale details into the DetailSale table and calculate the subtotal

                ${this.forAddDetailSale(arraydetailsale)}
                
                -- Calculate the subtotal by summing the prices of the sale details

                SET @Subtotal = (
                    SELECT SUM(Quantity * Unit_Price)
                    FROM DetailSale
                    WHERE IdSale = @SaleId
                );
                
                -- Calculate the total amount by adding the subtotal and the VAT

                SET @VatRate = @Subtotal * (@VatPercentage / 100);
                SET @TotalAmount = @Subtotal + @VatRate;
                
                -- Update the sale with the calculated values

                UPDATE Sale
                SET Subtotal = @Subtotal,
                    Vat = @VatRate,
                    Total_amount = @TotalAmount
                WHERE IdSale = @SaleId;
                
                select 1 as insertsuccess

                IF(@@ERROR > 0)  
                BEGIN  
                    ROLLBACK TRANSACTION  
                END  
                ELSE  
                BEGIN  
                    COMMIT TRANSACTION  
                END   
            END   
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .query(queryinsert)
           resultquery = result.recordset[0].notexistscustomer;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].insertsuccess;
                
            }
          pool.close();
          return resultquery;
  
    }

       //GET


     //#region OTHERS

 
   static forAddDetailSale(array)
   //Used to add multiple detail order
   {
    let stringelement="";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        stringelement=stringelement+
       `
        insert into DetailSale values
         (${element.quantity},${element.priceproduct},${element.idproduct}
            ,@SaleId
         )

        `
    }
    return stringelement
   
   }
}
module.exports = { DataSale };

