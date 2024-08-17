import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteProject } from "../../store/project";
import { Navigate } from "react-router-dom";

const DeleteProject = ({ projectId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yes = () => {
        dispatch(deleteProject(projectId))
        closeModal();
        return <Navigate to="/projects" />
    }    

    return (
        <div className="delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this Project?</p>
            <div className="confirm-delete">
                <button className="yes-delete" onClick={yes}>Yes (Delete Project)</button>
                <button className="no-delete" onClick={closeModal}>No (Keep Project)</button>
            </div>
        </div>
    )
};

export default DeleteProject;