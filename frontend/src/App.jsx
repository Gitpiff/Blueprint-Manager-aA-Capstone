import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import * as sessionActions from './store/session';
import HeroPage from './components/HeroPage/HeroPage';
import Homepage from './components/Homepage/Homepage';
import SignUpFormPage from './components/SignupFormPage/SignupFormPage';
import Navbar from './components/Navbar/Navbar';
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import NewProjectForm from './components/NewProjectForm/NewProjectForm';
import UpdateProject from './components/UpdateProject/UpdateProject';
import EditEmployee from './components/EditEmployee/EditEmployee';
import AddEmployee from './components/AddEmployee/AddEmployee';
// import './LoginForm.css';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch, isLoaded]);

  return (
    <>
      <Navbar isLoaded={isLoaded} />
      <div>
        {isLoaded && <Outlet />}
      </div>
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
      },
      {
        path: '/projects/:projectId',
        element: <ProjectDetails />
      },
      {
        path: '/projects/new',
        element: <NewProjectForm />
      },
      {
        path: '/projects/:id/edit',
        element: <UpdateProject />
      },
      {
        path: '/employees/:id',
        element: <EditEmployee />
      },
      {
        path: '/employees/new',
        element: <AddEmployee />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

