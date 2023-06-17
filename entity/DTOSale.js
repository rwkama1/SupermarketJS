class DTOSale
{
    IdSale=0 ;
	Sale_Date=new Date() ;
	Subtotal=0;
	PaymentMethod="";
	Vat =0;
	Total_amount=0;
	Observation ="";
	Statee="";
	IdCustomer=0;
   
     constructor()
     {
          
     }
}
module.exports = { DTOSale };