'use strict';
const { Model } = require('sequelize');
const ROLES = require('../config/roles');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definir asociaciones aquí si es necesario en el futuro
    }
  }
  User.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
      defaultValue: ROLES.USER,
    },
    avatar: {  // Nuevo campo para la ruta de la imagen
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
