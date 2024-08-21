import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getProject } from "../../store/project";
import Footer from '../Footer/Footer';
import OpenModalButton from '../OpenModalButton';
import DeleteProject from '../DeleteProject/DeleteProject';
import './ProjectDetails.css'

const ProjectDetails = () => {
    const dispatch = useDispatch();    
    const sessionUser = useSelector((state) => state.session.user);
    const { projectId } = useParams();

    const project = useSelector(state => state.projects ? state.projects[projectId] : null);
    // console.log(project.employees)

    // const employees = Object.values(useSelector(state => state.employees));
    // console.log("Employees: ",employees);


    useEffect(() => {
        if (projectId) {
            dispatch(getProject(projectId));
        }
    }, [dispatch, projectId]);

    if (!sessionUser) {
        return <Navigate to="/" />;
    }

    if (!project) {
        return <div>Loading project details...</div>;  // Show a loading message while the project data is being fetched
    }

    const totalDays = (commencementDate, completionDate) => {
        const startDate = new Date(commencementDate);
        const endDate = new Date(completionDate);
        const timeDifference = endDate - startDate;
        const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return totalDays;
    }

    const daysLeft = (completionDate) => {
        const endDate = new Date(completionDate);
        const now = new Date();
        const timeDifference = endDate - now;
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysLeft;
    }

    const formatCurrency = (num, locale = 'en-US', currency = 'USD') => {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        });
        return formatter.format(num);
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
        project && (
            <div className="projectDetailsContainer">
                <div className="projectDetails">
                    <nav className="projectNav">
                        <div>
                            <h2>Days Until Completion</h2>
                            <h2>Project will start in {totalDays(project.startDate, project.completionDate)} days</h2>
                            <h2>You have {daysLeft(project.completionDate)} days to finish it</h2>
                        </div>
    
                        <div>
                            <h2>Project </h2>
                            <h2>{project.name}</h2>
                            <h3>Start Date: {getYearMonthDay(project.startDate)}</h3>
                        </div>
    
                        <div>
                            <h2>Client Name</h2>
                            <h2>{project.clientName}</h2>
                            <h3>Completion Date: {getYearMonthDay(project.completionDate)}</h3>
                        </div>
    
                        <div>
                            <h2>Budget</h2>
                            <h2>{formatCurrency(project.budget)}</h2>
                        </div>
                    </nav>
    
                    <div className="projectImagesContainer">
                        {Array.isArray(project.projectImages) && project.projectImages.map(image => {
                            return (
                                <>
                                    
                                    <div key={image.id}>
                                        <img className="projectImage" src={image.url} alt="project.name" />
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="projectDescription">
                        <h1>Project Description</h1>
                        <p>{project.description}</p>
                    </div>
                    <OpenModalButton
                        buttonText="Delete Project"
                        modalComponent={<DeleteProject projectId={project.id} />}
                    />

                    <div>
                        {Array.isArray(project.employees) && project.employees.map(employee => {
                            return (
                                <>
                                    <div key={employee.id}>
                                        <h3>{employee.firstName}</h3>
                                        <h3>{employee.lastName}</h3>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        
        )
    )

}

export default ProjectDetails;