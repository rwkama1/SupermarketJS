const modulecontroller = require("../../BussinesRulesSupermarket/ControllerCash");
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
     "id":2,
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
router.get('/paycard', async function (req, res) {

    var paycard = await modulecontroller.payCard(req.body.numbercard, req.body.customer, req.body.amountfees);
    if (paycard == true) {
        res.send('Card accepted, and the sale was registered successfully');
    }
    else {
        res.send("Rejected card!!!");
    }

});
router.get('/cancelsale', async function (req, res) {

    var cancel = await modulecontroller.cancelSale();
    res.send(cancel);
});

module.exports = router;
