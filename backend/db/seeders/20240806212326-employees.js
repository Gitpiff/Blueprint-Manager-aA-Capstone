'use strict';
const Employee = require('../models/employee');

const demoEmployees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Project Manager',
    hireDate: new Date('2024-03-01'),
    contactNumber: '+12345678901',
    email: 'john.doe@example.com',
    salary: 60000,
    picture: 'https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    projectId: 1,
  },
  {
    firstName: 'Hank',
    lastName: 'Anderson',
    jobTitle: 'Foreman',
    hireDate: new Date('2024-03-01'),
    contactNumber: '+12345678910',
    email: 'hank.anderson@example.com',
    salary: 67000,
    picture: 'https://i0.wp.com/construct-ed.com/wp-content/uploads/2022/10/construction-foreman-job-description.jpg?fit=933%2C1000&ssl=1',
    projectId: 1,
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    const options = { tableName: 'Employees' };

    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;  
    }

    try {
      return await queryInterface.bulkInsert(options, demoEmployees, { validate: true });
    } catch (error) {
      console.error(`Error Creating Employees: ${error.message}`, error);
    }
  },

  async down (queryInterface, Sequelize) {
    const options = { tableName: 'Employees' };
    const Op = Sequelize.Op;

    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;  
    }

    try {
      return await queryInterface.bulkDelete(options, {
        [Op.or]: demoEmployees.map(employee => ({ email: employee.email }))
      }, {});
    } catch (error) {
      console.error(`Error Deleting Employees: ${error.message}`, error);
    }
  }
};
