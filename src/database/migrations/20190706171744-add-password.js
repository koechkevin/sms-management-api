
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Contacts', 'password', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '$2b$10$Quei2Gk1FUGXXz.7lNke2.leVBhPIP/OSVy9tdRGVGirj9Bc/mkQy',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Contacts', 'password'),
};
