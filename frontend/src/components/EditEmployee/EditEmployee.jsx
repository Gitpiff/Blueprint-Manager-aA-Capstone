import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { employeeUpdate, getEmployee } from "../../store/employee";
import './EditEmployee.css';

const EditEmployee = ({ employee }) => {
    const employeeId = employee?.id;
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [firstName, setFirstName] = useState(employee?.firstName || '');
    const [lastName, setLastName] = useState(employee?.lastName || '');
    const [jobTitle, setJobTitle] = useState(employee?.jobTitle || '');
    const [hireDate, setHireDate] = useState(employee?.hireDate ? employee.hireDate.split('T')[0] : ''); // Ensure it's a valid date string
    const [contactNumber, setContactNumber] = useState(employee?.contactNumber || '');
    const [email, setEmail] = useState(employee?.email || '');
    const [salary, setSalary] = useState(employee?.salary || 0); // Default to 0 if not provided
    const [picture, setPicture] = useState(employee?.picture || '');
    const [projectId, setProjectId] = useState(employee?.projectId || 0); // Default to 0 if not provided
    const [errors, setErrors] = useState({});

    const validateEmployeeForm = () => {
        const errors = {};
      
        // Validate First Name
        if (!firstName) {
            errors.firstName = "First Name is required";
        } else if (firstName.length < 2 || firstName.length > 30) {
            errors.firstName = "First Name must have between 2 and 30 characters";
        }
      
        // Validate Last Name
        if (!lastName) {
            errors.lastName = "Last Name is required";
        } else if (lastName.length < 2 || lastName.length > 30) {
            errors.lastName = "Last Name must have between 2 and 30 characters";
        }
      
        // Validate Job Title
        if (!jobTitle) {
            errors.jobTitle = "Job Title is required";
        } else if (jobTitle.length < 2 || jobTitle.length > 30) {
            errors.jobTitle = "Job Title must have between 2 and 30 characters";
        }
      
        // Validate Hire Date
        if (!hireDate) {
            errors.hireDate = "Hire Date is required";
        } else {
            const hireDateObj = new Date(hireDate);
            const today = new Date();
            if (hireDateObj > today) {
                errors.hireDate = "Hire Date cannot be in the future";
            }
        }
      
        // Validate Contact Number
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!contactNumber) {
            errors.contactNumber = "Phone number is required";
        } else if (!phoneRegex.test(contactNumber)) {
            errors.contactNumber = "Must be a valid phone number";
        }
      
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = "Email is required";
        } else if (email.length < 4 || email.length > 30) {
            errors.email = "Email must have between 4 and 30 characters";
        } else if (!emailRegex.test(email)) {
            errors.email = "Must be a valid email";
        }
      
        // Validate Salary
        if (!salary) {
            errors.salary = "Salary is required";
        } else if (isNaN(salary) || salary <= 0) {
            errors.salary = "Salary must be a positive number";
        }
      
        // Validate Picture
        if (!picture) {
            errors.picture = "Picture is required";
        }
      
        // Validate Project ID
        if (!projectId) {
            errors.projectId = "Project ID is required";
        } else if (isNaN(projectId)) {
            errors.projectId = "Project ID must be a number";
        }
      
        return errors;
    };
      

    useEffect(() => {
        if (!employee) {
            dispatch(getEmployee(employeeId));
        } else {
            setFirstName(employee.firstName || '');
            setLastName(employee.lastName || '');
            setJobTitle(employee.jobTitle || '');
            setHireDate(employee.hireDate ? employee.hireDate.split('T')[0] : ''); // Ensure it's a valid date string
            setContactNumber(employee.contactNumber || '');
            setEmail(employee.email || '');
            setSalary(employee.salary || 0);
            setPicture(employee.picture || '');
            setProjectId(employee.projectId || 0);
        }
    }, [dispatch, employee, employeeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if(validateEmployeeForm()) {
            const updatedEmployee = {
                id: employee.id, // include ID to identify which employee to update
                firstName,
                lastName,
                jobTitle,
                hireDate,
                contactNumber,
                email,
                salary,
                picture,
                projectId
            };

            dispatch(employeeUpdate(updatedEmployee))
                .then(() => {
                    dispatch(getEmployee(employeeId));
                    closeModal();
                })
                .catch((err) => {
                    console.error("Failed to update employee:", err);
                    setErrors({ submit: "Failed to update employee" });
                });

        } 
    }

    return (
        <div className='edit-employee'>
            <h2>Edit Employee</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className='errors'>{errors.firstName}</p>}
                
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className='errors'>{errors.lastName}</p>}
                
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.jobTitle && <p className='errors'>{errors.jobTitle}</p>}
                
                <label>
                    Hire Date:
                    <input
                        type="date"
                        name="hireDate"
                        value={hireDate}
                        onChange={(e) => setHireDate(e.target.value)}
                        required
                    />
                </label>
                {errors.hireDate && <p className='errors'>{errors.hireDate}</p>}
                
                <label>
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                    />
                </label>
                {errors.contactNumber && <p className='errors'>{errors.contactNumber}</p>}
                
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className='errors'>{errors.email}</p>}
                
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </label>
                {errors.salary && <p className='errors'>{errors.salary}</p>}
                
                <label>
                    Picture URL:
                    <input
                        type="text"
                        name="picture"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                        required
                    />
                </label>
                {errors.picture && <p className='errors'>{errors.picture}</p>}
                
                <label>
                    Project ID:
                    <input
                        type="number"
                        name="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                    />
                </label>
                {errors.projectId && <p className='errors'>{errors.projectId}</p>}
                
                <button type="submit">Update Employee</button>
                {errors.submit && <p className='errors'>{errors.submit}</p>}
            </form>
        </div>
    );
    
}

export default EditEmployee;
