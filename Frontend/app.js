const modulecontroller = require('../BussinesRulesSupermarket/ControllerCash');
modulecontroller.startsale().then(datast => {
    console.log(datast)
    modulecontroller.registerproductforsale(2, 1).then(datad1 => {
    })
    modulecontroller.registerproductforsale(1, 1).then(datad1 => {
    })
    modulecontroller.registerproductforsale(3, 2).then(datad1 => {
    })
    modulecontroller.registerproductforsale(4, 1).then(datad1 => {
    })
    modulecontroller.registerproductforsale(5, 3).then(datad1 => {
    })
    modulecontroller.registerproductforsale(8, 2).then(datad1 => {
        modulecontroller.closesale().then(datac => {
           //modulecontroller.cancelSale().then(datacan => {
            //    console.log(datacan);

            //})
           console.log(datac);
           modulecontroller.payCard('4798609207652120', 58987554, 3).then(databool => {
                if (databool == true)
                {
                    console.log("Card accepted, and the sale was registered successfully");
                    printticket(datac).then(datad1 => {
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

    for (var ds of await dtsale.ArrayDTDetailSale)
    {
        console.log(ds.ProductDS + " x " + ds.QuantityDS + "  " + ds.AmountDS)
    }
    console.log("\n----------------------")

    console.log("Subtotal:  " + dtsale.SubtotalS);
    console.log("Taxes:  " + dtsale.TaxesS);
    console.log("Total:  " + dtsale.TotalS);

    console.log("\n----------------------")

}
//https://herramientas-online.com/generador-tarjeta-credito-cvv.php
//6011958149773510
//4697720585000063
//5566413601388085
