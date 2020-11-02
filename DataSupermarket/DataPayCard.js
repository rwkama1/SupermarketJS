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
    //queryinsert = "insert into CardPayment values (@number,@customer)"

    //try {
    //    const pool = await connection.poolPromise
    //    const result = await pool.request()
    //        .input('number', connection.sql.VarChar, dtcard.dtnumbercard)
    //        .input('customer', connection.sql.BigInt, dtcard.dtcustomerid)
    //        .query(queryinsert)
    //    for (var dti of dtcard.dtarrayinstallments) {
    //        querydts = "insert into Fees values (@numberfee,@numbercard,@amount)"
    //        const resultdts = await pool.request()
    //            .input('numberfee', connection.sql.Int, dti.numberfee)
    //            .input('numbercard', connection.sql.VarChar, dtcard.dtnumbercard)
    //            .input('amount', connection.sql.Money, dti.dtamount)
    //            .query(querydts)
    //    }
    //    if (result.rowsAffected == 0) {
    //        return "The card could not be inserted, the data may have been entered incorrectly";
    //    }
    //    return "The card was inserted successfully";

    //} catch (error) {

    //    return error.message;
    //}
//var arraydts = [];

//var DTCards = new DTCard.DTCardPayment(0, '54646', 656566, arraydts);
//arraydts.push(new DTI.DTInstallments(1, '54646', 200));
//arraydts.push(new DTI.DTInstallments(2, '54646', 200));
//PaywithCard(DTCards).then(datar => {
//    console.log(datar)
//})