
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '$2b$10$Quei2Gk1FUGXXz.7lNke2.leVBhPIP/OSVy9tdRGVGirj9Bc/mkQy',
    },
  }, {});
  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'recepient',
      as: 'to',
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
