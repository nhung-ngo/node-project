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

---

##  Users

###  Add New Customer
`POST /users/add`

```json
{
  "name": "Luna Nguyen",
  "email": "luna@example.com",
  "password": "custpass",
  "user_type": "customer"
}
```

###  Add New Admin
`POST /users/add`

```json
{
  "name": "Admin Jane",
  "email": "admin.jane@example.com",
  "password": "adminpass",
  "user_type": "admin"
}
```
### 📋 Get All Users
`GET /users/all`

### 🔍 Get User by ID
`GET /users/:id`


---

##  Products

###  Search Products by Name (e.g., "crystal")
`GET /products?search=crystal`

###  Search by Category (from Categories table)
`GET /products?category=slim`

###  Filter by Phone + Description
`GET /products?description=shockproof&phone=galaxy`

###  Get All Products
`GET /products`

###  View Product Details
`GET /products/1`

---

## 🛒 Cart

###  Add to Cart
`POST /cart/add`

```json
{
  "userID": 1,
  "productID": 3,
  "quantity": 2
}
```
###  View Cart by User
`GET /cart/1`

###  Remove Product from Cart
`DELETE /cart/remove/3`

###  Checkout
`POST /cart/checkout`

```json
{
  "userID": 1
}
```

>  Make sure the cart status is still "active" before checking out!

---

## 🧑 Admin – Product Management

###  Add Product
`POST /admin/products/add`

```json
{
  "case_name": "Ocean Blue Case",
  "description": "A calming ocean-themed case",
  "price": 14.99,
  "stock": 20,
  "image_path": "images/ocean-blue.png",
  "phone_model": "iPhone 14",
  "categoryID": 4
}
```

###  Update Product
`PUT /admin/products/3`

```json
{
  "case_name": "Updated Clear Case",
  "description": "Ultra transparent and protective",
  "price": 11.99,
  "stock": 30,
  "image_path": "images/updated-clear.png",
  "phone_model": "Galaxy S22",
  "categoryID": 4
}
```

###  Bulk Upload Products
`POST /admin/products/bulk`

```json
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
]
```
