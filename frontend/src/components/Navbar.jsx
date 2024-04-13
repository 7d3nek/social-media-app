import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header>
            <div className="navbar-container">
                <Link to="/">
                    <h1>Postmaster</h1>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
