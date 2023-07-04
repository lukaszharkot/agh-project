import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddProductForm = ({ onAdd }) => {
    const [product_name, setProduct_name] = useState("");
    const [price, setPrice] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onAdd(product_name, price);
        setProduct_name("");
        setPrice("");

    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                placeholder = "Product name"
                className="mb-2"
                value = {product_name}
                onChange = {(e) => setProduct_name(e.currentTarget.value)}
            />
            <Input
                placeholder = "Price"
                className="mb-2"
                value = {price}
                onChange = {(e) => setPrice(e.currentTarget.value)}
            />
            <Button type="submit" className="mb-2">Add</Button>      
        </form>
    )
}