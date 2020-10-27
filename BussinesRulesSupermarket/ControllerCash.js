//const connection = require('../DataSupermarket/ConectionMSSQ')
const modulesale = require("./Entity/Sale");
//const moduleproduct = require("./Entity/Product");
//const moduledtdetailsale = require("../EntitySupermarket/DTDetailSale");
//const moduledtsale = require("../EntitySupermarket/DTSale");
const modulepayment = require('../PaymentGateway/paymentgateway')
const catalogue = require("./Catalogue");
const msalerecord = require("./SalesRecord")
//const DTDetailSale = require("../EntitySupermarket/DTDetailSale");

    var _Sale = new modulesale.Sale();
    function getSale() {
        return _Sale;
    }
    function setSale(s) {
        _Sale = s;
}

    async function startsale()
    {
        try {
            var startsalee = await  new modulesale.Sale();
            setSale(startsalee);
            return "A sale started"
        }
        catch (e)
        {
            return e.message;
        }
    }
    async function registerproductforsale(id, quantity)
    {
        try {
        var dtdetailsalerp ;
        var catp;
        var salerp = getSale();
        if (salerp != null && id >= 1 && quantity >= 1)
        {
            var estado = salerp.StateS;
            if (estado == "Open")
            {
                catp = await catalogue.getCatalogueProduct(id);
                if (catp != null) {
                    dtdetailsalerp = salerp.registerDetailSale(catp, quantity);
                }
            }
        }
            return dtdetailsalerp;
        }
        catch (e) {
            return e.message;
        }
     }
    async function closesale()
     {
       try {
           
           var salecl =  await getSale();
           var dtsale = null;
           if (salecl != null) {
               var state = salecl.StateS;
               if (state == "Open") {
                   salecl.closesale();
                   dtsale = salecl.getDataType();
               }
           }

           return dtsale;
       }
     catch (e) {
       return e.message;
       }
}
    async function payCash(amountdeli)
{
    var returned = -1;
    var salecash = getSale();
    if (salecash != null)
    {
        var state = salecash.StateS
        if (state == "Closed")
        {
            var boolhaveds = salecash.haveds();
            if (boolhaveds)
            {
                var returned = salecash.calculatereturned(amountdeli);
                if (returned >= 0)
                {
                    salecash.collect();
                    var dtsalecash=salecash.getDataType();
                    var rs = await msalerecord.salerecord(dtsalecash);
                    
                    setSale(null);
                }
            }
        }
    }
    return returned;
}
    async function payCard(numbercard,customerid,amountfees) {
    var accepted = false;
    var salecard = getSale();
    if (salecard != null && numbercard >= 1 && customerid >= 1 && amountfees >= 1) {
        var state = salecard.StateS
        if (state == "Closed") {
            var boolhaveds = salecard.haveds();
            if (boolhaveds) {
                var total = salecard.TotalS;
                accepted = modulepayment.checkcard(numbercard, customerid, amountfees,total);
                if (accepted) {
                    salecard.collectcard(numbercard, customerid, amountfees);
                    var dtsaled = salecard.getDataType();
                    var carddatatype = salecard.cardPayment.getDataType();
                    var rcard = await msalerecord.paycard(carddatatype);
                    var rs = await msalerecord.salerecord(dtsaled);
                    setSale(null);
                }
            }
        }
    }
    return accepted;
}
    async function cancelSale()
{
    var salecancel =  await getSale();
    if (salecancel != null)
    {
        var statec = salecancel.StateS;
        if (statec == "Closed")
        {
            setSale(null);
            return "Sale was canceled"
           
        }
        }
   
        
}


//var cp = salecard.cardPayment;
//var dtcardpayment = cp.getDataType();
    //var rcp = await msalerecord.paycard(dtcardpayment);
module.exports = { startsale, registerproductforsale, closesale, payCash, payCard, cancelSale };
//startsale().then(datast => {
//    console.log(datast)
//    registerproductforsale(2, 1).then(datad1 => {
//    })
//    registerproductforsale(8, 2).then(datad1 => {
//        closesale().then(datac => {
//            //modulecontroller.cancelSale().then(datacan => {
//            //    console.log(datacan);

//            //})
//            console.log(datac);
//            payCard('6011958149773510', 589875549, 3).then(databool => {
//                if (databool == true) {
//                    console.log("Card accepted, and the sale was registered successfully");

//                }
//                if (databool == false) {
//                    console.log("Rejected card!!!");
//                }
//            })
//            //modulecontroller.payCash(1000).then(datapc => {
//            //    if (datac.TotalS > 1000) {
//            //        console.log("The total of the sale is greater than the amount delivered");
//            //    }
//            //    else {
//            //        console.log("Redelivered: " + datapc)
//            //        printticket(datac).then(datad => {
//            //        })
//            //    }
//            //})
//        })
//    })
//})

