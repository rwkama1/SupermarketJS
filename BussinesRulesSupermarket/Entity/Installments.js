const moduledtins = require('../../EntitySupermarket/DTInstallments')
class Installments {
   
    _Idi = 0;
    get Idi() {
        return this._Idi;
    }
    set Idi(value) {
        this._Idi = value;
    }
    _NumberCI = "";
    get NumberCI() {
        return this._NumberCI;
    }
    set NumberCI(value) {
        this._NumberCI = value;
    }
    _AmountI = 0;
    get AmountI() {
        return this._AmountI;
    }
    set AmountI(value) {
        this._AmountI = value;
    }

    constructor(id,number, amount) {
        this.Idi = id;
        this.NumberCI = number;
        this.AmountI = amount;
    }
    getDataType() {
        return new moduledtins.DTInstallments(0,this.Idi, this.NumberCI, this.AmountI);
    }
}
module.exports = { Installments };