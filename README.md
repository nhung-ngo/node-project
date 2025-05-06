#  ModiCase

ModiCase is an e-commerce web application for browsing and purchasing phone cases. Users can filter by phone models, view product details, add items to their cart, and complete the checkout process. Admins can manage the product catalog.

---

##  Features

- Browse all phone case products
- Search by phone model, category
- View product details
- Add/remove items from the cart
- Checkout 
- View order history
- Admin dashboard:
  - Add/edit/delete products
  - Bulk upload products via JSON

---

##  Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQLite
- **Frontend:** Pug (template engine), HTML/CSS
- **Authentication:** Google OAuth 

---

##  How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/nhung-ngo/ModiCase.git
   ```

2. **Install dependencies**
   ```bash
   npm install
- express
- better-sqlite3
- multer

   ```

3. **Run the app**
   ```bash
   nodemon server.js
   ```
   App will be available at: `http://localhost:3000`
  

4. **Log in**   
  ```By Google Acount
  For Admin: Change the email on passport.js to your email to see the admin pages. 
  And make sure that email shows "admin" on user_type column on database.
---

##  Bulk Upload Format

```
[
  {
    "case_name": "Itachi Uchiha Case",
    "price": 14.99,
    "stock": 50,
    "categoryID": 1,
    "image_path": "https://animecaseshop.com/cdn/shop/files/NarutoiphoneXXSXR1112131415161718minipluspromaxSamsungS20S21S22S23S24S25S26S27PlusUltra7_7fb2202e-532c-45fc-ad88-ac7b1afada12_1080x.jpg?v=1731955496",
    "description": "Anime phone case.",
    "phoneModels": ["Pixel 7", "iPhone 15"]
  },
  {
    "case_name": "Naruto Case",
    "price": 24.99,
    "stock": 30,
    "categoryID": 2,
    "image_path": "https://animecaseshop.com/cdn/shop/files/WeChatImage_20230706110044_4384c283-0a90-4107-b4b1-ee7ea966be4e_1080x.jpg?v=1688621993",
    "description": "Battle of True Strength",
    "phoneModels": ["iPhone 14", "Galaxy S23"]
  }
]
```
