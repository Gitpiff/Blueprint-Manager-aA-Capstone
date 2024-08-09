import { Link } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";

const Navbar = () => {
    return (
        <div>
            <nav>
                <div className='navbar'>
                    <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                        <h1 className="nav-title">Blueprint Manager</h1>
                    <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                </div>
                <h3 className='slogan'>Your Ultimate Tool for Seamless Construction Project Management</h3>
            </nav>

        </div>
    )
};

export default Navbar;