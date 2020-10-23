const DTDetailSale = require("../../EntitySupermarket/DTDetailSale");
const Product = require("./Product");
class DetailSale {
    _quantityds = 0;
    _product = new Product.Product(0,"",0);

    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
    }
    get quantityds() {
        return this._quantityds;
    }
    set quantityds(value) {
        this._quantityds = value;
    }
     amountds() {
        var quantity = this.quantityds;
        var p = this.product;
        var price = p.PriceP;
        return quantity * price;
    }
    

    constructor(product,quantity) {
        this.product = product;
        this.quantityds = quantity;
       
    }
    getDataType()
    {
        return new DTDetailSale.DTDetailSale(0, this.quantityds, this.amountds(), this.product.NameP);
    }

}
module.exports = { DetailSale };