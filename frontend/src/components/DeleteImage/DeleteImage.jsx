import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteImage } from "../../store/projectImage";

const DeleteImage = ({projectImage}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yes = () => {
        return dispatch(deleteImage(projectImage.id))
            .then(() => {
                closeModal();
            })
            .catch(err => {
                console.log("Failed to delete image: ", err)
            })
    }

    return (
        <div className="delete">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this image from this Project?</p>
        <div className="confirm-delete">
            <button className="yes-delete" onClick={yes}>Yes</button>
            <button className="no-delete" onClick={closeModal}>No</button>
        </div>
    </div>
    )
}

export default DeleteImage;