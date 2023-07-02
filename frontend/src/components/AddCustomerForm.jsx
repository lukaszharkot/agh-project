import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AddCustomerForm = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhone_number] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onAdd(name, surname, email, phone_number);
        setName("");
        setSurname("");
        setEmail("");
        setPhone_number("");
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                placeholder = "Name"
                className="mb-2"
                value = {name}
                onChange = {(e) => setName(e.currentTarget.value)}
            />
            <Input
                placeholder = "Surname"
                className="mb-2"
                value = {surname}
                onChange = {(e) => setSurname(e.currentTarget.value)}
            />
            <Input
                placeholder = "Email"
                className="mb-2"
                value = {email}
                onChange = {(e) => setEmail(e.currentTarget.value)}
            />
            <Input
                placeholder = "Phone number"
                className="mb-2"
                value = {phone_number}
                onChange = {(e) => setPhone_number(e.currentTarget.value)}
            />
            <Button type="submit" className="mb-2">Add</Button>      
        </form>
    )
}