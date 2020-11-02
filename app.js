const modulecontroller = require('./BussinesRulesSupermarket/ControllerCash');
const getProducts = require('./BussinesRulesSupermarket/Catalogue');
//getProducts.getCatalogueProducts().then(data => {
//    console.log(data)
//})
//getProducts.getCatalogueProductsExpression("Juice").then(data => {
//    console.log(data)
//})
modulecontroller.startsale().then(datast => {
    console.log(datast)
    modulecontroller.registerproductforsale("Ice Cream", 2).then(datad1 => { console.log(datad1) });
    modulecontroller.registerproductforsale("Ketchup", 2).then(datad2 => {
        console.log(datad2)
        modulecontroller.closesale().then(datac => {
            //modulecontroller.cancelSale().then(datacan => {
            //    console.log(datacan);

            //})
            console.log(datac);
            modulecontroller.payCard('5566413601388085', 589875549, 3).then(databool => {
                if (databool == true) {
                    console.log("Card accepted, and the sale was registered successfully");
                    printticket(datac).then(datad => {
                    })

                }
                if (databool == false) {
                    console.log("Rejected card!!!");
                }
            })
            //modulecontroller.payCash(1000).then(datapc => {
            //    if (datac.TotalS > 1000) {
            //        console.log("The total of the sale is greater than the amount delivered");
            //    }
            //    else {
            //        console.log("Redelivered: " + datapc)
            //        printticket(datac).then(datad => {
            //        })
            //    }
            //})

        })
    })
})
async function printticket(dtsale) {
    console.log("\n\n Your ticket:\n");

    console.log("----------------------\n")
    console.log("S U P E R M A R K E T")
    console.log("\n----------------------\n")

    for (var ds of await dtsale.ArrayDTDetailSale) {
        console.log(ds.ProductDS + " x " + ds.QuantityDS + "  " + ds.AmountDS)
    }
    console.log("\n----------------------")

    console.log("Subtotal:  " + dtsale.SubtotalS);
    console.log("Taxes:  " + dtsale.TaxesS);
    console.log("Total:  " + dtsale.TotalS);

    console.log("\n----------------------")

}



