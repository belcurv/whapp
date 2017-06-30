/* jshint esversion:6, node: true */

const dbuser = process.env.DB_UNAME,
      dbpwd  = process.env.DB_PWD;

module.exports = {
    
    getDbConnectionString: function () {
        return `mongodb://${dbuser}:${dbpwd}@ds127260.mlab.com:27260/whobot`;
    }
    
};
