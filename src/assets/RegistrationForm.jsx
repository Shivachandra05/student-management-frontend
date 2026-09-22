import { useState } from "react";

function RegistrationForm()
{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

function handlesubmit(e){
    e.preventDefault();
    fetch("http://localhost:8080/students/auth/register", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ 
            username : username, 
            password : password })
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
    }

    return response.text();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});
}

return(
    <form onSubmit={handlesubmit}>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}

        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}

        />
        <button type="submit">Register</button>

    </form>
);
}
export default RegistrationForm;