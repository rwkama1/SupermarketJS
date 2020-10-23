const dataproducts = require('../DataSupermarket/DataProduct')
const moduledtproduct = require('../EntitySupermarket/DTProduct')
const moduleproduct = require('./Entity/Product')

//async function getCatalogueProducts()
//{
//    return await Promise.resolve(dataproducts.getProducts());
//}
async function getCatalogueProduct(id) {
   
   var dataproduct = await dataproducts.getProduct(id);
   var lproduct = new moduleproduct.Product(dataproduct.IdP, dataproduct.NameP, dataproduct.PriceP);
   return lproduct;
}
module.exports = {  getCatalogueProduct };

//getCatalogueProduct(7).then(console.log);

//var p = new moduleentiy.DTProducto(0, '', 0);
//var asd =
//console.log(asd);
//getCatalogueProduct(5).then(data => {
//    console.log(data)
//})
