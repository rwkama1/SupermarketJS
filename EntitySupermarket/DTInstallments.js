class DTInstallments
{
    _dtidi = 0;
    get dtidi() {
        return this._dtidi;
    }
    set dtidi(value) {
        this._dtidi = value;
    }
    _dtnumbercard = "";
    get dtnumbercard() {
        return this._dtnumbercard;
    }
    set dtnumbercard(value) {
        this._dtnumbercard = value;
    }
    _dtamount = 0;
    get dtamount() {
        return this._dtamount;
    }
    set dtamount(value) {
        this._dtamount = value;
    }
    constructor(id, number, amount)
    {
       this.dtidi = id;
        this.dtnumbercard = number;
        this.dtamount = amount;
    }

}
module.exports = { DTInstallments };