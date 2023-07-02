from fastapi import APIRouter, HTTPException, Query

from .storage import get_customers_storage, get_orders_storage, get_products_storage
from .schema import CustomerCreateSchema, CustomerUpdateSchema, Customer, ProductCreateSchema, ProductUpdateSchema, Product, OrderCreateSchema, OrderUpdateSchema, Order

router = APIRouter()


CUSTOMERS_STORAGE = get_customers_storage()
ORDERS_STORAGE = get_orders_storage()
PRODUCTS_STORAGE = get_products_storage()


@router.get("/customers")
async def get_customers() -> list[Customer]:
    #print(list(get_customers_storage().values()))
    return list(get_customers_storage().values())

@router.get("/products")
async def get_products() -> list[Product]:
    return list(get_products_storage().values())

@router.get("/orders")
async def get_orders() -> list[Order]:
    return list(get_orders_storage().values())

@router.get("/customers/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

@router.get("/products/{product_id}")
async def get_product(product_id: int) -> Product:
    try:
        return PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )

@router.get("/orders/{order_id}")
async def get_order(order_id: int) -> Order:
    try:
        return ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )

@router.patch("/customers/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema
) -> Customer:
    existing_customer = None
    try:
        existing_customer = CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )
    if not updated_customer.name and not updated_customer.surname and not updated_customer.email and not updated_customer.phone_number:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    
    if updated_customer.name:
        existing_customer.name = updated_customer.name

    if updated_customer.surname:
        existing_customer.surname = updated_customer.surname

    if updated_customer.email:
        existing_customer.email = updated_customer.email

    if updated_customer.phone_number:
        existing_customer.phone_number = updated_customer.phone_number

    return existing_customer

@router.patch("/products/{product_id}")
async def update_product(
    product_id: int, updated_product: ProductUpdateSchema
) -> Product:
    existing_product = None
    try:
        existing_product = PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )
    if not updated_product.product_name and not updated_product.price:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    
    if updated_product.product_name:
        existing_product.product_name = updated_product.product_name

    if updated_product.price:
        existing_product.price = updated_product.price

    return existing_product

@router.patch("/orders/{order_id}")
async def update_order(order_id: int, updated_order: OrderUpdateSchema) -> Order:
    existing_order = None
    try:
        existing_order = ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )
    
    if not updated_order.products and not updated_order.buyer:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    
    if updated_order.products:
        new_order_products = []
        for product_id in updated_order.products:
            if product_id in PRODUCTS_STORAGE:
                new_product = PRODUCTS_STORAGE[product_id]
                new_order_products.append(new_product)
        updated_order.products = new_order_products
        existing_order.products = updated_order.products

    if updated_order.buyer:
        new_customer_id = int(updated_order.buyer)
        try:
            new_customer = CUSTOMERS_STORAGE[new_customer_id]
        except KeyError:
            raise HTTPException(
                status_code=404, detail=f"Customer with ID={new_customer_id} does not exist."
            )
        updated_order.buyer = new_customer.email
        existing_order.buyer = updated_order.buyer
    
    existing_order.sum = sum(new_product.price for new_product in new_order_products)
    existing_order.name = new_customer.name
    existing_order.surname = new_customer.surname

    return existing_order


@router.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:
        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

@router.delete("/products/{product_id}")
async def delete_product(product_id: int) -> None:
    try:
        del PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )
    
@router.delete("/orders/{order_id}")
async def delete_order(order_id: int) -> None:
    try:
        del ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )

@router.post("/customers")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
    if CUSTOMERS_STORAGE:
        id = max(CUSTOMERS_STORAGE.keys()) + 1 
    else:
        id = 1
    new_customer = Customer(**customer.dict(), id=id)
    CUSTOMERS_STORAGE[id] = new_customer

    return new_customer

@router.post("/products")
async def create_product(product: ProductCreateSchema) -> Product:
    if PRODUCTS_STORAGE:
        id = max(PRODUCTS_STORAGE.keys()) + 1 
    else:
        id = 1
    new_product = Product(**product.dict(), id=id)
    PRODUCTS_STORAGE[id] = new_product

    return new_product

@router.post("/orders")
async def create_order(order: OrderCreateSchema) -> Order:
    if ORDERS_STORAGE:
        id = max(ORDERS_STORAGE.keys()) + 1 
    else:
        id = 1
    order_products = []
    customer_id = int(order.buyer)
    print(customer_id, type(customer_id))
    
    try:
        customer = CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

    for product_id in order.products:
        if product_id in PRODUCTS_STORAGE:
            product = PRODUCTS_STORAGE[product_id]
            order_products.append(product)

    order_price_sum = sum(product.price for product in order_products)
    new_order = Order(id=id, sum=order_price_sum, products=order_products, buyer=customer.email, name=customer.name, surname=customer.surname)
    ORDERS_STORAGE[id] = new_order

    return new_order
