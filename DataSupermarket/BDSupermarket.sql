USE BDSupermarketMSSQ
go
-----TABLAS
CREATE TABLE Producto(
	IdP int NOT NULL IDENTITY(1,1) Primary key,
	NameP  varchar(200)  unique NOT NULL,
	PriceP money not null
) 
go
 CREATE TABLE CardPayment(
	IdC int NOT NULL IDENTITY(1,1),
	NumberCardC  varchar(200) unique  NOT NULL,
	CustomerIDC bigint  NOT NULL,
	primary key(IdC,NumberCardC)
) 

go
CREATE TABLE Fees(
	IdI int NOT NULL IDENTITY(1,1) ,
	NumberFee int NOT NULL ,
	NumberCardI varchar(200)  not NULL  foreign key references CardPayment(NumberCardC),
	AmountI money not null,
	Primary Key(IdI,NumberFee,NumberCardI)
) 
go
CREATE TABLE Sale(
	IdS int NOT NULL IDENTITY(1,1) Primary key,
	StateS varchar(200) NOT NULL,
	SubtotalS money not null,
	TaxesS money not null,
	TotalS money not null,
	NumberCardS varchar(200) NULL foreign key references CardPayment(NumberCardC)
) 
go

CREATE TABLE DetailSale(
	IdDS int NOT NULL IDENTITY(1,1) Primary key,
	QuantityDS int NOT NULL,
	AmountDS money not null,
	ProductDS varchar(200)  not NULL  foreign key references Producto(NameP),
	SaleDS int  not NULL  foreign key references Sale(IdS)
) 
go
insert into Producto values ('Apple Juice',3.33)
insert into Producto values ('Ice Cream',2.99)
insert into Producto values ('Ketchup',130.00)
insert into Producto values ('Chocolate',72.00)
insert into Producto values ('Water Bottle',19.00)
insert into Producto values ('Olive oil',325.00)
insert into Producto values ('Lettuce',1.97)
insert into Producto values ('Cheese',122.00)
insert into Producto values ('Biscuit',18.00)
insert into Producto values ('Beer',50.43)
go 
--insert into Sale OUTPUT inserted.IdS values ('Open',50.43,50,100)

 --select * from producto
 --select * from sale
 --select * from DetailSale
 --select * from Fees
 --select * from CardPayment
 --select * from producto where IdProducto=2
 -- drop table DetailSale
 --drop table Sale
 --   drop table Fees
 --  drop table CardPayment
 --drop table Producto

  --select * from CardPayment
 --select * from Installments
--Update Producto Set  ImgProducto='sdf.jpg' where IdProducto=12

--<<<<<<< HEAD


--=======
--go

--go
 -- drop table CardPayment
-->>>>>>> dev
