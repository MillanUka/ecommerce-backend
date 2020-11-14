# Ecommerce Backend
A backend for an Ecommerce website. MIT License (Millan Uka 2020)

## Technologies used 
- NodeJS
- ExpressJS
- PassportJS
- bcrypt (For password encryption)
- MongoDB

# How to run
Clone the repo.

```git clone https://github.com/MillanUka/ecommerce-backend.git```

Navigate to the directory

```cd ecommerce-backend```

Install all the dependencies

```yarn install```

The server will run on localhost:5000

# API Endpoints
Base endpoint is ```localhost:5000/api/v1```
| Endpoint  | Method | Params | Description |
| ------------- | ------------- | ------------- | ------------- | 
| ```/product/```  | GET  | limit, query | Gets products in the database. Limit, limits the number of results. A search query can also be specified. If no parameters are given all products will be returned |
| ```/product/submit``` | POST  | name, price, desc, submitter | Adds a product to the database. Required authentication. |
| ```/user/:id``` | GET | id | Gets a user with the id, Requires Authentication. |
| ```/auth/register``` | POST | email, password | Registers a user. |
| ```/auth/login``` | POST | email, password | Logins the user. |
| ```/auth/logout``` | GET | None | Logouts the user |
| ```/auth/check/``` | GET | None | Checks if the user is authenticated |

