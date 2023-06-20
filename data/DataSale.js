
const { Int } = require("mssql");
const { DTOSale } = require("../entity/DTOSale");
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
                    Vat = @VatPercentage,
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
        static confirmSale=async(idsale)=>
        {
            let resultquery;
           
              let queryinsert = `  

              IF NOT EXISTS (SELECT idsale FROM Sale WHERE idsale = @idsale)
              BEGIN
                  SELECT -1 AS notexistsale
              END
              ELSE
              BEGIN
                  BEGIN TRANSACTION;
              
                  -- Deduct the stock quantity of products in the DetailSale table
              
                  UPDATE Product
                  SET StockProduct = StockProduct - DS.Quantity
                  FROM DetailSale DS
                  INNER JOIN Product P ON DS.IdProduct = P.IdProduct
                  WHERE DS.IdSale = @idsale;
              
                  -- Update the state of the sale to 'Confirmed'
              
                  UPDATE Sale
                  SET statee = 'Confirmed'
                  WHERE idsale = @idsale;
              
                  -- Commit the transaction
              
                  COMMIT TRANSACTION;
              
                  SELECT 1 AS confirmsuccess;
              END
              
          
              `;
              let pool = await Conection.conection();
              const result = await pool.request()
              .input('idsale', Int,idsale)
              .query(queryinsert)
               resultquery = result.recordset[0].notexistsale;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].confirmsuccess;
                    
                }
              pool.close();
              return resultquery;
      
        }
        static cancelSale=async(idsale)=>
        {
            let resultquery;
           
              let queryinsert = `  

              IF NOT EXISTS ( SELECT idsale 
                FROM Sale WHERE  idsale=@idsale)
              BEGIN
                select -1 as notexistsale
              END
            ELSE
            BEGIN
               UPDATE Sale SET statee='Canceled'
               WHERE idsale=@idsale
               select 1 as canceledsuccess
            END
          
              `;
              let pool = await Conection.conection();
              const result = await pool.request()
              .input('idsale', Int,idsale)
              .query(queryinsert)
               resultquery = result.recordset[0].notexistsale;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].canceledsuccess;
                    
                }
              pool.close();
              return resultquery;
      
        }
        static deliverSale=async(idsale)=>
        {
            let resultquery;
           
              let queryinsert = `  

              IF NOT EXISTS ( SELECT idsale 
                FROM Sale WHERE  idsale=@idsale)
              BEGIN
                select -1 as notexistsale
              END
            ELSE
            BEGIN
               UPDATE Sale SET statee='Delivered'
               WHERE idsale=@idsale
               select 1 as deliversuccess
            END
          
              `;
              let pool = await Conection.conection();
              const result = await pool.request()
              .input('idsale', Int,idsale)
              .query(queryinsert)
               resultquery = result.recordset[0].notexistsale;
                if(resultquery===undefined)
                {
                    resultquery = result.recordset[0].deliversuccess;
                    
                }
              pool.close();
              return resultquery;
      
        }

       //GET

       static  getPendingSalesByCustomer=async(namecustomer="")=>
       {
          let arrayn=[];
           let queryinsert = `

           SELECT S.IdSale, S.Sale_Date, S.Subtotal,
            S.PaymentMethod, S.Vat, S.Total_amount, 
            S.Observation, S.Statee, C.IdCustomer, C.NameCustomer
           FROM Sale S
           JOIN Customer C ON S.IdCustomer = C.IdCustomer
           WHERE S.Statee = 'Pending'
            AND C.NameCustomer LIKE '%${namecustomer}%'

           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtosale = new DTOSale();   
                this.getInformation(dtosale,re);
                arrayn.push(dtosale);
             }
             return arrayn;
           
       }
       static  getConfirmedSalesByCustomer=async(namecustomer="")=>
       {
          let arrayn=[];
           let queryinsert = `

           SELECT S.IdSale, S.Sale_Date, S.Subtotal,
            S.PaymentMethod, S.Vat, S.Total_amount, 
            S.Observation, S.Statee, C.IdCustomer, C.NameCustomer
           FROM Sale S
           JOIN Customer C ON S.IdCustomer = C.IdCustomer
           WHERE S.Statee = 'Confirmed'
            AND C.NameCustomer LIKE '%${namecustomer}%'

           `
           let pool = await Conection.conection();
           const result = await pool.request()
            .query(queryinsert)
            for (let re of result.recordset) {
                let dtosale = new DTOSale();   
                this.getInformation(dtosale,re);
                arrayn.push(dtosale);
             }
             return arrayn;
           
       }

      //GET INFORMATION
        
      static getInformation(dtosale,result)
      {
        dtosale.IdSale = result.IdSale;
        dtosale.Sale_Date = result.Sale_Date;
        dtosale.Subtotal = result.Subtotal;
        dtosale.PaymentMethod = result.PaymentMethod;
        dtosale.Vat = result.Vat;
        dtosale.Total_amount = result.Total_amount;
        dtosale.Observation = result.Observation;
        dtosale.Statee = result.Statee;
        dtosale.IdCustomer = result.IdCustomer;
        dtosale.NameCustomer = result.NameCustomer;
      
      }


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

