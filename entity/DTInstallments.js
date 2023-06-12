class DTInstallments
{
    _dtidi = 0;
    _numberfee = 0;
    get numberfee() {
        return this._numberfee;
    }
    set numberfee(value) {
        this._numberfee = value;
    }
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
    constructor(id,numberfee, numbercard, amount)
    {
        this.numberfee = numberfee;
        this.dtidi = id;
        this.dtnumbercard = numbercard;
        this.dtamount = amount;
    }

}
module.exports = { DTInstallments };