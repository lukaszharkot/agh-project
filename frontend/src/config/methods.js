export const fetchCustomers = () =>
    fetch("http://127.0.0.1:8000/customers").then((res) => res.json());

export const createCustomer = ({ name, surname, email, phone_number }) =>
    fetch("http://127.0.0.1:8000/customers", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            phone_number, phone_number,
        }),
    }).then((res) => res.json());

export const editCustomer = (customer_id, updatedData) => 
    fetch(`http://127.0.0.1:8000/customers/${customer_id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    }).then((res) => res.json());

export const deleteCustomer = (customer_id) =>
    fetch(`http://127.0.0.1:8000/customers/${customer_id}`, {
        method: "DELETE",
    }).then((res) => res.json());

export const fetchProducts = () =>
    fetch("http://127.0.0.1:8000/products").then((res) => res.json());

export const createProduct = ({ product_name, price }) =>
    fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_name: product_name,
            price: price,
        }),
    }).then((res) => res.json());

export const editProduct = (product_id, updatedData) => 
    fetch(`http://127.0.0.1:8000/products/${product_id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    }).then((res) => res.json());

export const deleteProduct = (product_id) =>
    fetch(`http://127.0.0.1:8000/products/${product_id}`, {
        method: "DELETE",
    }).then((res) => res.json());

export const fetchOrders = () =>
    fetch("http://127.0.0.1:8000/orders").then((res) => res.json());

export const createOrder = ({ products, buyer }) =>
    fetch("http://127.0.0.1:8000/orders", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            products: products,
            buyer: buyer,
        }),
    }).then((res) => res.json());

export const editOrder = (order_id, updatedData) => 
    fetch(`http://127.0.0.1:8000/orders/${order_id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    }).then((res) => res.json());


export const deleteOrder = (order_id) =>
    fetch(`http://127.0.0.1:8000/orders/${order_id}`, {
        method: "DELETE",
    }).then((res) => res.json());
