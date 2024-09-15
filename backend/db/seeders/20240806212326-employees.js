 'use strict';
const bcrypt = require('bcryptjs');

let options = {}
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

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
    firstName: 'Jane',
    lastName: 'Smith',
    jobTitle: 'Construction Supervisor',
    hireDate: new Date('2024-05-01'),
    contactNumber: '+12345678902',
    email: 'jane.smith@example.com',
    salary: 65000,
    picture: 'https://constructionmanagement.co.uk/wp-content/uploads/2021/02/Leena-Begum.jpg',
    projectId: 2,
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    jobTitle: 'Site Engineer',
    hireDate: new Date('2024-06-01'),
    contactNumber: '+12345678903',
    email: 'alice.johnson@example.com',
    salary: 70000,
    picture: 'https://static.probuildermag.co.uk/professional-builder/uploads/Shutterstock-LO2-scaled.jpg',
    projectId: 3,
  },
  {
    firstName: 'Bob',
    lastName: 'Brown',
    jobTitle: 'Architect',
    hireDate: new Date('2024-04-01'),
    contactNumber: '+12345678904',
    email: 'bob.brown@example.com',
    salary: 62000,
    picture: 'https://images.pexels.com/photos/3831164/pexels-photo-3831164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    projectId: 1,
  },
  {
    firstName: 'Carol',
    lastName: 'Davis',
    jobTitle: 'Architect',
    hireDate: new Date('2024-03-01'),
    contactNumber: '+12345678905',
    email: 'carol.davis@example.com',
    salary: 68000,
    picture: 'https://concrete-live.storage.googleapis.com/upload/img_cache/file-990-56b2d4fb3910162d04ca51efcf40e566.jpg',
    projectId: 2,
  },
  {
    firstName: 'David',
    lastName: 'Miller',
    jobTitle: 'Surveyor',
    hireDate: new Date('2024-04-01'),
    contactNumber: '+12345678906',
    email: 'david.miller@example.com',
    salary: 71000,
    picture: 'https://www.workbc.ca/sites/default/files/styles/hero_image/public/NTI5NzE_7xf1kHABIYoYubB1-2154-NOC.jpg?itok=3946badQ',
    projectId: 3,
  },
  {
    firstName: 'Emma',
    lastName: 'Wilson',
    jobTitle: 'Electrician',
    hireDate: new Date('2024-03-01'),
    contactNumber: '+12345678907',
    email: 'emma.wilson@example.com',
    salary: 63000,
    picture: 'https://static.professional-electrician.com/professional-electrician/uploads/2020/03/AdobeStock_207721127.jpeg.jpg',
    projectId: 1,
  },
  {
    firstName: 'Frank',
    lastName: 'Moore',
    jobTitle: 'Plumber',
    hireDate: new Date('2024-03-01'),
    contactNumber: '+12345678908',
    email: 'frank.moore@example.com',
    salary: 64000,
    picture: 'https://b3503797.smushcdn.com/3503797/wp-content/uploads/2023/01/iStock-1341381755-1024x683.jpg?lossy=2&strip=1&webp=1',
    projectId: 2,
  },
  {
    firstName: 'Grace',
    lastName: 'Taylor',
    jobTitle: 'Carpenter',
    hireDate: new Date('2024-03-01'),
    contactNumber: '+12345678909',
    email: 'grace.taylor@example.com',
    salary: 66000,
    picture: 'https://www.checkatrade.com/blog/wp-content/uploads/2023/10/carpentry-for-women.jpg',
    projectId: 3,
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
