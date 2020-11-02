# SuperMarketJS

This package contains a backend of what would be the logic of a supermarking software, the architecture used is made in 3 layers.


## Installation



Use the package manager [npm](https://www.npmjs.com/) to install SuperMarket.



```bash

npm install supermarketjs
```



## Usage



```Javascript

const modulecontroller = require('supermarketjs/BussinesRulesSupermarket/ControllerCash');
const getProducts = require('supermarketjs/BussinesRulesSupermarket/Catalogue');
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

//https://herramientas-online.com/generador-tarjeta-credito-cvv.php
//6011958149773510
//4697720585000063
//5566413601388085

```


## Usage 2
```
const modulecontroller = require('supermarketjs/BussinesRulesSupermarket/ControllerCash');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
   
    res.send('Welcome to the Supermarket');

});
router.get('/startsale', async function (req, res) {
    var start = await modulecontroller.startsale();
    res.send(start);
   
});
router.get('/registerproductsale', async function (req, res) {
    /*
     Postman: Body => Raw JSON
     {
     "name":"Ketchup",
     "quantity":1
      }
     */
    var regist = await modulecontroller.registerproductforsale(req.body.name, req.body.quantity);
    res.send(regist);
});
router.get('/closesale', async function (req, res) {
    var close = await modulecontroller.closesale();
    res.send(close);
});
router.get('/paycash', async function (req, res) {
    var paycash = await modulecontroller.payCash(req.body.amount);
    res.send('Redelivered: ' + paycash);
});
/*
Postman: Body => Raw JSON
{
"numbercard":"4697720585000063",
"customer":456464,
"amountfees":3
}
*/
router.get('/paycard', async function (req, res) {

    var paycard = await modulecontroller.payCard(req.body.numbercard, req.body.customer, req.body.amountfees);
    if (paycard == true) {
        res.send('Card accepted, and the sale was registered successfully');
    }
    else
    {
        res.send("Rejected card!!!");
    }

});
router.get('/cancelsale', async function (req, res) {

    var cancel = await modulecontroller.cancelSale();
    res.send(cancel);
});




```

## Contributing 


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



## License


[MIT](https://choosealicense.com/licenses/mit/)




