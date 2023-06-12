USE supermarkett
go
CREATE TABLE Category(
	IdCategory int NOT NULL PRIMARY KEY Identity(1,1) ,
	NameCategory varchar(100) not null ,
	DescrriptionCategory varchar(200) not null 	
)
go
CREATE TABLE Suppliers (
	SupplierId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	SupplierName VARCHAR(100) NOT NULL,
	AddressSupplier VARCHAR(200) NOT NULL,
	CitySupplier VARCHAR(100) NOT NULL,
	StateSupplier VARCHAR(100) NOT NULL,
	PhoneSupplier VARCHAR(20) NOT NULL,
	EmailSupplier VARCHAR(100) NOT NULL
)
go
CREATE TABLE Customer(
	IdCustomer int NOT NULL PRIMARY KEY Identity(1,1) ,
	NameCustomer varchar(50) not null ,
	UserrName varchar(30) not null,
	Passwordd varchar(1000) NOT NULL,
	Hashh varchar(1000) NOT NULL,
	Street_name varchar(50) not null ,
	Street_number VARCHAR(20) not null,
	Unit_apartment VARCHAR(20) not null,
	City	VARCHAR(20) not null,
	Statee VARCHAR(20) not null,
	Phone	VARCHAR(20) not null,
	Email VARCHAR(50) not null,
	Active bit not null,
	RegistrationDate DATE NOT NULL DEFAULT GETDATE()
)
go
CREATE TABLE Product(
	IdProduct int NOT NULL PRIMARY KEY Identity(1,1) ,
	NameProduct varchar(50) not null ,
	DescriptionProduct varchar(200) not null ,
	UrlImg varchar(1000) not null ,
	PriceProduct DECIMAL(10,2) not null,
	Manufacturer varchar(50) not null,
	CountryOfOrigin varchar(50) not null,
	StockProduct INT not null,
	Entry_date	DATE not null,
	Expiration_date DATE not null,
	Rating	int not null,
	Active	bit not null,
	SupplierId int not null Foreign Key References Suppliers(SupplierId),
	IdCategory int not null Foreign Key References Category(IdCategory)
)
go
CREATE TABLE ProductRatings (
    RatingId int NOT NULL PRIMARY KEY IDENTITY(1,1),
    Rating int NOT NULL,
	IdProduct int not null Foreign Key References Product(IdProduct),
    IdCustomer int not null Foreign Key References Customer(IdCustomer)
)
go
CREATE TABLE Discounts(
	IdDiscount int NOT NULL PRIMARY KEY Identity(1,1) ,
	Percentagee DECIMAL(5,2) not null ,
	Startt_date	DATE not null,
	DiscountCode varchar(50) not null ,
	End_date DATE not null,
	IdProduct int not null Foreign Key References Product(IdProduct)

)
go
CREATE TABLE Offers(
	IdOffer int NOT NULL PRIMARY KEY Identity(1,1) ,
	DescriptionOffer varchar(100) not null ,
	Offer_price DECIMAL(10,2) not null ,
	Startt_date	DATE not null,
	End_date DATE not null,
	IdProduct int not null Foreign Key References Product(IdProduct)

)
go
CREATE TABLE Sale(
	IdSale int NOT NULL PRIMARY KEY Identity(1,1) ,
	Sale_Date DATE not null ,
	Subtotal DECIMAL(10,2) not null ,
	PaymentMethod  VARCHAR(50) not null,
	Vat DECIMAL(10,2) not null,
	Total_amount DECIMAL(10,2) not null,
	Observation VARCHAR(100) not null,
	Statee VARCHAR(20) not null,
	IdCustomer int not null Foreign Key References Customer(IdCustomer)

)
go

CREATE TABLE DetailSale(
	IdDetailSale int NOT NULL PRIMARY KEY Identity(1,1) ,
	Quantity INT not null ,
	Unit_Price DECIMAL(10,2) not null ,
	IdProduct int not null Foreign Key References Product(IdProduct),
	IdSale int not null Foreign Key References Sale(IdSale),

)
go

CREATE TABLE LoginCustomer(
	IdLoginCustomer int NOT NULL PRIMARY KEY Identity(1,1) ,
	IdCustomer int not null Foreign Key References Customer(IdCustomer),
	LoginDateAndTime DateTime  not null,
)
go



--DROP TABLE DetailSale;
--DROP TABLE LoginCustomer;
--DROP TABLE Sale;
--DROP TABLE Offers;
--DROP TABLE Discounts;
--DROP TABLE Product;
--DROP TABLE Customer;
--DROP TABLE Suppliers;
--DROP TABLE Category;
--DROP TABLE ProductRatings;

--SELECT * FROM Category;
--SELECT * FROM Suppliers;
--SELECT * FROM Customer;
--SELECT * FROM Product;
--SELECT * FROM Discounts;
--SELECT * FROM Offers;
--SELECT * FROM Sale;
--SELECT * FROM DetailSale;
--SELECT * FROM LoginCustomer;
--SELECT * FROM ProductRatings;


 delete from Suppliers
 delete from customer
 delete from OFFERs
  delete from product

		 select * from customer
		  select * from category
		  select * from Suppliers
		 select * from Product
		select * from OFFERs
		select * from ProductRatings
	SELECT SupplierId FROM Suppliers 
    WHERE SupplierId =109 





	
		

