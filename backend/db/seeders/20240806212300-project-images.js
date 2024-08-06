'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ProjectImages';
    return queryInterface.bulkInsert(options, [
      {
        projectId: 1,
        url: 'https://images.unsplash.com/photo-1706164971293-2d58eb66242b?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 1,
        url: 'https://images.unsplash.com/photo-1657383543368-7d929944be6a?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 1,
        url: 'https://images.unsplash.com/photo-1657383543451-e47d1589195d?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 1,
        url: 'https://images.unsplash.com/photo-1631752674874-9994662712af?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 1,
        url: 'https://images.unsplash.com/photo-1674672670977-bcf517fc2376?q=80&w=4742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 2,
        url: 'https://images.pexels.com/photos/2996073/pexels-photo-2996073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        projectId: 2,
        url: 'https://images.pexels.com/photos/2510067/pexels-photo-2510067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        projectId: 2,
        url: 'https://images.pexels.com/photos/1878810/pexels-photo-1878810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        projectId: 2,
        url: 'https://images.pexels.com/photos/18213785/pexels-photo-18213785/free-photo-of-bed-and-furniture-in-log-cabin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        projectId: 2,
        url: 'https://images.pexels.com/photos/5906363/pexels-photo-5906363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        projectId: 3,
        url: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 3,
        url: 'https://images.unsplash.com/photo-1514994444123-10094655bdb5?q=80&w=2651&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 3,
        url: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 3,
        url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 3,
        url: 'https://images.unsplash.com/photo-1577992805669-c80be3285f36?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        projectId: 4,
        url: 'https://i.insider.com/55bfd5b62acae70f008bcb27?width=1136&format=jpeg'
      },
      {
        projectId: 4,
        url: 'https://images.getbento.com/accounts/bf4828ed953b98a4f73b6ff9a58082be/media/images/908DW2I3136.jpg?w=1200&fit=crop&auto=compress,format&crop=focalpoint&fp-x=0.48&fp-y=0.62'
      },
      {
        projectId: 4,
        url: 'https://cdn4.tuscanynowandmore.com/storage/app/media/discover-italy/italian-restaurant-img.jpg'
      },
      {
        projectId: 4,
        url: 'https://i0.wp.com/www.touristitaly.com/wp-content/uploads/2023/11/piedmont-old-town-restaurant-scaled.jpg?fit=8159%2C5066&ssl=1'
      },
      {
        projectId: 4,
        url: 'https://assets.bonappetit.com/photos/5ca680eff7c9b51309c95d26/16:9/w_2560%2Cc_limit/luigis-2.jpg'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProjectImages';
    return queryInterface.bulkDelete(options, {
      projectId: { [Op.in]: [1, 2, 3, 4] }
    })
  }
};
