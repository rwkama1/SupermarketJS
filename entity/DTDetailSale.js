class DTDetailSale {
    _IdDS = 0;
    _QuantityDS = 0;
    _AmountDS = 0;
    _ProductDS = "";

    get AmountDS() {
        return this._AmountDS;
    }
    set AmountDS(value) {
        this._AmountDS = value;
    }
   

    get IdDS() {
        return this._IdDS;
    }
    set IdDS(value) {
        this._IdDS = value;
    }
   
    get QuantityDS() {
        return this._QuantityDS;
    }
    set QuantityDS(value) {
        this._QuantityDS = value;
    }
    
    get ProductDS() {
        return this._ProductDS;
    }
    set ProductDS(value) {
        this._ProductDS = value;
    }
    constructor(idds,qunatityds,amountds,productds) {
        this.IdDS = idds;
        this.AmountDS = amountds;
        this.QuantityDS = qunatityds;
        this.ProductDS = productds;
    }


}
module.exports = { DTDetailSale };