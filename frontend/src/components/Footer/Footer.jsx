import './Footer.css';
import { PiCopyrightFill } from "react-icons/pi";

const Footer = () => {
    return (
        <footer style={{position: 'fixed', bottom: '0', width: '100%', height:'5%', backgroundColor: '#001f3f', color: 'white', textAlign: 'center'}} className='footer'>
            <p>
            <PiCopyrightFill /> 2024 Blueprint Manager.
            </p>
        </footer>
    )
}

export default Footer;