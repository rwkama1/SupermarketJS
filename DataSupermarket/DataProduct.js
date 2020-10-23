const connection = require('./ConectionMSSQ')
const DTProduct = require('../EntitySupermarket/DTProduct')
    
async function getProducts() {
    querylist = "select * from Producto"
    try {
        const pool = await connection.poolPromise
        const result = await pool.request()
            .query(querylist)
        let arrayp = [];
        for (var x of result.recordset) {
            product = new DTProduct.DTProducto(x.IdP,x.NameP,x.PriceP)
            arrayp.push(product);
        }
        return arrayp;

    } catch (error) {

        return error.message;
    }
}
async function getProduct(id) {
    querysearch = "select * from producto where IdP=@idp"
    try {
        const pool = await connection.poolPromise
        const result = await pool.request()
            .input('idp', connection.sql.Int, id)
            .query(querysearch)
        product = new DTProduct.DTProducto(result.recordset[0].IdP, result.recordset[0].NameP, result.recordset[0].PriceP);
        return product;

    } catch (error) {

        return error.message;
    }
}

//getProducts().then(data => {
//    console.log(data)
//})
module.exports = { getProducts, getProduct };

//getProduct(5).then(data => {
//    console.log(data)
//})
//}