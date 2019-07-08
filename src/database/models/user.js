
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Contact, {
      foreignKey: 'createdBy',
      as: 'user',
    });
  };
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return User;
};
