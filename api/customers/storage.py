from functools import lru_cache

from .schema import Customer, Product, Order

CustomerStorageType = dict[int, Customer]
ProductStorageType = dict[int, Product]
OrderStorageType = dict[int, list[Order]]

CUSTOMERS: CustomerStorageType = {}
PRODUCTS: ProductStorageType = {}
ORDERS: OrderStorageType = {}


@lru_cache(maxsize=1)
def get_customers_storage() -> CustomerStorageType:
    return CUSTOMERS


@lru_cache(maxsize=1)
def get_products_storage() -> ProductStorageType:
    return PRODUCTS


@lru_cache(maxsize=1)
def get_orders_storage() -> OrderStorageType:
    return ORDERS