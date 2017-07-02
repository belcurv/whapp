/* jshint esversion:6, node: true */

const dotenv = require('dotenv').config(),
      dbuser = process.env.DB_UNAME,
      dbpwd  = process.env.DB_PWD;

module.exports = {
    
    getDbConnectionString: function () {
        // return `mongodb://${dbuser}:${dbpwd}@ds127260.mlab.com:27260/whobot`;
        return "mongodb://localhost:27017/whobot";
    }
    
};
