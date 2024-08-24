import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteEmployee } from "../../store/employee";
import './DeleteEmployee.css';

const DeleteEmployee = ({employee}) => {
    console.log(employee.id)
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yes = () => {
        return dispatch(deleteEmployee(employee.id))
            .then(() => {
                closeModal(); // Close the modal after the employee is successfully deleted
            })
            .catch(err => {
                console.error("Failed to delete employee:", err);
                // Handle any errors if necessary
            });
    };

    return (
        <div className="delete">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove {employee.firstName} from this Project?</p>
        <div className="confirm-delete">
            <button className="yes-delete" onClick={yes}>Yes (Remove {employee.firstName})</button>
            <button className="no-delete" onClick={closeModal}>No (Keep {employee.firstName})</button>
        </div>
    </div>
    )
}

export default DeleteEmployee;