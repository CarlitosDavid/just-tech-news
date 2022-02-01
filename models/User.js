const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;

    // {
    
        //     // TABLE COLUMN DEFINTIONS GO HERE
        // },
        // {
            //     // TABLE CONFIGURATION OPTION GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
            
            //     // pass in our imported sequelize connection (the direct connection to our database)
            //     sequelize, 
            //     // dont automatically create createdAt/updatedAt timestamp fields
            //     timestamps: false, 
            //     // don't pluralize name of database table
            //     freezeTableName: true,
            //     // use underscores instead of camel-casing(i.e. `comment_text` and not `commentText`)
            //     underscored: true,
            //     // make it so our model name stays lowercase in the database
            //     modelName: 'user'
            // }
          
            
            
            
            // Why is async mode recommended over sync mode?
            
            // If you are using bcrypt on a simple script, using the sync mode is perfectly fine. However, 
            // if you are using bcrypt on a server, the async mode is recommended. This is because the hashing done by bcrypt is CPU intensive,
            //  so the sync version will block the event loop and prevent your application from servicing any other inbound requests or events. 
            // The async version uses a thread pool which does not block the main event loop.
            // set up beforeCreate lifecycle "hook" functionality
            // uset eh beforeCreate() hook to execute bcrypt hash function on the plaintext password.
            // pass the userData object that contains the plaintext passwortd in the password property.
            // beforeCreate(userData) {
            //     return bcrypt.hash(userData.password, 10).then(newUserData => {
            //         return newUserData
            //     });
            // }
            // replace it with async keyword contains a asynchronous funciton. 