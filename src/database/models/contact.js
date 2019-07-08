
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {});
  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'recepient',
      as: 'to',
    });
    Contact.belongsTo(models.User, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
      as: 'user',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'sender',
      as: 'from',
    });
  };
  Contact.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return Contact;
};
