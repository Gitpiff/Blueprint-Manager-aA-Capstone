import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from "../LoginFormPage/LoginFormPage";
//import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import SignUpFormPage from "../SignupFormPage/SignupFormPage";
import './HeroPage.css'
 

function HeroPage() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Navigate to='/homepage' replace={true} />;

    return (
        <div className="mainContainer">
          {/* <Navbar /> */}
            <div className="auth-btns">
                <li>
                    <OpenModalButton
                        buttonText='Log In'
                        modalComponent={<LoginFormPage />}
                    />
                </li>

                <li>
                    <OpenModalButton
                        buttonText='Sign Up'
                        modalComponent={<SignUpFormPage />}
                    />
                </li>
            </div>

            <Footer />
        </div>
    )
}

export default HeroPage;