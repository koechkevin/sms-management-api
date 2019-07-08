
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Contacts', 'password'),
    queryInterface.addColumn(
      'Contacts', 'createdBy', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'phone',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
    ),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Contacts', 'password', {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '$2b$10$Quei2Gk1FUGXXz.7lNke2.leVBhPIP/OSVy9tdRGVGirj9Bc/mkQy',
      },
    ),
    queryInterface.removeColumn('Contacts', 'createdBy'),
  ]),
};
