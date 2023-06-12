const dbconection = require('./ConectionMSSQ').clientcon;
//const DTI = require('../EntitySupermarket/DTInstallments')
//const DTCard = require('../EntitySupermarket/DTPayCard')

async function PaywithCard(dtcard) {
    const conection = await dbconection
    try {



        const colsale = await conection.db("BDSupermarket").collection("PayCard");
        const result = await colsale.insertOne(dtcard);

        for (var dtfees of dtcard.dtarrayinstallments) {
            let query = { NumberFee: dtfees.numberfee, NumberCard: dtfees.dtnumbercard, Amount: dtfees.dtamount};
            const coldetailsale = await conection.db("BDSupermarket").collection("Fees").insertOne(query);
        }
      
        return "Added PayCard " + result.insertedId;

    }
    catch (e) {
        return e.message
    }
}
module.exports = { PaywithCard };
  