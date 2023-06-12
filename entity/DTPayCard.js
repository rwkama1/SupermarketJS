class DTCardPayment
{
    _dtidc = 0;
    get dtidc() {
        return this._dtidc;
    }
    set dtidc(value) {
        this._dtidc = value;
    }
   
    _dtnumbercard = "";
    get dtnumbercard() {
        return this._dtnumbercard;
    }
    set dtnumbercard(value) {
        this._dtnumbercard = value;
    }
  
    _dtcustomerid = 0;
    get dtcustomerid() {
        return this._dtcustomerid;
    }
    set dtcustomerid(value) {
        this._dtcustomerid = value;
    }
   
    _dtarrayinstallments = [];
    get dtarrayinstallments() {
        return this._dtarrayinstallments;
    }
    set dtarrayinstallments(value) {
        this._dtarrayinstallments = value;
    }
    constructor(id, number, customer, array)
    {
        this.dtidc = id;
        this.dtnumbercard = number;
        this.dtcustomerid = customer;
        this.dtarrayinstallments = array;
    }

}
module.exports = { DTCardPayment };