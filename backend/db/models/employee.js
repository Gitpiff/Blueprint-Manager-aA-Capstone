'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'project'
      })
    }
  }
  Employee.init({
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
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Hire Date cannot be on a future date" },
        isAfter(value) {
          if(new Date (value) <= this.commencementDate) {
            throw new Error("Completion Date cannot be on or before Start Date")
          }
        },
      }
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number is required'
        },
        is: {
          args: /^\+?[1-9]\d{1,14}$/,
          msg: 'Must be a valid phone number'
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
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};