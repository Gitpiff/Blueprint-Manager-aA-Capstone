 'use strict';
const bcrypt = require('bcryptjs');

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
]

options.tableName = 'Employees';

module.exports = {
  async up (queryInterface, Sequelize) {
    const options = { tableName: 'Employees'};

    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;  
    }

    try {
      await queryInterface.bulkInsert(options, demoEmployees)
    } catch (error) {
     console.log(`Error Creating Employees: `, error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
       [Op.or]: demoEmployees
      }, {}); 
    } catch (error) {
      console.error('Error Deleting Employees', error);
    }
  }
};
