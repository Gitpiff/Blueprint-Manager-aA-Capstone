import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { getProjects } from '../../store/project';
import OpenModalButton from '../OpenModalButton';
import './Homepage.css'
import NewProjectForm from '../NewProjectForm/NewProjectForm';

const Homepage = () => {
    const dispatch = useDispatch();    
    const sessionUser = useSelector((state) => state.session.user);
    const projects = Object.values(useSelector(state => state.projects));
    console.log('Projects: ', projects);


    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    if (!sessionUser) {
        return <Navigate to="/" />;
    }

    //  // Get the correct date format
    //  function getYearMonthDay(dateString) {
    //     const date = new Date(dateString);
    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1; // getMonth() returns 0-11
    //     const day = date.getDate();
        
    //     const formattedMonth = month.toString().padStart(2, '0');
    //     const formattedDay = day.toString().padStart(2, '0');
        
    //     return `${year}-${formattedMonth}-${formattedDay}`;
    // }

    return (
        <div className="mainContainer">
            <div className='newProject'>
                <OpenModalButton
                    buttonText='Add New Project'
                    modalComponent={<NewProjectForm />}
                />
            </div>
            {projects?.map((project) => (
                    <div className='cardContainer' key={project.id}>
                        <Link to={`/projects/${project.id}`} >
                            <div className='card'>
                                <h2>Project Name: {project.name}</h2>
                                <h2>Client: {project.clientName}</h2>
                                <h3>Start Date: {project.startDate}</h3>
                                <h3>Completion Date: {project.completionDate}</h3>
                                <div className='imageContainer'>
                                    <img className='projectImage' src={project.coverImage} alt="" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            <Footer />
        </div>
    );
}

export default Homepage;
