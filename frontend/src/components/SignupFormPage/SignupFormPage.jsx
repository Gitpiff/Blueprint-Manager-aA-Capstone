import { useState } from 'react';
import { useDispatch} from 'react-redux';
//import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import './SignupForm.css'
import { Navigate } from 'react-router-dom';

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  //const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const validateSignupForm = () => {
    const errors = {};

    if (!firstName) {
        errors.firstName = 'First Name is required';
    } else if (firstName.length < 2 || firstName.length > 30) {
        errors.firstName = 'First Name must have between 2 and 30 characters';
    }

    if (!lastName) {
        errors.lastName = 'Last Name is required';
    } else if (lastName.length < 2 || lastName.length > 30) {
        errors.lastName = 'Last Name must have between 2 and 30 characters';
    }

    if (!username) {
        errors.username = 'Username is required';
    } else if (username.length < 2 || username.length > 15) {
        errors.username = 'Username must have between 2 and 15 characters';
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) { 
        errors.username = 'Username cannot be an email';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
        errors.email = 'Must be a valid email';
    } else if (email.length < 4 || email.length > 30) {
        errors.email = 'Email must have between 4 and 30 characters';
    }

    if (!companyName) {
        errors.companyName = 'Company Name is required';
    } else if (companyName.length < 2 || companyName.length > 30) {
        errors.companyName = 'Company Name must have between 2 and 30 characters';
    }

    if (!industrySector) {
        errors.industrySector = 'Industry Sector is required';
    } else if (industrySector.length < 2 || industrySector.length > 30) {
        errors.industrySector = 'Industry Sector must have between 2 and 30 characters';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 7 || password.length > 80) {
        errors.password = 'Password must have between 7 and 80 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
};

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if(!validateSignupForm()) return;

    
    if (password === confirmPassword) {

      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          username,
          companyName,
          industrySector,
          email,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          closeModal()
          return <Navigate to="/" replace={true} />
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
    <div style={{ backgroundColor: '#001f3f' }} className='signup-modal'>
        <h1 className='login-title'>Sign Up</h1>
        <form className='form' onSubmit={handleSubmit}>
        <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className='errors'>{errors.firstName}</p>}

          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className='errors'>{errors.lastName}</p>}

          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className='errors'>{errors.username}</p>}
          
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className='errors'>{errors.email}</p>}
          
          <label>
            Company Name
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </label>
          {errors.companyName && <p className='errors'>{errors.companyName}</p>}
          
          <label>
            Industry Sector
            <input
              type="text"
              value={industrySector}
              onChange={(e) => setIndustrySector(e.target.value)}
              required
            />
          </label>
          {errors.industrySector && <p className='errors'>{errors.industrySector}</p>}
          
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className='errors'>{errors.password}</p>}
          
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
          <div className='signup-btns'>
            <button type="submit">Sign Up</button>
          </div>
        </form>
    </div>
    </>
  );
};

export default SignUpFormPage;
