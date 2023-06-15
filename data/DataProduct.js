const { Date } = require("mssql");
const { DTOProduct } = require("../entity/DTOProduct");
const { Conection } = require("./Connection");

class DataProduct {
 
    // SET
     
    static  registerProduct=async(dtoproduct)=>
    {
        let {NameProduct,DescriptionProduct,UrlImg,PriceProduct,Manufacturer,
            CountryOfOrigin,StockProduct,Entry_date,Expiration_date,SupplierId,
            IdCategory
        }=dtoproduct;
      
        let resultquery=0;
        let queryinsert = `
        
        DECLARE @NameProduct varchar(100) = '${NameProduct}';
        DECLARE @DescriptionProduct varchar(200)= '${DescriptionProduct}';
        DECLARE @UrlImg varchar(1000)= '${UrlImg}';
        DECLARE @PriceProduct DECIMAL(10,2)= ${PriceProduct};
        DECLARE @Manufacturer varchar(100)= '${Manufacturer}';
        DECLARE @CountryOfOrigin varchar(100)='${CountryOfOrigin}';
        DECLARE @StockProduct int= ${StockProduct};
        DECLARE @SupplierId int= ${SupplierId};
        DECLARE @IdCategory int= ${IdCategory};
      
        IF NOT EXISTS ( SELECT SupplierId FROM Suppliers 
            WHERE SupplierId =@SupplierId 
            )
        BEGIN
            select -1 as notexistssupplier
        END
        ELSE
        BEGIN
            IF NOT EXISTS (SELECT IdCategory FROM Category WHERE IdCategory = @IdCategory)
            BEGIN
                SELECT -2 AS notexistscategory
            END
            ELSE
                    BEGIN
                       
                    insert into Product 
                    values 
                    (@NameProduct,@DescriptionProduct,
                    @UrlImg,@PriceProduct,@Manufacturer,
                    @CountryOfOrigin,@StockProduct,@Entry_date,
                    @Expiration_date,0,1,@SupplierId,@IdCategory)

                    select 1 insertsuccess
                     
                    END
             
        END

      
        `;

        let pool = await Conection.conection();
        const result = await pool.request()
        .input('Entry_date', Date, Entry_date)
        .input('Expiration_date', Date, Expiration_date)
         .query(queryinsert)
            resultquery = result.recordset[0].notexistssupplier;
            if(resultquery===undefined)
            {
                resultquery = result.recordset[0].notexistscategory;
                if (resultquery===undefined) {
                    resultquery = result.recordset[0].insertsuccess;
                   
                }
                
            }
            pool.close();
          return resultquery;
        
    }
    static  updateProduct=async(dtoproduct)=>
    {
        let {IdProduct,NameProduct,DescriptionProduct,PriceProduct,Manufacturer,
            CountryOfOrigin,Entry_date,Expiration_date,
        }=dtoproduct;
      
        let resultquery=0;
        let queryinsert = `

        DECLARE @IdProduct int = ${IdProduct};
        DECLARE @NameProduct varchar(100) = '${NameProduct}';
        DECLARE @DescriptionProduct varchar(200)= '${DescriptionProduct}';
        DECLARE @PriceProduct DECIMAL(10,2)= ${PriceProduct};
        DECLARE @Manufacturer varchar(100)= '${Manufacturer}';
        DECLARE @CountryOfOrigin varchar(100)='${CountryOfOrigin}';

            IF  EXISTS (SELECT IdProduct FROM Product WHERE 
                IdProduct = @IdProduct and active=1)
                        
                        BEGIN
                          

                                UPDATE Product
                                SET NameProduct = @NameProduct,
                                DescriptionProduct = @DescriptionProduct,
                                PriceProduct = @PriceProduct,
                                Manufacturer = @Manufacturer,
                                CountryOfOrigin = @CountryOfOrigin,
                                Entry_date=@Entry_date,
                                Expiration_date=@Expiration_date

                                WHERE IdProduct = @IdProduct;

                                select 1 updatesuccess

                          
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidproduct;
                         END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
        .input('Entry_date', Date, Entry_date)
        .input('Expiration_date', Date, Expiration_date)
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidproduct;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].updatesuccess;
            }
            pool.close();
          return resultquery;
        
    }
    static  addStock=async(IdProduct,Quantity)=>
    {
     
      
        let resultquery=0;
        let queryinsert = `

            DECLARE @IdProduct int = ${IdProduct};
            DECLARE @Quantity int = ${Quantity};
       

                IF  EXISTS (SELECT IdProduct FROM Product WHERE 
                    IdProduct = @IdProduct and active=1)
                        
                        BEGIN        
                                UPDATE Product
                                SET StockProduct = StockProduct+@Quantity
                                WHERE IdProduct = @IdProduct;

                                select 1 updatesuccess 
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidproduct;
                         END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidproduct;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].updatesuccess;
            }
            pool.close();
          return resultquery;
        
    }
    static  substractStock=async(IdProduct,Quantity)=>
    {
     
      
        let resultquery=0;
        let queryinsert = `

                DECLARE @IdProduct int = ${IdProduct};
                DECLARE @Quantity int = ${Quantity};
        

                     IF  EXISTS (SELECT IdProduct FROM Product WHERE 
                    IdProduct = @IdProduct and active=1)
                        
                        BEGIN        
                                UPDATE Product
                                SET StockProduct = StockProduct-@Quantity
                                WHERE IdProduct = @IdProduct;

                                select 1 updatesuccess 
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidproduct;
                         END
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidproduct;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].updatesuccess;
            }
            pool.close();
          return resultquery;
        
    }
    static  deleteProduct=async(idproduct)=>
    {
        let resultquery=0;
        let queryinsert = `
        
                        DECLARE @idproduct int = '${idproduct}';
                       

                        IF  EXISTS (SELECT idproduct FROM Product WHERE 
                            idproduct = @idproduct and active=1)
                       
                        BEGIN
                           

                                UPDATE Product
                                SET active = 0
                                WHERE idproduct = @idproduct

                                  select 1 deletesuccess

                            
                        END
                        ELSE
                        BEGIN
                             SELECT -1 AS nonexistingidproduct;
                         END

      
        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)

          resultquery = result.recordset[0].nonexistingidproduct;
            if(resultquery===undefined)
            {
             resultquery = result.recordset[0].deletesuccess;
            }
            pool.close();
          return resultquery;
        
    }

    //GET

    static  getProductById=async(idproduct)=>
    {
       let resultquery;
        let queryinsert = `
        
        DECLARE @ProductId INT;
        SET @ProductId = ${idproduct};
        
        IF EXISTS (SELECT IdProduct FROM Product WHERE IdProduct = @ProductId AND active = 1)
        BEGIN
            SELECT P.IdProduct, P.NameProduct, P.DescriptionProduct,
            CASE
                WHEN O.IdOffer IS NULL THEN P.PriceProduct
                WHEN GETDATE() BETWEEN O.Startt_date AND O.End_date THEN O.Offer_price
                ELSE P.PriceProduct
            END AS PriceProduct,
            P.UrlImg, P.StockProduct,
            CASE
                WHEN O.IdOffer IS NULL THEN CAST(0 AS bit)
                WHEN GETDATE() BETWEEN O.Startt_date AND O.End_date THEN CAST(1 AS bit)
                ELSE CAST(0 AS bit)
            END AS InOffer,
            P.PriceProduct AS RegularPrice,
        ROUND(ISNULL(PR.Rating, 0) * 4 / 5 + 1, 2) AS Rating
        
            FROM Product P
            LEFT JOIN Offers O ON P.IdProduct = O.IdProduct
            LEFT JOIN (
                SELECT IdProduct, AVG((Rating - 1) * 4 / 4 + 1) AS Rating
                FROM ProductRatings
                WHERE IdProduct = @ProductId
                GROUP BY IdProduct
            )  PR ON P.IdProduct = PR.IdProduct
            WHERE P.IdProduct = @ProductId AND P.active = 1
        END
        ELSE
        BEGIN
            SELECT -1 AS nonexistingidproduct;
        END
        

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         resultquery = result.recordset[0].nonexistingidproduct;
         if(resultquery===undefined)
         {
            let DTOproduct = new DTOProduct();
            this.getInformation(DTOproduct, result.recordset[0]);
            resultquery=DTOproduct;
         }
          return resultquery;
        
    }
    static  getProductsOfferByCategory=async(idcategory)=>
    {
        let arrayn=[];
        let queryinsert = `
        
        DECLARE @CategoryId INT;
        SET @CategoryId = ${idcategory};
        
        SELECT P.IdProduct, P.NameProduct, P.DescriptionProduct,
        CASE WHEN O.IdOffer IS NULL THEN P.PriceProduct
             WHEN GETDATE() BETWEEN O.Startt_date AND O.End_date
              THEN O.Offer_price
             ELSE P.PriceProduct
        END AS PriceProduct,
        P.UrlImg, P.StockProduct,
        CASE WHEN O.IdOffer IS NULL THEN CAST(0 AS bit)
             WHEN GETDATE() BETWEEN O.Startt_date AND O.End_date 
             THEN CAST(1 AS bit)
             ELSE CAST(0 AS bit)
        END AS InOffer,
        P.PriceProduct AS RegularPrice
        FROM Product P
        LEFT JOIN Offers O ON P.IdProduct = O.IdProduct
        WHERE P.IdCategory = @CategoryId

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproduct = new DTOProduct();   
            this.getInformation(dtoproduct,re);
            arrayn.push(dtoproduct);
         }
          return arrayn;
        
    }
    static  getProductsOffer=async()=>
    {
        let arrayn=[];
        let queryinsert = `
  
        SELECT P.IdProduct, 
        P.NameProduct,
         P.DescriptionProduct,
        CASE WHEN O.IdOffer IS NULL THEN P.PriceProduct
             WHEN GETDATE() BETWEEN O.Startt_date AND O.End_date
              THEN O.Offer_price
             ELSE P.PriceProduct
        END AS PriceProduct,
        P.UrlImg,
         P.StockProduct,
        CASE WHEN O.IdOffer IS NULL THEN CAST(0 AS bit)
             WHEN GETDATE() BETWEEN O.Startt_date AND O.End_date 
             THEN CAST(1 AS bit)
             ELSE CAST(0 AS bit)
        END AS InOffer,
        P.PriceProduct AS RegularPrice
        FROM Product P
        LEFT JOIN Offers O ON P.IdProduct = O.IdProduct
        ORDER BY ISNULL(O.Offer_price, P.PriceProduct) ASC;

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproduct = new DTOProduct();   
            this.getInformation(dtoproduct,re);
            arrayn.push(dtoproduct);
         }
          return arrayn;
        
    }
    static  getSearchProducts=async(nameproduct="",descriptionproduct="",
    manufacturerproduct="",countryoriginproduct="",categoryname="",
    suppliername="")=>
    {
        let arrayn=[];
        let queryinsert = `
  
            SELECT 
            P.IdProduct, 
            P.NameProduct,
            P.DescriptionProduct,
            P.UrlImg
            FROM Product P
            INNER JOIN Category C ON P.IdCategory = C.IdCategory
            INNER JOIN Suppliers S ON P.SupplierId = S.SupplierId
            WHERE P.Active = 1
            AND C.NameCategory LIKE '%${categoryname}%'
            AND S.SupplierName LIKE '%${suppliername}%'
            AND P.NameProduct LIKE '%${nameproduct}%'
            AND P.DescriptionProduct LIKE '%${descriptionproduct}%'
            AND P.Manufacturer LIKE '%${manufacturerproduct}%'
            AND P.CountryOfOrigin LIKE '%${countryoriginproduct}%'
            

        `
        let pool = await Conection.conection();
        const result = await pool.request()
         .query(queryinsert)
         for (let re of result.recordset) {
            let dtoproduct = new DTOProduct();   
            this.getInformation(dtoproduct,re);
            arrayn.push(dtoproduct);
         }
          return arrayn;
        
    }

    //GET INFORMATION
    
    static getInformation(dtoproduct,result)
    {
        dtoproduct.IdProduct = result.IdProduct;
        dtoproduct.NameProduct = result.NameProduct;
        dtoproduct.DescriptionProduct = result.DescriptionProduct;
        dtoproduct.PriceProduct = result.PriceProduct;
        dtoproduct.UrlImg = result.UrlImg;
        dtoproduct.InOffer = result.InOffer;
        dtoproduct.RegularPrice = result.RegularPrice;
        dtoproduct.Rating = result.Rating;
     
    }

}
module.exports = { DataProduct };



    //static async  getProducts() {
    //     const conection = await dbconection
    //     try {
    
    //         //let query = { Namep: 'Ketchup' }
    
    //         const collection = conection.db("BDSupermarket").collection("Product");
    //         const result = await collection.find({}).toArray();
    //         let array = [];
    //         for (var p of result) {
    //             var obj = new DTProduct(p._id, p.Namep, p.PriceP)
    //             array.push(obj);
    //         }
    //         return array;
    //         conection.close();
    
    
    //     }
    //     catch (e) {
    //         return e.message
    //     }
    
    // }
    // static async getProductsExpression(expression) {
    //     const conection = await dbconection
    //     try {
    
    //         //let query = { Namep: /^expression/ };
    //         let query = {Namep: { $regex: expression } }
    //        const collection = conection.db("BDSupermarket").collection("Product");
    //        const result = await collection.find(query).toArray();
    //        let array =[];
    //        for (var p of result) {
    //             var obj = new DTProduct(p._id, p.Namep, p.PriceP)
    //             array.push(obj);
    //         }
    //         return array;
    //         conection.close();
    
    
    //     }
    //     catch (e) {
    //         return e.message
    //     }
    
    // }
    // static async getProduct(name) {
    //     //const conection =await  dbconection.connect();
    //     const conection = await dbconection
    //     try {
    
    //         let query = { Namep: name }
    //         const collection = conection.db("BDSupermarket").collection("Product");
    //         const p = await collection.findOne(query);
    //         var obj = new DTProduct(p._id, p.Namep, p.PriceP);
    //         return obj;
            
    //     }
    //     catch (e) {
    //         return e.message
    //     }
    // }