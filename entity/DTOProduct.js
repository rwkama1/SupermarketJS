class DTOProduct
{
    IdProduct=0;
	NameProduct="";
	DescriptionProduct="";
	UrlImg="";
	PriceProduct=0; 
	Manufacturer="";
	CountryOfOrigin=""; 
	StockProduct=0; 
	Entry_date=new Date();	
	Expiration_date=new Date(); 
	Rating=0;	
	Active=true;	
	SupplierId=0; 
	IdCategory=0;

     constructor()
     {
          
     }
}
module.exports = { DTOProduct };