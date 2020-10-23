class DTProducto {
    _IdP = 0;
    get IdP() {
        return this._IdP;
    }
    set IdP(value) {
        this._IdP = value;
    }
    _NameP = "";
    get NameP() {
        return this._NameP;
    }
    set NameP(value) {
        this._NameP = value;
    }
    _PriceP = 0.00;
    get PriceP() {
        return this._PriceP;
    }
    set PriceP(value) {
        this._PriceP = value;
    }

    constructor(idproducto, nameproduct, priceproduct) {
        this.IdP = idproducto;
        this.NameP = nameproduct;
        this.PriceP = priceproduct;
    }
}
module.exports = { DTProducto };