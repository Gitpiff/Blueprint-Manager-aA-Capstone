import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteEmployee } from "../../store/project"; 
import './DeleteEmployee.css';

const DeleteEmployee = ({ employee, projectId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(deleteEmployee(projectId, employee.id)); 
            closeModal(); 
        } catch (err) {
            console.error("Failed to delete employee:", err);
        }
    };

    return (
        <div className="delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove {employee.firstName} from this Project?</p>
            <div className="confirm-delete">
                <button className="yes-delete" onClick={handleDelete}>
                    Yes (Remove {employee.firstName})
                </button>
                <button className="no-delete" onClick={closeModal}>
                    No (Keep {employee.firstName})
                </button>
            </div>
        </div>
    );
};

export default DeleteEmployee;
