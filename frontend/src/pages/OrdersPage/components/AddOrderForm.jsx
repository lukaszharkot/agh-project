import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddOrderForm = ({ onAdd }) => {
    const [products, setProducts] = useState([]);
    const [buyer, setBuyer] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const productList = products.map((item) => parseInt(item.trim(), 10));
        console.log(products);
        onAdd(productList, buyer);
        setProducts([]);
        setBuyer("");

    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                placeholder = "Products IDs (comma-separated)"
                className="mb-2"
                value={products.join(",")}
                onChange={(e) => setProducts(e.currentTarget.value.split(","))}
            />
            <Input
                placeholder = "Buyer (Customer ID)"
                className="mb-2"
                value = {buyer}
                onChange = {(e) => setBuyer(e.currentTarget.value)}
            />
            <Button type="submit" className="mb-2">Add</Button>      
        </form>
    )
}