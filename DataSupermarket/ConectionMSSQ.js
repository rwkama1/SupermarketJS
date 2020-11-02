const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rwkamandriw:IF3JJQIm00NdGzcq@carlosrodriguezcluster.eaywr.mongodb.net/BDSupermarket?retryWrites=true&w=majority";

const clientcon = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect()
    .then(mongoclient => {
        console.log('Connected to MongoDB')
        return mongoclient
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = { clientcon };


