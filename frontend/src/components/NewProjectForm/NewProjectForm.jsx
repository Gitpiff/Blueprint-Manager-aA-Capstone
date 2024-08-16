import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './NewProjectForm.css'

const NewProjectForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [formData, setFormData] = useState({
        projectManagerId: sessionUser.id,
        coverImage: "",
        name: "",
        clientName: "",
        description: "",
        budget: "",
        startDate: "",
        completionDate: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
    
        try {
          await dispatch(sessionActions.createProject(formData));
          return <Navigate to="/projects" />;
        } catch (err) {
          const data = await err.response.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        }
      };

      return (
        <div className='createProjectForm'>
            <h1 className='login-title'>Create New Project</h1>
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
                
                <button className="newProjectButton" type="submit">Create Project</button>
            </form>
        </div>
    );
}

export default NewProjectForm;