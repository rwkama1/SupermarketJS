const mdatasale = require('../DataSupermarket/DataSale');

async function salerecord(sale) {

    var rs = await mdatasale.registerSale(sale);
    return rs;
}
//async function paycard(dtcardp) {

//    var dtc = await mdatacard.PaywithCard(dtcardp);
//    return dtc;
//}
module.exports = { salerecord };