import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './HeroPage.css'
 

function HeroPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Navigate to='/homepage' replace={true} />;

    return (
        <div className="mainContainer">
            <h1>Blueprint Manager</h1>
            <nav>Navbar</nav>
            <button>Login</button>
            <button>Signup</button>
        </div>
    )
}

export default HeroPage;