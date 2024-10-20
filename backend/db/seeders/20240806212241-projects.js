'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const options = { tableName: 'Projects'};

    if(process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA
    }

    try {

      await queryInterface.bulkInsert(options, [
        {
          id: 501,
          projectManagerId: 1,
          coverImage: 'https://cdn.mos.cms.futurecdn.net/k9qjW7LvfxtGYwENHtzctZ.jpg',
          name: `Mr Isales's Backyard Pool`,
          clientName: 'Greg Isales',
          description: `Mr Isales's project entails the creation of a luxurious backyard pool, designed to transform an ordinary outdoor space into a private oasis. This project will feature a beautifully crafted in-ground pool, tailored to blend seamlessly with the surrounding landscape. The pool will include a variety of custom features, such as a built-in waterfall, underwater lighting, and a spacious pool deck made of premium materials. Additionally, we will incorporate energy-efficient equipment and a smart pool system for effortless maintenance and operation. This backyard transformation aims to provide a serene and stylish retreat for relaxation, entertainment, and family gatherings, enhancing the overall value and appeal of the property.`,
          budget: 50000,
          startDate: new Date("2024-09-27"),
          completionDate: new Date("2024-10-31")
        },
        {
          id: 502,
          projectManagerId: 2000,
          coverImage: 'https://files.holidaycottages.co.uk/FCImages/89130/89130-1EH.jpg',
          name: `Mrs Barnes's Cabin`,
          clientName: 'Sydney Barnes',
          description: `Mrs Barnes's project involves building a charming log cabin, designed to offer a cozy and rustic retreat amidst nature. This log cabin will feature hand-selected, high-quality logs that exude warmth and character, seamlessly blending with the natural surroundings. The design will include an inviting open-concept living space with a grand stone fireplace, large windows to maximize natural light and provide stunning views, and a spacious deck for outdoor enjoyment. Modern amenities will be thoughtfully integrated, including a fully-equipped kitchen, energy-efficient heating and cooling systems, and luxurious bathrooms. This log cabin aims to provide a perfect getaway that combines the tranquility of the wilderness with the comforts of contemporary living, making it an ideal haven for relaxation and family gatherings.`,
          budget: 400000,
          startDate: new Date("2024-11-27"),
          completionDate: new Date("2025-03-15")
        },
        {
          id: 503,
          projectManagerId: 2000,
          coverImage: 'https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840',
          name: `Oscar's Gym`,
          clientName: 'Oscar Robles',
          description: `Oscar's Gym focuses on creating a state-of-the-art gym facility designed to meet the fitness and wellness needs of the community. This modern gym will feature a spacious and open layout, equipped with the latest exercise machines and free weights to cater to all fitness levels. The facility will include dedicated areas for cardio workouts, strength training, group fitness classes, and functional training. Additionally, we will incorporate specialized zones such as a yoga studio, a spin class room, and a recovery area with saunas and massage rooms. The design emphasizes natural light and ventilation to create an inviting and energizing atmosphere, complemented by eco-friendly materials and energy-efficient systems. This gym aims to provide a comprehensive and motivating environment for individuals to achieve their fitness goals and promote a healthy lifestyle.`,
          budget: 80000,
          startDate: new Date("2025-02-13"),
          completionDate: new Date("2025-05-01")
        },
        {
          id: 504,
          projectManagerId: 1,
          coverImage: 'https://i0.wp.com/www.touristitaly.com/wp-content/uploads/2023/11/shutterstock_1054754711.jpg?resize=1000%2C667&ssl=1',
          name: `Mangia Ristorante`,
          clientName: 'Giovanni Linguini',
          description: `Chef Linguini's Italian restaurant will be designed to offer an authentic and immersive dining experience. This restaurant will feature a warm and inviting interior, with rustic wooden beams, terracotta floors, and rich, earthy tones that evoke the charm of Italy. The layout will include a spacious dining area, a cozy private dining room, and an open kitchen where guests can watch chefs prepare traditional Italian dishes. The design will also incorporate a stylish bar area for enjoying fine wines and cocktails. Large windows and ambient lighting will create a welcoming atmosphere, while outdoor seating on a picturesque patio will provide an al fresco dining option. This Italian restaurant aims to become a culinary destination, offering a taste of Italy through its ambiance, cuisine, and hospitality.`,
          budget: 1250000,
          startDate: new Date("2025-03-01"),
          completionDate: new Date("2025-10-15")
        }
      ]);
    } catch (error) {
      console.log('Error inserting projects', error);
    }
  },

  async down (queryInterface, Sequelize) {
    const options = { tableName: 'Projects' };
    const Op = Sequelize.Op;

    if(process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA
    }

    try {
      await queryInterface.bulkDelete(options, {
        id: { [Op.in]: [1, 2, 3, 4] }
      });
    } catch (error) {
      console.error('Error deleting projects:', error);
    }
  }
};
