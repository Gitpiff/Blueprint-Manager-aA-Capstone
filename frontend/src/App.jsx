import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import * as sessionActions from './store/session';
import HeroPage from './components/HeroPage/HeroPage';
import Homepage from './components/Homepage/Homepage';
import SignUpFormPage from './components/SignupFormPage/SignupFormPage';
// import './LoginForm.css';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HeroPage />
      },
      {
        path: '/homepage',
        element: <Homepage />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignUpFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

