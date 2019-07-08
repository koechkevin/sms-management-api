
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sender: {
      type: DataTypes.INTEGER,
    },
    recepient: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {});
  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'recepient',
      onDelete: 'CASCADE',
      as: 'to',
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'sender',
      onDelete: 'CASCADE',
      as: 'from',
    });
  };
  return Message;
};
