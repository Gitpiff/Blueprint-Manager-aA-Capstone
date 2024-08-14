import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getProject } from "../../store/project";

const ProjectDetails = () => {
    const dispatch = useDispatch();    
    const sessionUser = useSelector((state) => state.session.user);
    const { projectId } = useParams();

    const project = useSelector(state => state.projects ? state.projects[projectId] : null);

    useEffect(() => {
        if (projectId) {
            dispatch(getProject(projectId));
        }
    }, [dispatch, projectId]);

    if (!sessionUser) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mainContainer">
            <h1>Project Details</h1>
            <h1>{project.name}</h1>
        </div>
    
    )

}

export default ProjectDetails;