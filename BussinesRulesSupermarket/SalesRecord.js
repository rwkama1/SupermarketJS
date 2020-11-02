const registerSale = require('../DataSupermarket/DataSale').registerSale;
const mdatacard = require('../DataSupermarket/DataPayCard');
async function salerecord(sale) {

    var rs = await registerSale(sale);
    return rs;
}
async function paycard(dtcardp) {

    var dtc = await mdatacard.PaywithCard(dtcardp);
    return dtc;
}
module.exports = { salerecord, paycard};