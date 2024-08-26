import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { getProjects } from '../../store/project';
import OpenModalButton from '../OpenModalButton';
import NewProjectForm from '../NewProjectForm/NewProjectForm';
import DeleteProject from '../DeleteProject/DeleteProject';
import './Homepage.css'
import UpdateProject from '../UpdateProject/UpdateProject';

const Homepage = () => {
    const dispatch = useDispatch();    
    const sessionUser = useSelector((state) => state.session.user);
    const projects = Object.values(useSelector(state => state.projects));

    // const employees = Object.values(useSelector(state => state.employees));
    // console.log("Employees: ",employees);
    
    console.log('Projects: ', projects);


    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    if (!sessionUser) {
        return <Navigate to="/" />;
    }

    const getYearMonthDay = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        return `${formattedMonth}-${formattedDay}-${year}`;
    }

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
                    <Link className='no-underline' to={`/projects/${project.id}`} >
                        <div className='card'>
                            <h2>Project Name: {project.name}</h2>
                            <h2>Client: {project.clientName}</h2>
                            <h3>Start Date: {getYearMonthDay(project.startDate)}</h3>
                            <h3>Completion Date: {getYearMonthDay(project.completionDate)}</h3>
                            <div className='imageContainer'>
                                <img className='projectImage' src={project.coverImage} alt="Project cover image" />
                            </div>
                        </div>
                    </Link>
                    <div className='card-buttons'>
                        <div className='delete-project'>
                            <OpenModalButton
                                buttonText="Delete Project"
                                modalComponent={<DeleteProject projectId={project.id} />}
                            />
                        </div>
                        <div className='edit-project'>
                            <OpenModalButton
                                buttonText="Edit Project"
                                modalComponent={<UpdateProject project={project} />}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Footer />
        </div>
    );
    
}

export default Homepage;
