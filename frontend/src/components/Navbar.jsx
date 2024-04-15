import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header>
            <div className="navbar-container">
                <Link to="/">
                    <h1>Postmaster</h1>
                </Link>
                <nav>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
