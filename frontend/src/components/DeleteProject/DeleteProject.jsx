import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteProject } from "../../store/project";
import { Navigate } from "react-router-dom";
import './DeleteProject.css'

const DeleteProject = ({ projectId }) => {
    console.log("Project to Delete: ", projectId);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yes = async () => {
        return dispatch(deleteProject(projectId))
        .then (() => {
            closeModal();
            <Navigate to="/homepage" />
        })
    }    

    return (
        <div className="delete">
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this Project?</h2>
            <div className="confirm-delete">
                <button className="yes-delete" onClick={yes}>Yes (Delete Project)</button>
                <button className="no-delete" onClick={closeModal}>No (Keep Project)</button>
            </div>
        </div>
    )
};

export default DeleteProject;