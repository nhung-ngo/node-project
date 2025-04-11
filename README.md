# Phone Case Ecommerce Backend

This is a Node.js + Express backend API for a phone case ecommerce store. It supports product browsing, filtering, cart management, and admin operations.

##  Features

- View all products
- Search by phone model, description, or category
- View product details
- Add/edit/delete products (Admin only)
- Add and remove items from cart
- Checkout (empty cart)
- Bulk product upload from JSON

##  Project Structure

```
controllers/       # Logic for API routes
models/            # DB connection methods
routes/            # API route definitions
public/            # Static frontend files
database/          # SQL setup and seed data
```

##  Getting Started

1. **Install dependencies**  
   
   npm install
   
2. **Run the app**  
   
   nodemon server.js

3. **Seed the database** 
   The database be named SQL.db
   Open your SQLite DB Browser and run these files in order:
   ```
   1. database/create_tables.sql
   2. database/insert_users.sql
   3. database/insert_categories.sql
   4. database/insert_products.sql
   ```

##  Dependencies

- express
- better-sqlite3
- multer
- sqlite3 

##  Example Routes (Thunder Client)
   For user:

- `GET /http://localhost:3000/users/all` – all users  
- `GET /http://localhost:3000/users/:id` – get user by userID  
- `POST /http://localhost:3000/users/add` – add new user 
{
  "name": "Luna Nguyen",
  "email": "luna@example.com",
  "password": "custpass",
  "user_type": "customer"
}
{
  "name": "Admin Jane",
  "email": "admin.jane@example.com",
  "password": "adminpass",
  "user_type": "admin"
}


   For products:
- `GET /http://localhost:3000/products?search=crystal` – search products by case_name (crystal, leather,...) from Products Table
- `GET /http://localhost:3000/products?category=slim` – search products by case_name (slim, clear,...) from Categories Table
- `GET /http://localhost:3000/products/1` – product details  
- `GET /http://localhost:3000/products?description=shockproof&phone=galaxy` – search products by phone_model AND description
- `GET /http://localhost:3000/products` – get all products  



   For cart: do step by step
- `POST http://localhost:3000/cart/add` – add to cart  
   {
  "userID": 1,
  "productID": 3,
  "quantity": 2
   }  - JSON
- `GET http://localhost:3000/cart/:userID` – get cart by userID
- `DELETE http://localhost:3000/cart/remove/:productID` – delete product in cart by productID
- `POST http://localhost:3000/cart/checkout` – check out - do this after deleted product or added to cart to make sure the status's cart have not in check_out.
   


   For admin:
- `POST http://localhost:3000/admin/products/add` – add product  
{
  "case_name": "Ocean Blue Case",
  "description": "A calming ocean-themed case",
  "price": 14.99,
  "stock": 20,
  "image_path": "images/ocean-blue.png",
  "phone_model": "iPhone 14",
  "categoryID": 4
}  -JSON

- `PUT http://localhost:3000/admin/products/3` – update product  
{
  "case_name": "Updated Clear Case",
  "description": "Ultra transparent and protective",
  "price": 11.99,
  "stock": 30,
  "image_path": "images/updated-clear.png",
  "phone_model": "Galaxy S22",
  "categoryID": 4
}  - JSON
- `POST http://localhost:3000/admin/products/bulk` – upload from JSON
[
  {
    "case_name": "Sunset Glow Case",
    "description": "Gradient sunset colors",
    "price": 12.99,
    "stock": 25,
    "image_path": "images/sunset-glow.png",
    "phone_model": "iPhone 13",
    "categoryID": 2
  },
  {
    "case_name": "Dragon Skin Case",
    "description": "Textured and rugged",
    "price": 15.99,
    "stock": 15,
    "image_path": "images/dragon-skin.png",
    "phone_model": "Pixel 6",
    "categoryID": 3
  }
] - JSON



- `.gitignore` should include:
  ```
  node_modules/
  SQL.db
  SQL.db-journal
  .env
  ```
