const express = require('express');
const { check } = require('express-validator');
const { Employee, Project } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Route to get all employees
router.get('/', async (req, res) => {
    try {
      const employees = await Employee.findAll({
        include: [
          {
            model: Project,
            attributes: ['id', 'name'] // Include the project details if necessary
          }
        ]
      });
      
      if (!employees) {
        return res.status(404).json({ message: 'No employees found' });
      }
  
      return res.json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// Update employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
      firstName,
      lastName,
      jobTitle,
      hireDate,
      contactNumber,
      email,
      salary,
      picture,
      projectId
  } = req.body;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  // }

  try {
      // Find the employee by id
      const employee = await Employee.findByPk(id);

      if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
      }

      // Update the employee
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.jobTitle = jobTitle;
      employee.hireDate = hireDate;
      employee.contactNumber = contactNumber;
      employee.email = email;
      employee.salary = salary;
      employee.picture = picture;
      employee.projectId = projectId;

      await employee.save();

      return res.status(200).json(employee);
  } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get a single employee by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const employee = await Employee.findByPk(id, {
          include: [
              {
                  model: Project,
                  as: 'project',
                  attributes: ['id', 'name'] 
              }
          ]
      });

      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }

      return res.status(200).json(employee);
  } catch (error) {
      console.error('Error fetching employee:', error);
      return res.status(500).json({ message: 'Internal server error' });
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

// POST create new Employee
router.post('/new', async (req, res, next) => {
  try {
      const { firstName, lastName, jobTitle, hireDate, contactNumber, email, salary, picture, projectId } = req.body;
      const newEmployee = await Employee.create({ firstName, lastName, jobTitle, hireDate, contactNumber, email, salary, picture, projectId });
      res.status(201).json(newEmployee);
  } catch (error) {
      error.message = "Bad Request"
      error.status = 400
      next(error)
  }
});

module.exports = router;
