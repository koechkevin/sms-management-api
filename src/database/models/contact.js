
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Contact.associate = (models) => {
    // associations can be defined here
  };
  return Contact;
};
