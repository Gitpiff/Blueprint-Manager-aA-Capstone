import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteImage } from "../../store/project";

const DeleteImage = ({projectImage, projectId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await dispatch(deleteImage(projectId, projectImage.id))
            closeModal();
        } catch(err) {
            console.log("Failed to delete image: ", err)
        }
    };


    return (
        <div className="delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this Image from this Project?</p>
            <div className="confirm-delete">
                <button className="yes-delete" onClick={handleDelete}>
                    Yes (Remove {projectImage.firstName})
                </button>
                <button className="no-delete" onClick={closeModal}>
                    No (Keep {projectImage.firstName})
                </button>
            </div>
        </div>
    );
}

export default DeleteImage;