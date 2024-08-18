import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject, projectUpdate } from "../../store/project"; 
import { useModal } from '../../context/Modal';
import './UpdateProject.css';

const UpdateProject = ({ project }) => {
    const projectId = project?.id;
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);

    const [formData, setFormData] = useState({
        id: project.id,
        projectManagerId: sessionUser?.id || "",
        coverImage: "",
        name: "",
        clientName: "",
        description: "",
        budget: "",
        startDate: "",
        completionDate: "",
        projectImages: []
    });

    const [errors, setErrors] = useState({});

    const validateProjectForm = () => {
        const errors = {};
    
        if (!formData.name || formData.name.length < 7 || formData.name.length > 30) {
            errors.name = "Project Name must be between 7 and 30 characters";
        }
        if (!formData.clientName || formData.clientName.length < 7 || formData.clientName.length > 30) {
            errors.clientName = "Client Name must be between 7 and 30 characters";
        }
        if (!formData.description || formData.description.length < 30 || formData.description.length > 2000) {
            errors.description = "Project Description must be between 30 and 2000 characters";
        }
        if (!formData.coverImage || !/^https?:\/\/[^\s]+$/.test(formData.coverImage)) {
            errors.coverImage = "A valid Cover Image URL is required";
        }
        if (!formData.budget || formData.budget <= 500) {
            errors.budget = "Budget must be greater than 500";
        }
        if (!formData.startDate) {
            errors.startDate = "Start Date is required";
        } else if (new Date(formData.startDate) <= new Date()) {
            errors.startDate = "Start Date cannot be in the past";
        }
        if (!formData.completionDate) {
            errors.completionDate = "Completion Date is required";
        } else if (new Date(formData.completionDate) <= new Date(formData.startDate)) {
            errors.completionDate = "Completion Date cannot be on or before Start Date";
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    

    useEffect(() => {
        if (!project) {
            dispatch(getProject(projectId));
        } else {
            setFormData({
                projectManagerId: sessionUser.id,
                id: project.id,
                coverImage: project.coverImage || "",
                name: project.name || "",
                clientName: project.clientName || "",
                description: project.description || "",
                budget: project.budget || "",
                startDate: project.startDate ? project.startDate.split('T')[0] : "",
                completionDate: project.completionDate ? project.completionDate.split('T')[0] : "",
                projectImages: project.projectImages.map(image => image.url) || []
            });
        }
    }, [dispatch, project, projectId, sessionUser?.id]);

    const handleImageChange = (index, value) => {
        const newProjectImages = [...formData.projectImages];
        newProjectImages[index] = value;
        setFormData({ ...formData, projectImages: newProjectImages });
    };

    const addImageField = () => {
        setFormData({
            ...formData,
            projectImages: [...formData.projectImages, ""]
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if(!validateProjectForm()) return;

        try {
            console.log(formData, projectId)
            await dispatch(projectUpdate(formData, projectId));
            closeModal();
        } catch (err) {
            if (err.response) {
                const data = await err.response.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            }
        }
    };

    return (
        <div className='updateProjectForm'>
            <h1 className='login-title'>Update Project</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label>
                    Project Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.name && <p className='errors'>{errors.name}</p>}

                <label>
                    Client Name:
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.clientName && <p className='errors'>{errors.clientName}</p>}

                <label>
                    Description:
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="10"
                />
                {errors.description && <p className='errors'>{errors.description}</p>}

                <label>
                    Budget:
                    <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.budget && <p className='errors'>{errors.budget}</p>}

                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.startDate && <p className='errors'>{errors.startDate}</p>}

                <label>
                    Completion Date:
                    <input
                        type="date"
                        name="completionDate"
                        value={formData.completionDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.completionDate && <p className='errors'>{errors.completionDate}</p>}

                <label>
                    Cover Image URL:
                    <input
                        type="text"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.coverImage && <p className='errors'>{errors.coverImage}</p>}

                <label>
                    Project Images:
                </label>
                {formData.projectImages.map((image, index) => (
                    <div key={index}>
                        <input
                            className="addProjectImages"
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}

                <button className="addMoreImagesButton" type="button" onClick={addImageField}>Add Another Image</button>

                <button className="updateProjectButton" type="submit">Update Project</button>
            </form>
        </div>
    );
};

export default UpdateProject;
