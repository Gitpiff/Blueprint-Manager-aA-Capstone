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

module.exports = router;
