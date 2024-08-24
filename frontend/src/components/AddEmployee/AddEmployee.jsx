import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { createEmployee } from "../../store/employee";

const AddEmployee = ({ projectId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [hireDate, setHireDate] = useState(''); 
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [picture, setPicture] = useState('');
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
      
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if(validateEmployeeForm()) {
            const newEmployee = {
                projectId: projectId,
                firstName,
                lastName,
                jobTitle,
                hireDate,
                contactNumber,
                email,
                salary,
                picture,
            };

            dispatch(createEmployee(newEmployee))
                .then(() => {
                    closeModal();
                })
                .catch((err) => {
                    console.error("Failed to create employee:", err);
                    setErrors({ submit: "Failed to create employee" });
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
                
                
                <button type="submit">Add Employee</button>
                {errors.submit && <p className='errors'>{errors.submit}</p>}
            </form>
        </div>
    );
}


export default AddEmployee;