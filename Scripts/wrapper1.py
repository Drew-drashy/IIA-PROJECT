from fuzzywuzzy import fuzz
import mysql.connector

try:
    conn=mysql.connector.connect(host='localhost',username='root',password='@Shlok1234',database='warehouse1')
    conn_global=mysql.connector.connect(host='localhost',username='root',password='@Shlok1234',database='global_schema')
except Exception as e:
        print(e,"databases are not found")

sqlcursor=conn.cursor()
sql_global=conn_global.cursor()
identifier='a'

def monthModifier(list3):
    month_dict = {  1: "January", 2: "February", 3: "March",4: "April", 5: "May", 6: "June", 7: "July",
                        8: "August",9: "September",10: "October",11: "November",12: "December" }

    updated_list3=[]
    for i in range(len(list3)):
        a=list(list3[i])
        a[2]=month_dict[a[2]]        
        updated_list3.append(a)
    return updated_list3

def isDateExist(entry1, list2):
    for i in list2:
        if(entry1[1]==i[1] and entry1[2]==i[2] and entry1[3]==i[3] ): return i[0]
    return -1

def date_integeration(sqlcursor,sql_global):
    try:
        sqlcursor.execute("select * from time;")
        list1=sqlcursor.fetchall()
        
        sql_global.execute("SELECT * FROM date_dim;")
        
        glo_list=sql_global.fetchall()
        
        dict_id={}
        new_list=[]
    
        counter=1
        
        up_list1=monthModifier(list1)
        for k in up_list1:
            ans=isDateExist(k,glo_list)
           
            if(ans!=-1):
                dict_id[k[0]]=ans
            else:
                new_list=k
                new_id=str(counter)+identifier
                dict_id[k[0]]=new_id
                new_list[0]=new_id
                counter+=1
                e=tuple(new_list)
                sql_global.execute(f"insert into date_dim (Time_ID, Date, Month, Year) values {e};")
            conn_global.commit()
        return dict_id
        
        


    except Exception as e:
        print(f"Time or Date Tables are not enough {e}\n")

date_dict=date_integeration(sqlcursor,sql_global)
print("date complete")
    
def isCustomerExist(entry1, list2):
    for i in list2:
        if(entry1[2]==i[2] and fuzz.ratio(entry1[1].lower(),i[1].lower())>=90): return i[0]
    return -1

def customer_integeration(sqlcursor,sql_global):
    try:
        sqlcursor.execute("select * from customer;")
        list1=sqlcursor.fetchall()
        
        sql_global.execute("SELECT * FROM customer_dim;")
        
        glo_list=sql_global.fetchall()
        
        dict_id={}
        new_list=['a','b','c','d','f','g']
        counter=1
        for k in list1:
            ans=isCustomerExist(k,glo_list)
           
            if(ans!=-1):
                dict_id[k[0]]=ans
            else:
                
                new_id=str(counter)+identifier
                dict_id[k[0]]=new_id
                new_list[0]=new_id
                new_list[1]=k[1]
                new_list[2]=k[2]
                new_list[3]=k[3]
                new_list[4]=k[5]
                new_list[5]=k[6]
                counter+=1
                e=tuple(new_list)
                sql_global.execute(f"insert into customer_dim (ID, Name, Phone, Address, City, Pin) values {e};")
            conn_global.commit()
        return dict_id
        
        


    except Exception as e:
        print(f"Time or Date Tables are not enough {e}\n")

customer_dict=customer_integeration(sqlcursor,sql_global)
print("cutomer complete")
    
def isCategoryExist(entry1, list2):
    for i in list2:
        if(fuzz.ratio(entry1[1].lower(),i[1].lower())>=95): return i[0]
    return -1

def category_integeration(sqlcursor,sql_global):
    try:
        sqlcursor.execute("select * from category;")
        list1=sqlcursor.fetchall()
        
        sql_global.execute("SELECT * FROM category_dim;")
        
        glo_list=sql_global.fetchall()
        
        dict_id={}
        new_list=['a','b','c']
        counter=1
        for k in list1:
            ans=isCategoryExist(k,glo_list)
           
            if(ans!=-1):
                dict_id[k[0]]=ans
            else:
                
                new_id=str(counter)+identifier
                dict_id[k[0]]=new_id
                new_list[0]=new_id
                new_list[1]=k[1]
                new_list[2]=k[2]
                if(new_list[2]==None): new_list[2]='none'
                counter+=1
                e=tuple(new_list)
                sql_global.execute(f"insert into category_dim (CategoryID, CategoryName, Description) values {e};")
            conn_global.commit()

        return dict_id
        
        


    except Exception as e:
        print(f"Time or Date Tables are not enough {e}\n")

category_dict=category_integeration(sqlcursor,sql_global)
print("category complete")

print(category_dict)   
def isProductExist(entry1, list2,cat_dict):
    for i in list2:
        if(fuzz.ratio(entry1[1].lower(),i[1].lower())>=90 and cat_dict[entry1[2]]==i[2]): return i[0]
        
    return -1

def product_integeration(sqlcursor,sql_global):
    try:
        sqlcursor.execute("select * from product;")
        list1=sqlcursor.fetchall()
        
        sql_global.execute("SELECT * FROM product_dim;")
        
        glo_list=sql_global.fetchall()
        
        dict_id={}
        new_list=['a','b','c','d','e']
        counter=1
        for k in list1:
            
            ans=isProductExist(k,glo_list,category_dict)
            
            if(ans!=-1):
                dict_id[k[0]]=ans
            else:
                
                new_id=str(counter)+identifier
                dict_id[k[0]]=new_id
                new_list[0]=new_id
                new_list[1]=k[1]
            #    print(k)
                new_list[2]=category_dict[k[2]]
                # print("bb")
                new_list[3]=k[3]
                new_list[4]=k[4]

                
                counter+=1
                e=tuple(new_list)
                # print("b")
                sql_global.execute(f"insert into product_dim (ProductID, ProductName, CategoryID, Price, Quantity) values {e};")
                # print("a")
            conn_global.commit()

        return dict_id
        
        


    except Exception as e:
        print(f"err product {e}\n")

product_dict=product_integeration(sqlcursor,sql_global)
print("product complete")

def isSaleExist(entry1, list2):
    for i in list2:
        if(product_dict[entry1[1]]==i[0] and customer_dict[entry1[2]]==i[1] and date_dict[entry1[3]]==i[2]): return i
        
    return -1

def sales_integeration(sqlcursor,sql_global):
    try:
        sqlcursor.execute("select * from orders;")
        list1=sqlcursor.fetchall()
        
        sql_global.execute("SELECT * FROM sales_fact;")
        
        glo_list=sql_global.fetchall()
        
        
        new_list=['a','b','c','d']
        
        for k in list1:
            ans=isSaleExist(k,glo_list)
           
            if(ans!=-1):
            
                sql_global.execute(f"DELETE FROM sales_fact WHERE ProductID = {ans[0]} and CustomerID = {ans[1]} and DateID = {ans[2]};")
                ans[3]+=int(k[4])
                sql_global.execute(f"insert into sales_fact (ProductID, CustomerID, DateID, Quantity) values {ans};")
            else:
                
                new_list[0]=product_dict[k[1]]
                
                new_list[1]=customer_dict[k[2]]
                
                new_list[2]=date_dict[k[3]]
                
                new_list[3]=k[4]
                
               
                e=tuple(new_list)
               
                sql_global.execute(f"insert into sales_fact (ProductID, CustomerID, DateID, Quantity) values {e};")
            conn_global.commit()

       
        
        


    except Exception as e:
        print(f"err sale  {e}\n")

sales_integeration(sqlcursor,sql_global)
print("sales complete")
    
def isStockExist(entry1, list2):
    for i in list2:
        if(product_dict[entry1[0]]==i[0] and category_dict[entry1[2]]==i[1] ): return i
        
    return -1

def stock_integeration(sqlcursor,sql_global):
    try:
        sqlcursor.execute("select * from product;")
        list1=sqlcursor.fetchall()
        
        sql_global.execute("SELECT * FROM stock_fact;")
        
        glo_list=sql_global.fetchall()
        
        
        new_list=['a','b','c']
        
        for k in list1:
            ans=isStockExist(k,glo_list)
           
            if(ans!=-1):
                sql_global.execute(f"DELETE FROM stock_fact WHERE ProductID = {ans[0]} and CategoryID = {ans[1]} ;")
                ans[2]+=k[4]
                sql_global.execute(f"insert into stock_fact (ProductID, CategoryID, Stock) values {ans};")
            else:
                new_list[0]=product_dict[k[0]]
                new_list[1]=category_dict[k[2]]
                new_list[2]=k[4]
               
                e=tuple(new_list)
               
                sql_global.execute(f"insert into stock_fact (ProductID, CategoryID, Stock) values {e};")
            conn_global.commit()

       
        
        


    except Exception as e:
        print("fail")
        print(f"error in stock {e}\n")

stock_integeration(sqlcursor,sql_global)
print("stock complete")
    
conn.close()
conn_global.close()


print("done>>>")