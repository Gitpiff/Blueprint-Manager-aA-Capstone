import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import './EditImage.css'
import { getCurrentImage, updateImage } from "../../store/project";

const EditImage = ({ projectImage }) => {
    console.log(projectImage.id)
    const imageId = projectImage?.id;
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [url, setUrl] = useState(projectImage?.url || '');
    const [errors, setErrors] = useState({});

    const validateImage = () => {
        if(!url) {
            errors.url = "Image URL is required"
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    useEffect(() => {
        if(!projectImage) {
            dispatch(getCurrentImage(imageId))
        } else {
            setUrl(projectImage.url || '')
        }
    }, [dispatch, projectImage, imageId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if(validateImage()) {
            const updatedImage = {
                id: imageId,
                url
            }

            dispatch(updateImage(updatedImage))
                .then(() => {
                    dispatch(getCurrentImage(imageId));
                    closeModal();
                })
                .catch((err) => {
                    console.error("Failed to update Image:", err);
                    setErrors({ submit: "Failed to update Image" });
                });
        }
    }

    return (
        <div className="edit-image">
            <h2>Edit Image</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    New URL:
                    <input 
                        type="text"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required 
                    />
                </label>
                {errors.url && <p className="errors">{errors.url}</p>}

                <button type="submit">Update Image</button>
                {errors.submit && <p className='errors'>{errors.submit}</p>}
            </form>
        </div>
    )

}

export default EditImage;