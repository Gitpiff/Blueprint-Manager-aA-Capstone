import { Link } from 'react-router-dom';
import { SiNginxproxymanager } from "react-icons/si";
import { FaUserCog } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const Navbar = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    
        return <Navigate to="/" />;
    };

    return (
        <div>
            {sessionUser ? (
                <>
                     <nav>
                        <div className='navbar'>
                            <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                                <h1 className="nav-title">Blueprint Manager</h1>
                            <Link className="logo" to='/'><FaUserCog /></Link>
                        </div>
                        <div className='subnavbar'>
                            <h3 className='slogan'>Welcome Back {sessionUser.firstName} {sessionUser.lastName}</h3>
                            <button onClick={logout}>Logout</button>
                        </div>
                    </nav>
                </>
            ): (
                <>
                    <nav>
                        <div className='navbar'>
                            <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                                <h1 className="nav-title">Blueprint Manager</h1>
                            <Link className="logo" to='/'><SiNginxproxymanager /></Link>
                        </div>
                        <h3 className='slogan'>Your Ultimate Tool for Seamless Construction Project Management</h3>
                    </nav>
                </>
            )}

        </div>
    )
};

export default Navbar;