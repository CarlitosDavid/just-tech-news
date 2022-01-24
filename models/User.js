const { Model, DataTypes } =  require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

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
            autoIncrement: this
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