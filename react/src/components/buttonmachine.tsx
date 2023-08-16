import React from 'react';
import { useState } from 'react';

const Button = () => {

    const [name , setname] = useState("?");

return(
    <button onClick={() => setname ("stephanie")}>Your Name is {name}</button>
)
}
export default Button;