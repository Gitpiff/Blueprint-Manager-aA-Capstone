import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './HeroPage.css'
import LoginFormPage from "../LoginFormPage/LoginFormPage";
import Navbar from "../Navbar/Navbar";
 

function HeroPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Navigate to='/homepage' replace={true} />;

    return (
        <div className="mainContainer">
          <Navbar />
            <h1>Your Ultimate Tool for Seamless Construction Project Management</h1>
            
            <OpenModalButton
                className='login'
                buttonText='Log In'
                modalComponent={<LoginFormPage />}
            />
        </div>
    )
}

export default HeroPage;