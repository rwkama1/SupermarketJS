const modulecard = require("card-validator");
function checkcard(number,customerid,quantityinst,total)
{
    var numberValidation = modulecard.number(number);
    return numberValidation.isValid
}
module.exports = { checkcard };
//console.log(checkcard("5390700823285988"))