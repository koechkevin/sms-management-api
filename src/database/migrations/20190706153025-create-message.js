
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.STRING,
    },
    sender: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Contacts',
        key: 'number',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    recepient: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Contacts',
        key: 'number',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    status: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Messages'),
};
