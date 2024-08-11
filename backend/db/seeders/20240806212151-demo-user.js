'use strict';
const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const options = { tableName: 'Users' }; 

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

    try {
      await queryInterface.bulkDelete(options, {
        username: { [Op.in]: ['VictorN'] }
      });
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  }
};

