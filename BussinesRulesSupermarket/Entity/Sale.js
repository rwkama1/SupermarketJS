const moduledts = require("./DetailSale");
const moduelcardpayment = require("./CardPayment");
const modulesale = require("../../EntitySupermarket/DTSale");

const LDS = require("./DetailSale");
class Sale {
    _IdS = 0;
    _StateS = "";
    _SubtotalS = 0.00;
    _TaxesS = 0.00;
    _TotalS = 0.00;
    _ArrayDetailSale = [];
    _cardPayment = new moduelcardpayment.CardPayment("", 0, 0, 0);;
    get cardPayment() {
        return this._cardPayment;
    }
    set cardPayment(value) {
        this._cardPayment = value;
    }
    

    get IdS() {
        return this._IdS;
    }
    set IdS(value) {
        this._IdS = value;
    }

    get StateS() {
        return this._StateS;
    }
    set StateS(value) {
        this._StateS = value;
    }

    get SubtotalS() {
        return this._SubtotalS;
    }
    set SubtotalS(value) {
        this._SubtotalS = value;
        var taxes = this._SubtotalS * 0.22;
        this.TaxesS = taxes;
        this.TotalS = (this._SubtotalS + taxes);
    }

    get TaxesS() {
        return this._TaxesS;
    }
    set TaxesS(value) {
        this._TaxesS = value;
    }

    get TotalS() {
        return this._TotalS;
    }
    set TotalS(value) {
        this._TotalS = value;
    }

    get ArrayDetailSale() {
        return this._ArrayDetailSale;
    }
    set ArrayDetailSale(value) {
        this._ArrayDetailSale = value;
    }

    constructor() {
        this.IdS = 0;
        this.StateS = "Open";
        this.SubtotalS = 0;
        this.ArrayDetailSale = [];
    }
    registerDetailSale(product, quantity)
    {

        var ds = new LDS.DetailSale(product, quantity)

        this.ArrayDetailSale.push(ds);
        var dtdet = ds.getDataType();
        return dtdet;
    }
    closesale()
    {
        var details = this.ArrayDetailSale;
        var subtotal = 0;
        for (var d of details)
        {
            subtotal += d.amountds();
        }
        this.SubtotalS = subtotal;
        this.StateS = "Closed";

    }
    haveds()
    {
        var ds = this.ArrayDetailSale;
        var bolds = ds.length > 0;
        return bolds
    }

    calculatereturned(amdeli)
    {
        var total = this.TotalS;
        return amdeli - total;
    }
    collect()
    {
        this.StateS = "Collected";
    }
    collectcard(numbercard, customeridd, quantityinst) {
        var total = this.TotalS;
        var cardpaymentt = new moduelcardpayment.CardPayment(numbercard, customeridd, quantityinst, total);
        this.cardPayment = cardpaymentt;
        this.StateS = "Collected";
    }
    getDataType()
    {
        var array = [];
        for (var dl of this.ArrayDetailSale)
        {
            array.push(dl.getDataType());
        }
        return new modulesale.DTSale(0, this.StateS, this.SubtotalS, this.TaxesS, this.TotalS, array, this.cardPayment.numbercard);
    }  
    //getDataTypeCard() {
    //    var array = [];
    //    for (var dl of this.ArrayDetailSale) {
    //        array.push(dl.getDataType());
    //    }
    //    return new modulesale.DTSale(0, this.StateS, this.SubtotalS, this.TaxesS, this.TotalS, array, this.cardPayment.numbercard);
    //}  

}
module.exports = { Sale };