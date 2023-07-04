import { Input } from "@/components/ui/Input";
import { useState } from "react";

export const InputEdit = ({ value, handleChange }) => {
    const [text, setText] = useState(value);

    return(
        <Input 
            value= {text}
            onChange = {(e) => setText(e.currentTarget.value)}
            onBlur = {(e) => handleChange(e)}
        />
    );
}