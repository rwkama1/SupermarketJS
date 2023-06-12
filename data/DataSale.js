const dbconection = require('./ConectionMSSQ').clientcon;
const DTSale = require('../EntitySupermarket/DTSale');
const DTDetailSale = require('../EntitySupermarket/DTDetailSale');

async function registerSale(sale) {

    const conection = await dbconection
    try {
        const colsale = await conection.db("BDSupermarket").collection("Sale");
        const result = await colsale.insertOne(sale);
        
        for (var dtsale of sale.ArrayDTDetailSale)
        {
            let query = { AmountDS: dtsale.AmountDS, QuantityDS: dtsale.QuantityDS, ProductDS: dtsale.ProductDS, Sale: result.insertedId };
            const coldetailsale = await conection.db("BDSupermarket").collection("DetailSale").insertOne(query);
        }
        conection.close();
        return "Added Sale " + result.insertedId;

    }
    catch (e) {
        return e.message
    }
}
module.exports = { registerSale };

//var arraydts = [];
//arraydts.push(new DTDetailSale.DTDetailSale(0, 1,200, 'Ice Cream'))
//arraydts.push(new DTDetailSale.DTDetailSale(0, 1,100,'Ketchup'))
//arraydts.push(new DTDetailSale.DTDetailSale(0, 1,500,'Water Bottle'))
//var dtsale = new DTSale.DTSale(0, "asd", 100, 500, 400, arraydts,null)
//registerSale(dtsale).then(datar => {
//    console.log(datar)
//})

