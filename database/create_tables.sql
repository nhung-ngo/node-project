CREATE TABLE Users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    user_type TEXT NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE TABLE Categories (
    categoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    case_name TEXT NOT NULL,
    priority INTEGER
);

CREATE TABLE Products (
    productID INTEGER PRIMARY KEY AUTOINCREMENT,
    case_name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER NOT NULL,
    image_path TEXT,
    phone_model TEXT,
    categoryID INTEGER NOT NULL,
    FOREIGN KEY (categoryID) REFERENCES Categories(categoryID)
);

CREATE TABLE Carts (
    cartID INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE CartProducts (
    cartProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    cartID INTEGER NOT NULL,
    productID INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (cartID) REFERENCES Carts(cartID),
    FOREIGN KEY (productID) REFERENCES Products(productID)
);