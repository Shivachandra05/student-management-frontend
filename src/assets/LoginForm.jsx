import { useState } from "react";

function LoginForm(props)
{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [error, setError] = useState("");

function handlesubmit(e){
    e.preventDefault();
    setError(""); // Clear previous error message

    fetch("http://localhost:8080/students/auth/login", {
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
        throw new Error("Incorrect username or password. Please register if you don't have an account.");
    }

    return response.json();
})
.then(data => {
    props.onLogin(data.token);
})
.catch(error => {
    setError(error.message);
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
        <button type="submit">Login </button>

        {error && (
        <p className="error-message">{error}
        </p>
        )}
    </form>
);
}
export default LoginForm;