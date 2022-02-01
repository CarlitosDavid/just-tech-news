const { Model, DataTypes } =  require('sequelize');
const sequelize = require('../config/connection');
// adding bcrypt file to this file to perform the hashing function
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table colums and configuration
User.init(
    {
        // define an id colum
        id: {
            // use the special Sequelize Dataypes object provide what type 
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instuct that this is the primary key
            primaryKey: true, 
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column 
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            // there cannot be any duplicate email values in this table
            unique: true, 
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            // uset eh beforeCreate() hook to execute bcrypt hash function on the plaintext password.
            // pass the userData object that contains the plaintext passwortd in the password property.
            // beforeCreate(userData) {
            //     return bcrypt.hash(userData.password, 10).then(newUserData => {
            //         return newUserData
            //     });
            // }
            // replace it with async keyword contains a asynchronous funciton. 
            async beforeCreate(userData) {
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
);

module.exports = User;


// Why is async mode recommended over sync mode?

// If you are using bcrypt on a simple script, using the sync mode is perfectly fine. However, 
// if you are using bcrypt on a server, the async mode is recommended. This is because the hashing done by bcrypt is CPU intensive,
//  so the sync version will block the event loop and prevent your application from servicing any other inbound requests or events. 
// The async version uses a thread pool which does not block the main event loop.