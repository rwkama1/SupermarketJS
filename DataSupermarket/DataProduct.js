const dbconection = require('./ConectionMSSQ').clientcon;
const DTProduct = require('../EntitySupermarket/DTProduct').DTProducto;
    
async function getProducts() {
    const conection = await dbconection
    try {

        //let query = { Namep: 'Ketchup' }

        const collection = conection.db("BDSupermarket").collection("Product");
        const result = await collection.find({}).toArray();
        let array = [];
        for (var p of result) {
            var obj = new DTProduct(p._id, p.Namep, p.PriceP)
            array.push(obj);
        }
        return array;
        conection.close();


    }
    catch (e) {
        return e.message
    }

}
async function getProductsExpression(expression) {
    const conection = await dbconection
    try {

        //let query = { Namep: /^expression/ };
        let query = {Namep: { $regex: expression } }
       const collection = conection.db("BDSupermarket").collection("Product");
       const result = await collection.find(query).toArray();
       let array =[];
       for (var p of result) {
            var obj = new DTProduct(p._id, p.Namep, p.PriceP)
            array.push(obj);
        }
        return array;
        conection.close();


    }
    catch (e) {
        return e.message
    }

}
async function getProduct(name) {
    //const conection =await  dbconection.connect();
    const conection = await dbconection
    try {

        let query = { Namep: name }
        const collection = conection.db("BDSupermarket").collection("Product");
        const p = await collection.findOne(query);
        var obj = new DTProduct(p._id, p.Namep, p.PriceP);
        return obj;
        conection.close();

    }
    catch (e) {
        return e.message
    }
}

//getProducts().then(data => {
//    console.log(data)
//})
//getProductsExpression("").then(data => {
//    console.log(data)
//})
module.exports = { getProduct, getProducts, getProductsExpression };

//getProduct("Ketchup").then(data => {
//    console.log(data)
//})
