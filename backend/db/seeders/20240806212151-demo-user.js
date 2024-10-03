'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const options = { tableName: 'Users' }; 

    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;  
    }

    try {
      await queryInterface.bulkInsert(options, [
        {
          firstName: 'Victor',
          lastName: 'Navarro',
          username: 'VictorN',
          companyName: 'Navarro Construction',
          industrySector: 'Construction',
          email: 'victorn@navarroconstruction.com',
          hashedPassword: bcrypt.hashSync('password', 10)  
        },
      ]);
    } catch (error) {
      console.error('Error inserting users:', error); 
    }
  },

  async down(queryInterface, Sequelize) {
    const options = { tableName: 'Users' };
    const Op = Sequelize.Op;

    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;  
    }
    
    try {
      await queryInterface.bulkDelete(options, {
        username: { [Op.in]: ['VictorN'] }
      });
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  }
};

