import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Homepage() {    
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mainContainer">
            <h1>Current Projects</h1>
            <Footer />
        </div>
    );
}

export default Homepage;
