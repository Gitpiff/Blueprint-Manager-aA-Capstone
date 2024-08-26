import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { addImageToProject } from "../../store/project";

const AddProjectImage = ({ projectId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [url, setURL] = useState('');

    const validateUrlForm = () => {
        const errors = {};

        if (!url) {
            errors.url = "URL is required";
        } else if (!url.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i)) {
            errors.url = "Invalid URL format";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if(validateUrlForm()) {
            const newImage = {
                projectId: projectId,
                url
            }
            console.log(newImage)

            dispatch(addImageToProject(newImage))
                .then(() => {
                    closeModal();
                })
                .catch((err) => {
                    console.error("Failed to add image:", err);
                    setErrors({ submit: "Failed to add image" });
                });
        }
    }

    return (
        <div>
            <h2>Add Image</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Image URL:
                    <input 
                        type="text" 
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                    />
                </label>
                {errors.url && <p className="error">{errors.url}</p>}
                
                <button type="submit">Add Image</button>
                {errors.submit && <p className="error">{errors.submit}</p>}
            </form>
        </div>
    );
}

export default AddProjectImage;
