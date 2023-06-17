
const { DTOProduct } = require("../entity/DTOProduct");
const { Conection } = require("./Connection");

class DataSale
{
       //SET

       static registerOnlineSale=async(dtosale,arraydetailsale)=>
    {
        let {Sale_Date,PaymentMethod,Observation,Vat
        }=dtosale;
          let queryinsert = `  

              BEGIN TRANSACTION  

              DECLARE @SaleId INT;
              DECLARE @Subtotal DECIMAL(10, 2);
              DECLARE @VatRate DECIMAL(5, 2);
              DECLARE @TotalAmount DECIMAL(10, 2);
              
              -- Input parameters

         
              DECLARE @PaymentMethod VARCHAR(50) = '${PaymentMethod}';
              DECLARE @Observation VARCHAR(100) = '${Observation}';
              DECLARE @VatPercentage DECIMAL(5, 2) = ${Vat}; -- VAT percentage provided as a parameter
              
              -- Insert the sale into the Sale table

              INSERT INTO Sale (Sale_Date, Subtotal, PaymentMethod, Vat, Total_amount, Observation, Statee, IdCustomer)
              VALUES (getdate(), 0, @PaymentMethod, 0, 0, @Observation, 'Pending', 1);
              
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
              
              IF(@@ERROR > 0)  
              BEGIN  
                  ROLLBACK TRANSACTION  
              END  
              ELSE  
              BEGIN  
                  COMMIT TRANSACTION  
              END   
            
          `;
          let pool = await Conection.conection();
          const result = await pool.request()
          .query(queryinsert)
       
          pool.close();
          return true;
  
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

