from enum import Enum

from pydantic import BaseModel

class CustomerCreateSchema(BaseModel):
    name: str
    surname: str
    email: str
    phone_number: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Jan",
                "surname": "Kowalski",
                "email": "jan.kowalski@example.com",
                "phone_number": "000-000-000"
            }
        }


class CustomerUpdateSchema(BaseModel):
    name: str | None
    surname: str | None
    email: str | None
    phone_number: str | None

    class Config:
        schema_extra = {
            "example": {
                "name": "Patryk",
                "surname": "Kownacki",
                "email": "patryk.kownacki@example.com",
                "phone_number": "999-999-999"
            }
        }


class Customer(CustomerCreateSchema):
    id: int



class ProductCreateSchema(BaseModel):
    product_name: str
    price: int

    class Config:
        schema_extra = {
            "example": {
                "product_name": "Kurs C++",
                "price": 2450
            }
        }


class ProductUpdateSchema(BaseModel):
    product_name: str | None
    price: int | None

    class Config:
        schema_extra = {
            "example": {
                "product_name": "Kurs Python",
                "price": 2000
            }
        }


class Product(ProductCreateSchema):
    id: int


class OrderCreateSchema(BaseModel):
    products: list
    buyer: str
    
    class Config:
        schema_extra = {
            "example": {
                "products": [1,2,3],
                "buyer": 1
            }
        }


class OrderUpdateSchema(BaseModel):
    products: list | None
    buyer: str | None

    class Config:
        schema_extra = {
            "example": {
                "products": [1,2,2],
                "buyer": 2
            }
        }


class Order(OrderCreateSchema):
    id: int
    sum: float
    name: str
    surname: str


# class Mark(float, Enum):
#     BARDZO_DOBRY = 5.0
#     DOBRY_PLUS = 4.5
#     DOBRY = 4.0
#     DOSTATECZNY_PLUS = 3.5
#     DOSTATECZNY = 3.0
#     NIEDOSTATECZNY = 2.0