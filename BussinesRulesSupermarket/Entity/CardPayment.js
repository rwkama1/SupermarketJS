const moduleins = require('../Entity/Installments')
const moduledtcardpayment = require('../../EntitySupermarket/DTPayCard')
class CardPayment {
    _numbercard = "";
    get numbercard() {
        return this._numbercard;
    }
    set numbercard(value) {
        this._numbercard = value;
    }
    _customerid = 0;
    get customerid() {
        return this._customerid;
    }
    set customerid(value) {
        this._customerid = value;
    }
    _carrayinstallments = [];
    get carrayinstallments() {
        return this._carrayinstallments;
    }
    set carrayinstallments(value) {
        this._carrayinstallments = value;
    }
   
    constructor(number, customer, quantityins,total) {
        
        this.numbercard = number;
        this.customerid = customer;
        var carrayi = [];
        this.carrayinstallments = carrayi;
        var amount = total / quantityins;
        for (var i = 1; i <= quantityins; i++)
        {
            var inst = new moduleins.Installments(i, number,amount);
           carrayi.push(inst);
        }
    }
    getDataType() {
        var array = [];
        for (var ins of this.carrayinstallments) {
            array.push(ins.getDataType());
        }
        return new moduledtcardpayment.DTCardPayment(0, this.numbercard, this.customerid, array)
    }
}
module.exports = { CardPayment };