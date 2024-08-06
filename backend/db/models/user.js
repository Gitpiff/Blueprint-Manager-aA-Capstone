'use strict';
const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "First Name must have between 2 and 30 characters"
        },
        notEmpty: { 
          msg: "First Name is required" 
        },
        notNull: {
          msg: "First Name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "Last Name must have between 2 and 30 characters"
        },
        notEmpty: { 
          msg: "Last Name is required" 
        },
        notNull: {
          msg: "Last Name is required"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 15],
          msg: "Username must have between 2 and 15 characters"
        },
        notEmpty: { 
          msg: "Username is required" 
        },
        notNull: {
          msg: "Username Name is required"
        },
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "Company Name must have between 2 and 30 characters"
        },
        notEmpty: { 
          msg: "Company Name is required" 
        },
        notNull: {
          msg: "Company Name is required"
        }
      }
    },
    industrySector: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "Industry Sector must have between 2 and 30 characters"
        },
        notEmpty: { 
          msg: "Industry Sector is required" 
        },
        notNull: {
          msg: "Industry Sector is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 30],
          msg: "Email must have between 4 and 30 characters"
        },
        notEmpty: { 
          msg: "Email is required" 
        },
        notNull: {
          msg: "Email is required"
        },
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 80],
          msg: "Password must have between 7 and 80 characters"
        },
        notEmpty: { 
          msg: "Password is required" 
        },
      }
    }    
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt' ]
      }
    }
  });
  return User;
};