class DTSale {
    _IdS = 0;
    _StateS = "";
    _SubtotalS = 0.00;
    _TaxesS = 0.00;
    _TotalS = 0.00;
    _ArrayDTDetailSale = [];
    _cardpayment = "";
    get cardpayment() {
        return this._cardpayment;
    }
    set cardpayment(value) {
        this._cardpayment = value;
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

    get ArrayDTDetailSale() {
        return this._ArrayDTDetailSale;
    }
    set ArrayDTDetailSale(value) {
        this._ArrayDTDetailSale = value;
    }

    constructor(ids, states, subtotals, taxess, totals, arraydetailsale,card) {
        this.IdS = ids;
        this.StateS = states;
        this.SubtotalS = subtotals;
        this.TaxesS = taxess;
        this.TotalS = totals;
        this.ArrayDTDetailSale = arraydetailsale;
        this.cardpayment = card;
       

    }


}
module.exports = { DTSale };