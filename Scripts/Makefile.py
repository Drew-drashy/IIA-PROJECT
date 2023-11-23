import os
import subprocess
from subprocess import call
import mysql.connector
import time

const ='''drop database if exists global_schema;
create schema global_schema;
use global_schema;
create table date_dim (
	Time_ID VARCHAR(50),
	Date INT,
	Month VARCHAR(50),
	Year INT,
    primary key (Time_id)
);
create table Category_dim (
	CategoryID VARCHAR(50),
	CategoryName varchar(50),
	Description VARCHAR(50) NULL,
    primary key (CategoryID)
	
);
create table Customer_dim (
	ID VARCHAR(50),
	Name VARCHAR(50),
	Phone VARCHAR(50),
	Address VARCHAR(50) NULL,
	City VARCHAR(50) NULL,
	Pin VARCHAR(50) NULL,
    primary key (ID)
);

create table Product_dim (
	ProductID VARCHAR(50),
	ProductName VARCHAR(50),
	CategoryID VARCHAR(50),
	Price float,
	Quantity INT,
    primary key (ProductID),
    foreign key (CategoryID) references Category_dim(CategoryID)
);
create table Sales_Fact (
	ProductID VARCHAR(50),
	CustomerID VARCHAR(50),
	DateID VARCHAR(50),
	Quantity INT,
    foreign key (CustomerID) references Customer_dim(ID),
    foreign key (ProductID) references Product_dim(ProductID),
    foreign key (DateID) references date_dim(Time_ID)
    
);
create table Stock_Fact (
	ProductID VARCHAR(50),
	CategoryID VARCHAR(50),
	Stock INT,
    foreign key (CategoryID) references Category_dim(CategoryID),
    foreign key (ProductID) references Product_dim(ProductID)
);


'''
def main():
    try:
        # conn=mysql.connector.connect(host='localhost',username='root',password='@Shlok1234',database='warehouse3')
        conn_global=mysql.connector.connect(host='localhost',username='root',password='@Shlok1234',database='global_schema')
        sqlcursor=conn_global.cursor()
        sqlcursor.execute(const)
    except Exception as e:
        print(e,"databases are not found")



    
def fun1():
    call(["python", "wrapper1.py"])

def fun2():
    call(["python", "wrapper2.py"])

def fun3():
    call(["python", "wrapper3.py"])

def sleeperBuild():
	time.sleep(60)
while(True):
    main()
    fun1()
    fun2()
    fun3()
    sleeperBuild()
	
    
