
const { DTOCustomer } = require("./entity/DTOCustomer");
const { DataCustomer } = require("./data/DataCustomer");
const { DataSuppliers } = require("./data/DataSuppliers");
const { DTOSuppliers } = require("./entity/DTOSuppliers");
const { DTOCategory } = require("./entity/DTOCategory");
const { DataCategory } = require("./data/DataCategory");
const { DataProduct } = require("./data/DataProduct");
const { DTOProduct } = require("./entity/DTOProduct");
const { DTOOffer } = require("./entity/DTOOffer");
const { DataOffer } = require("./data/DataOffer");
const { DataRatingsProduct } = require("./data/DataRatingProduct");
const { DataLoginCustomer } = require("./data/DataLoginCustomer");
const { DataAdministrator } = require("./data/DataAdministrator");
const { DTOAdministrator } = require("./entity/DTOAdministrator");
const { DataLoginAdmin } = require("./data/DataLoginAdmin");
const { DTOSale } = require("./entity/DTOSale");
const { DataSale } = require("./data/DataSale");


//#region ADMIN

//  async function registerAdmin() {
//         for (let index = 1; index < 100; index++) {

//             let dtoadmin = new DTOAdministrator();
         
//             dtoadmin.NameAdmin = "User" + index.toString();
//             dtoadmin.UserrName = "Username" + index.toString();
//             dtoadmin.Passwordd = "password" + index.toString();
     

//             let registercustomer = await DataAdministrator.registerAdmin(dtoadmin);
//             if (registercustomer===-1) {
//                 throw new
//                  Error("The username already exists");
//             }
//             if (registercustomer===-2) {
//                 throw new 
//                 Error("Username must have more than 8 characters");
//             }
//             if (registercustomer===-3) {
//                 throw new 
//                 Error("Passwordd must have more than 8 characters");
//             }
//             console.log("The admin was registered successfully");
//         }
//     }
//     registerAdmin().then()

//  async function updateNameAdmin() {
//             let dtoadmin = new DTOAdministrator();
//             dtoadmin.IdAdministrator =  3;
//             dtoadmin.NameAdmin = "User1";
            
//             let updateNameAdmin = await 
//             DataAdministrator.updateNameAdmin(dtoadmin);
//             if (updateNameAdmin===-1) {
//                 throw new
//                  Error("The idadmin does not  exists");
//             }
           
//             console.log("Admin update successfully");
//     }
//     updateNameAdmin().then()

//  async function updatePassword() 
//  {
           
            
//             let idadmin=4;
//             let newpassword="password44";
//             let currentpassword="password4";
//             let updatePassword = await 
//             DataAdministrator.updatePassword(idadmin,newpassword,currentpassword);
//             if (updatePassword===-1) {
//                 throw new Error("Incorrect idadmin and/or password");
//             }
//             if (updatePassword===-2) {
//                 throw new 
//                 Error("Passwordd must have more than 8 characters");
//             }
           
//             console.log("Password update successfully");
// }
// updatePassword().then()

    //   async function deleteAdmin() {
        

    //         let deleteAdmin = await DataAdministrator.deleteAdmin(2);
    //         if (deleteAdmin===-1) {
    //             throw new
    //              Error("The idadmin does not exists");
    //         }
           
    //         console.log("Administrator delete successfully");
    //     }
   
    //     deleteAdmin().then()

//#region ADMIN
//#region CUSTOMERS

    // async function registerCustomer() {
    //     for (let index = 300; index < 500; index++) {

    //         let dtocustomer = new DTOCustomer();
    //         dtocustomer.namecustomer = "User" + index.toString();
    //         dtocustomer.userrname = "Username" + index.toString();
    //         dtocustomer.password = "password" + index.toString();
    //         dtocustomer.streetname = "streetname" + index.toString();
    //         dtocustomer.streetnumber = "1111" + index.toString();
    //         dtocustomer.unit_apartament = "1111" + index.toString();
    //         dtocustomer.city = "City" + index.toString();
    //         dtocustomer.statee = "Statee" + index.toString();
    //         dtocustomer.phone = "1111" + index.toString();
    //         dtocustomer.email = "email" + index.toString() + "@gmail.com";


    //         let registercustomer = await DataCustomer.registerCustomer(dtocustomer);
    //         if (registercustomer===-1) {
    //             throw new
    //              Error("The username already exists");
    //         }
    //         if (registercustomer===-2) {
    //             throw new 
    //             Error("Username must have more than 8 characters");
    //         }
    //         if (registercustomer===-4) {
    //             throw new
    //              Error("The email already exists");
    //         }
    //         if (registercustomer===-3) {
    //             throw new 
    //             Error("Passwordd must have more than 8 characters");
    //         }
    //         console.log("The customer registered successfully");
    //     }
    // }
    // registerCustomer().then()



    //   async function updateCustomer() {
        

    //         let dtocustomer = new DTOCustomer();
    //         dtocustomer.idcustomer =  3;
    //         dtocustomer.namecustomer = "User0";
    //         dtocustomer.streetname = "streetname0" ;
    //         dtocustomer.streetnumber = "1111";
    //         dtocustomer.unit_apartament = "1111";
    //         dtocustomer.city = "City0";
    //         dtocustomer.statee = "Statee0";
    //         dtocustomer.phone = "000000" ;
    //         dtocustomer.email = "email0@gmail.com";


    //         let updateCustomer = await DataCustomer.updateCustomer(dtocustomer);
    //         if (updateCustomer===-1) {
    //             throw new
    //              Error("The idcustomer does not  exists");
    //         }
           
    //         console.log("Customer update successfully");
    //     }
   
    //     updateCustomer().then()




    //   async function updatePassword() {
    
    //         let idcustomer=4;
    //         let newpassword="password2";
    //         let currentpassword="password2";
    //         let updatePassword = await DataCustomer.updatePassword(idcustomer,newpassword,currentpassword);
    //         if (updatePassword===-1) {
    //             throw new Error("Incorrect idcustomer and/or password");
    //         }
    //         if (updatePassword===-2) {
    //             throw new 
    //             Error("Passwordd must have more than 8 characters");
    //         }
           
    //         console.log("Password update successfully");
    //     }
   
    //     updatePassword().then()




    //    async function deleteCustomer() {
        

    //         let deleteCustomer = await DataCustomer.deleteCustomer(3);
    //         if (deleteCustomer===-1) {
    //             throw new
    //              Error("The idcustomer does not exists");
    //         }
           
    //         console.log("Customer delete successfully");
    //     }
   
    //     deleteCustomer().then()

    //    async function getCustomerById() {
               
    //             let getCustomerById = 
    //             await DataCustomer.getCustomerById(4);
    //             console.log(getCustomerById);
    //     }
    //     getCustomerById().then()

 
//#endregion CUSTOMERS

//#region LOGIN ADMIN

    // async function loginAdmin() {
       

    //         let loginAdmin = await DataLoginAdmin.
    //         loginAdmin("Username4","password44");
    //         if (loginAdmin===-1) {
    //             throw new
    //              Error("The Password or Username is incorrect");
    //         }
           
    //         console.log(loginAdmin);
        
    // }
    // loginAdmin().then()

    // async function existLoginUser() {
       
    //     let existLoginAdmin = 
    //     await DataLoginAdmin.existLoginAdmin(4,"Username4")
    //     console.log(existLoginAdmin);
        
    // }
    // existLoginUser().then()



    // async function logoutAdmin() {
       

    //         let logout = await DataLoginAdmin.
    //         logout(4);
    //         if (logout===-1) {
    //             throw new
    //              Error("The User is not logged in");
    //         }
           
    //         console.log("The User has logged out");
        
    // }
    // logoutAdmin().then()



//#endregion LOGIN ADMIN

//#region LOGIN CUSTOMER

// async function loginCustomer() {
       

//             let loginCustomer = await DataLoginCustomer.
//             loginCustomer("Username3","password3");
//             if (loginCustomer===-1) {
//                 throw new
//                  Error("The Password or Username is incorrect");
//             }
           
//             console.log(loginCustomer);
        
//     }
//     loginCustomer().then()

    // async function existLoginCustomer() {
       
    //     let existLoginCustomer = 
    //     await DataLoginCustomer.existLoginCustomer(4,"Username2")
    //     console.log(existLoginCustomer);
        
    // }
    // existLoginCustomer().then()



    // async function logout() {
       

    //         let logout = await DataLoginCustomer.
    //         logout(4);
    //         if (logout===-1) {
    //             throw new
    //              Error("The User is not logged in");
    //         }
           
    //         console.log("The User has logged out");
        
    // }
    // logout().then()




//#endregion LOGIN CUSTOMER


//#region SUPPLIERS

    // async function registerSuppliers() {
    //     for (let index = 1; index < 100; index++) {

    //         let dtosuppliers = new DTOSuppliers();
    //         dtosuppliers.SupplierName = "SupplierName" + index.toString();
    //         dtosuppliers.AddressSupplier = "AddressSupplier" + index.toString();
    //         dtosuppliers.CitySupplier = "CitySupplier" + index.toString();
    //         dtosuppliers.StateSupplier = "StateSupplier" + index.toString();
    //         dtosuppliers.PhoneSupplier = "11111" + index.toString();
    //         dtosuppliers.EmailSupplier = "EmailSupplier" + index.toString() + "@gmail.com";

    //         let registerSuppliers = await DataSuppliers.registerSuppliers(dtosuppliers);
    //         if (registerSuppliers===-1) {
    //             throw new
    //              Error("The email already exists");
    //         }
           
    //         console.log("Supplier registered successfully");
    //     }
    // }
    // registerSuppliers().then()


    // async function updateSuppliers() {
       

    //         let dtosuppliers = new DTOSuppliers();
    //         dtosuppliers.SupplierId = 108;
    //         dtosuppliers.SupplierName = "SupplierName10";
    //         dtosuppliers.AddressSupplier = "AddressSupplier10";
    //         dtosuppliers.CitySupplier = "CitySupplier10" ;
    //         dtosuppliers.StateSupplier = "StateSupplier10" ;
    //         dtosuppliers.PhoneSupplier = "11111010" ;
          

    //         let updateSuppliers = await DataSuppliers.updateSuppliers(dtosuppliers);
    //         if (updateSuppliers===-1) {
    //             throw new
    //             Error("The idsupplier does not exist");
    //         }
           
    //         console.log("Supplier updated successfully");
       
    // }
    // updateSuppliers().then()



//#endregion SUPPLIERS

//#region CATEGORY

// async function registerCategory() {
     

           
//             let NameCategory = "NameCategory" ;
//             let DescrriptionCategory = "DescrriptionCategory" ;
//             let registerCategory = await DataCategory.registerCategory(NameCategory,DescrriptionCategory);
           
//             console.log("Category registered successfully");
       
//     }
//     registerCategory().then()


// async function updateCategory() {
        
//             let IdCategory = 2 ;
//             let NameCategory = "NameCategory0" ;
//             let DescrriptionCategory = "DescrriptionCategory0";
//             let updateCategory = await DataCategory.updateCategory(IdCategory,NameCategory,DescrriptionCategory);
//             if (updateCategory===-1) {
//                  throw new
//                  Error("The IdCategory does not exist");
//              }
//              console.log("Category updated successfully");
//     }
//    updateCategory().then()



//#endregion CATEGORY

//#region PRODUCT

// async function registerProduct() {
//         for (let index = 1; index < 29; index++) {

//            let dtoproduct=new DTOProduct();

//              dtoproduct.NameProduct = "NameProduct" + index.toString();
//              dtoproduct.DescriptionProduct = "DescriptionProduct" + index.toString();
//              dtoproduct.UrlImg = "UrlImg" + index.toString();
//              dtoproduct.PriceProduct = 40 + index;
//              dtoproduct.Manufacturer = "Manufacturer" + index.toString();
//              dtoproduct.CountryOfOrigin = "CountryOfOrigin" + index.toString();
//              dtoproduct.StockProduct = 50 + index;
//              dtoproduct.Entry_date = new Date(2023,05,index);
//              dtoproduct.Expiration_date = new Date(2023,10,index);
//              dtoproduct.SupplierId = 108+index;
//              dtoproduct.IdCategory = 2+index;

//             let registerProduct = await DataProduct.registerProduct(dtoproduct);
//             if (registerProduct===-1) {
//                 throw new
//                 Error("The idsupplier does not  exists");   
//             }
//             if (registerProduct===-2) {
//                 throw new
//                 Error("The idcategory does not  exists");   
//             }
           
//             console.log("Product registered successfully");
//         }
//     }
//     registerProduct().then()


// async function updateProduct() {
        

//            let dtoproduct=new DTOProduct();
//             dtoproduct.IdProduct = 61;
//              dtoproduct.NameProduct = "NameProduct0";
//              dtoproduct.DescriptionProduct = "DescriptionProduct0" ;      
//              dtoproduct.PriceProduct = 40 ;
//              dtoproduct.Manufacturer = "Manufacturer0";
//              dtoproduct.CountryOfOrigin = "CountryOfOrigin0" ;
//              dtoproduct.Entry_date = new Date(2023,05,8);
//              dtoproduct.Expiration_date = new Date(2023,10,10);
          

//             let updateProduct = await DataProduct.updateProduct(dtoproduct);
//             if (updateProduct===-1) {
//                 throw new
//                 Error("The idproduct does not  exists");   
//             }
            
           
//             console.log("Product updated successfully");
        
//     }
//     updateProduct().then()


    // async function deleteProduct() {
    
    //             let idproduct=61;

    //             let deleteProduct = await DataProduct.deleteProduct(idproduct);
    //             if (deleteProduct===-1) {
    //                 throw new
    //                 Error("The idproduct does not  exists");   
    //             }
                
               
    //             console.log("Stock deleted successfully");
            
    //     }
    //     deleteProduct().then()


    
    // async function addStock() {
    
    //             let idproduct=62;
    //             let quantity=3;
    //             let addStock = await DataProduct.addStock(idproduct,quantity);
    //             if (addStock===-1) {
    //                 throw new
    //                 Error("The idproduct does not  exists");   
    //             }
                
               
    //             console.log("Stock updated successfully");
            
    //     }
    //     addStock().then()

      
    // async function substractStock() {
    
    //             let idproduct=62;
    //             let quantity=2;
    //             let substractStock = await DataProduct.substractStock(idproduct,quantity);
    //             if (substractStock===-1) {
    //                 throw new
    //                 Error("The idproduct does not  exists");   
    //             }
                
               
    //             console.log("Product updated successfully");
            
    //     }
    //     substractStock().then()

        // async function getProductsOfferByCategory() {
        //         let idcategory=1;
        //         let getProductsByCategory = 
        //         await DataProduct.getProductsOfferByCategory(idcategory);
        //         console.log(getProductsByCategory);
        // }
        // getProductsOfferByCategory().then()

        //  async function getProductsOffer() {
               
        //         let getProductsOffer = 
        //         await DataProduct.getProductsOffer();
        //         console.log(getProductsOffer);
        // }
        // getProductsOffer().then()


        //  async function getSearchProducts() {
               
        //         let getSearchProducts = 
        //         await DataProduct.getSearchProducts();
        //         console.log(getSearchProducts);
        // }
        // getSearchProducts().then()


//    async function getProductById() {
               
//                 let getProductById = 
//                 await DataProduct.getProductById(62);
//                 console.log(getProductById);
//         }
//         getProductById().then()

//#endregion PRODUCT

//#region  PRODUCT RATINGS


// async function ratingProduct() {
    
//            let rating=3;
//            let idproduct=62;
//            let idcustomer=9;


//             let ratingProduct = await DataRatingsProduct.ratingProduct(idproduct,idcustomer,rating);
//             if (ratingProduct===-1) {
//                 throw new
//                 Error("The idproduct does not  exists");   
//             }
//             if (ratingProduct===-3) {
//                 throw new
//                 Error("The idcustomer does not  exists");   
//             }
//             if (ratingProduct===-2) {
//                 throw new
//                 Error("The rating must be 1 to 5");   
//             }
//             if (ratingProduct===2) {
//                 console.log("Product updated successfully");  
//             }
//             if (ratingProduct===1) {
//                 console.log("Product insert successfully");
//             }
//     }
//     ratingProduct().then()




//#endregion PRODUCT RATINGS
//#region  OFFERS


// async function registerOffer() {
       
      
//            let dtoffer=new DTOOffer();

//            dtoffer.DescriptionOffer = "DescriptionOffer";
//            dtoffer.DiscountPercentage =  20  ;
//            dtoffer.Startt_date ='2023-06-09' ;
//            dtoffer.End_date ='2023-06-30' ;
//            dtoffer.IdProduct=68;


//             let registerOffer = await DataOffer.registerOffer(dtoffer);
//             if (registerOffer===-1) {
//                 throw new
//                 Error("The idproduct does not  exists");   
//             }
//             if (registerOffer===-2) {
//                 throw new
//                 Error(" The end date must be greater than start date");   
//             }
//             if (registerOffer===-3) {
//                 throw new
//                 Error(" The offer already exists");   
//             }
         
           
//             console.log("Offer registered successfully");
     
      
//     }
//     registerOffer().then()


// async function updateOffer() {
       

//     let dtoffer=new DTOOffer();

//     dtoffer.DescriptionOffer = "DescriptionOffer2";
//     dtoffer.DiscountPercentage =  15  ;
//     dtoffer.Startt_date ='2023-06-09' ;
//     dtoffer.End_date ='2023-06-29' ;
//     dtoffer.IdProduct=62;


//      let updateOffer = await DataOffer.updateOffer(dtoffer);
//      if (updateOffer===-1) {
//          throw new
//          Error("The idproduct already exists in the offer");   
//      }
//      if (updateOffer===-2) {
//          throw new
//          Error(" The end date must be greater than start date");   
//      }
//      if (updateOffer===-3) {
//          throw new
//          Error(" The offer does not exists");   
//      }
  
    
//      console.log("Offer updated successfully");

// }
// updateOffer().then()

//#endregion OFFERS

//#region SALE


// async function registerSale() {
       
      
//            let dtosale=new DTOSale();

//            dtosale.PaymentMethod = "Cash";
//            dtosale.Observation = "Observation"  ;
//            dtosale.IdCustomer = 4  ;
//            dtosale.Vat =15 ;

//             let arraydetailsale=[];
//             arraydetailsale.push({quantity:1,priceproduct:41,idproduct:61})
//              arraydetailsale.push({quantity:2,priceproduct:43,idproduct:63})
//              arraydetailsale.push({quantity:3,priceproduct:44,idproduct:64})
          
//             let registerOnlineSale = await DataSale.registerOnlineSale(dtosale,arraydetailsale);
//             if (registerOnlineSale===-1) {
//                 throw new
//                 Error(" The customer does not exists");   
//              }
//             console.log(" The sale was registered successfully");
     
      
//     }
//     registerSale().then()


// async function confirmSale() {
       
      
             
//               let idsale=8;
              
//                 let confirmSale = await
//                  DataSale.confirmSale(idsale);
//                 if (confirmSale===-1) {
//                     throw new
//                     Error(" The sale does not exists");   
//                  }
//                 console.log(" The sale was confirmed successfully");
         
          
//         }
//         confirmSale().then()

// async function deliverSale() {
       
      
             
//               let idsale=8;
              
//                 let deliverSale = await
//                  DataSale.deliverSale(idsale);
//                 if (deliverSale===-1) {
//                     throw new
//                     Error(" The sale does not exists");   
//                  }
//                 console.log(" The sale was delivered successfully");
         
          
//         }
//         deliverSale().then()

// async function cancelSale() {
       
      
             
//     let idsale=8;
    
//       let cancelSale = await
//        DataSale.cancelSale(idsale);
//       if (cancelSale===-1) {
//           throw new
//           Error(" The sale does not exists");   
//        }
//       console.log(" The sale was canceled successfully");


// }
// cancelSale().then()



//    async function getPendingSalesByCustomer() {
               
//                 let getPendingSalesByCustomer = 
//                 await DataSale.getPendingSalesByCustomer();
//                 console.log(getPendingSalesByCustomer);
//         }
//         getPendingSalesByCustomer().then()


//#endregion SALE