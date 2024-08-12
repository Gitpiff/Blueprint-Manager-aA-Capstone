import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { getProjects } from '../../store/project';
import './Homepage.css'

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
            {projects?.map((project) => (
                    <div className='cardContainer' key={project.id}>
                        <div className='card'>
                            <h2>Project Name: {project.name}</h2>
                            <h2>Client: {project.clientName}</h2>
                            <h3>Start Date: {project.startDate}</h3>
                            <h3>Completion Date: {project.completionDate}</h3>
                            <img className='projectImage' src={project.projectImages[0]['url']} alt="" />
                            {/* <div className='imageContainer'>
                                {Array.isArray(project.projectImages) && project.projectImages.map(image => {
                                    return (
                                        <div key={image.id}>
                                            <img src={image.url} className='projectImage' />
                                        </div>
                                    )
                                })}
                            </div> */}
                        </div>
                    </div>
                ))}
            <Footer />
        </div>
    );
}

export default Homepage;
