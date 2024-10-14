'use strict';
const Employee = require('../models/employee');

const demoEmployees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Project Manager',
    hireDate: new Date('2024-03-01'),
    contactNumber: 12345678901,
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
    contactNumber: 12345678910,
    email: 'hank.anderson@example.com',
    salary: 67000,
    picture: 'https://i0.wp.com/construct-ed.com/wp-content/uploads/2022/10/construction-foreman-job-description.jpg?fit=933%2C1000&ssl=1',
    projectId: 3,
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    jobTitle: 'Architect',
    hireDate: new Date('2024-04-10'),
    contactNumber: 12345678911,
    email: 'alice.johnson@example.com',
    salary: 75000,
    picture: 'https://images.pexels.com/photos/374820/pexels-photo-374820.jpeg',
    projectId: 3,
  },
  {
    firstName: 'Bob',
    lastName: 'Williams',
    jobTitle: 'Electrician',
    hireDate: new Date('2024-04-12'),
    contactNumber: 12345678912,
    email: 'bob.williams@example.com',
    salary: 55000,
    picture: 'https://images.pexels.com/photos/776615/pexels-photo-776615.jpeg',
    projectId: 1,
  },
  {
    firstName: 'Charlie',
    lastName: 'Smith',
    jobTitle: 'Carpenter',
    hireDate: new Date('2024-04-15'),
    contactNumber: 12345678913,
    email: 'charlie.smith@example.com',
    salary: 62000,
    picture: 'https://images.pexels.com/photos/896056/pexels-photo-896056.jpeg',
    projectId: 1,
  },
  {
    firstName: 'Diana',
    lastName: 'Clark',
    jobTitle: 'Plumber',
    hireDate: new Date('2024-04-18'),
    contactNumber: 12345678914,
    email: 'diana.clark@example.com',
    salary: 58000,
    picture: 'https://images.pexels.com/photos/3807313/pexels-photo-3807313.jpeg',
    projectId: 3,
  },
  {
    firstName: 'Ethan',
    lastName: 'Wright',
    jobTitle: 'Site Engineer',
    hireDate: new Date('2024-05-01'),
    contactNumber: 12345678915,
    email: 'ethan.wright@example.com',
    salary: 69000,
    picture: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
    projectId: 3,
  },
  {
    firstName: 'Fiona',
    lastName: 'Martinez',
    jobTitle: 'Civil Engineer',
    hireDate: new Date('2024-05-10'),
    contactNumber: 12345678916,
    email: 'fiona.martinez@example.com',
    salary: 71000,
    picture: 'https://images.pexels.com/photos/7659/pexels-photo.jpeg',
    projectId: 1,
  },
  {
    firstName: 'George',
    lastName: 'King',
    jobTitle: 'Surveyor',
    hireDate: new Date('2024-05-15'),
    contactNumber: 12345678917,
    email: 'george.king@example.com',
    salary: 67000,
    picture: 'https://images.pexels.com/photos/2969188/pexels-photo-2969188.jpeg',
    projectId: 3,
  },
  {
    firstName: 'Helen',
    lastName: 'Lopez',
    jobTitle: 'Project Coordinator',
    hireDate: new Date('2024-06-01'),
    contactNumber: 12345678918,
    email: 'helen.lopez@example.com',
    salary: 60000,
    picture: 'https://images.pexels.com/photos/262034/pexels-photo-262034.jpeg',
    projectId: 1,
  },
  {
    firstName: 'Isaac',
    lastName: 'Garcia',
    jobTitle: 'Bricklayer',
    hireDate: new Date('2024-06-10'),
    contactNumber: 12345678919,
    email: 'isaac.garcia@example.com',
    salary: 55000,
    picture: 'https://images.pexels.com/photos/848614/pexels-photo-848614.jpeg',
    projectId: 3,
  },
  {
    firstName: 'Jessica',
    lastName: 'Hernandez',
    jobTitle: 'Painter',
    hireDate: new Date('2024-06-20'),
    contactNumber: 12345678920,
    email: 'jessica.hernandez@example.com',
    salary: 53000,
    picture: 'https://images.pexels.com/photos/4112059/pexels-photo-4112059.jpeg',
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
