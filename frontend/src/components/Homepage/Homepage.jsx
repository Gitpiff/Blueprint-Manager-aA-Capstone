import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import * as sessionActions from '../../store/session';

function Homepage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    
        return <Navigate to="/" />;
    };

    if (!sessionUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mainContainer">
            <button onClick={logout}>Logout</button>
            <h1>Homepage</h1>
            <Footer />
        </div>
    );
}

export default Homepage;
