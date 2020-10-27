const mdatasale = require('../DataSupermarket/DataSale');
const mdatacard = require('../DataSupermarket/DataPayCard');
async function salerecord(sale) {

    var rs = await mdatasale.registerSale(sale);
    return rs;
}
async function paycard(dtcardp) {

    var dtc = await mdatacard.PaywithCard(dtcardp);
    return dtc;
}
module.exports = { salerecord, paycard};