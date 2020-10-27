const connection = require('./ConectionMSSQ')
const DTSale = require('../EntitySupermarket/DTSale')
const DTDetailSale = require('../EntitySupermarket/DTDetailSale')

async function registerSale(sale) {
    queryinsert = "insert into Sale OUTPUT inserted.IdS values (@state,@subtotal,@taxes,@total,@cardnumber)"

    try {
        const pool = await connection.poolPromise
        const result = await pool.request()
            .input('state', connection.sql.VarChar, sale.StateS)
            .input('subtotal', connection.sql.Money, sale.SubtotalS)
            .input('taxes', connection.sql.Money, sale.TaxesS)
            .input('total', connection.sql.Money, sale.TotalS)
            .input('cardnumber', connection.sql.VarChar, sale.cardpayment)
            .query(queryinsert)
        var row = result.recordsets[0];
        var ids = row[0].IdS;
        for (var dtsale of sale.ArrayDTDetailSale)
        {
            querydts = "insert into DetailSale values (@quantity,@amount,@productname,@saleid)"
            const resultdts = await pool.request()
                .input('quantity', connection.sql.Money, dtsale.QuantityDS)
                .input('amount', connection.sql.Money, dtsale.AmountDS)
                .input('productname', connection.sql.VarChar, dtsale.ProductDS)
                .input('saleid', connection.sql.Int, ids)
                .query(querydts)
        }
        if (result.rowsAffected == 0) {
            return "The sale could not be inserted, the data may have been entered incorrectly";
        }
        return "The sale was inserted successfully";

    } catch (error) {

        return error.message;
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

