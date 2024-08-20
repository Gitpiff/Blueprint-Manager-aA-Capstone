const express = require('express');
const { check } = require('express-validator');
const { Employee } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

// GET all Employees
router.get('/', async (req, res, next) => {
    try {
        const staff = await Staff.findAll();
        res.json(staff);
    } catch (error) {
        next(error);
    }
});

// GET Employee by ID
router.get('/:id', async (req, res, next) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (staff) {
            res.json(staff);
        } else {
            res.status(404).json({ message: 'Staff not found' });
        }
    } catch (error) {
        next(error);
    } 
});

// POST create new Employee
router.post('/new', validateStaff, async (req, res, next) => {
    try {
        const { firstName, lastName, jobTitle, hireDate, contactNumber, email, salary, picture } = req.body;
        const newEmployee = await Staff.create({ firstName, lastName, jobTitle, hireDate, contactNumber, email, salary, picture });
        res.status(201).json(newEmployee);
    } catch (error) {
        error.message = "Bad Request"
        error.status = 400
        next(error)
    }
});

// PUT update Employee
router.put('/:id', validateStaff, async (req, res, next) => {
    try {
        const { firstName, lastName, jobTitle, hireDate, contactNumber, email, salary, picture  } = req.body;
        const employee = await Employee.findByPk(req.params.id);

        if (employee) {
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.jobTitle = jobTitle;
            employee.picture = picture;
            employee.hireDate = hireDate;
            employee.contactNumber = contactNumber;
            employee.email = email;
            employee.salary = salary;
            employee.picture = picture;

            await employee.save();
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        next(error);
    }
});

// DELETE Employee
router.delete('/:id', async (req, res, next) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.status(200).json({ message: "Employee Successfully Removed from Project" });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
