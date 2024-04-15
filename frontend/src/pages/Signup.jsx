import { useState } from "react";


const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>First name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <label>Last name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Sign up</button>
        </form>
    );
}

export default Signup