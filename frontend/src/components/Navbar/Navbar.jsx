import { Link } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";

const Navbar = () => {
    return (
        <div>
            <nav>
                <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                    <h1 className="nav-title">Blueprint Manager</h1>
                <Link className="logo" to='/'><SiNginxproxymanager /></Link>
            </nav>

        </div>
    )
};

export default Navbar;