const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    MYSQL_HOST: "localhost",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "Ad3m0l@000",
    MYSQL_DATABASE: "churchdb",
  },
  production: {
    MYSQL_HOST: "production_db_host",
    MYSQL_USER: "production_db_user",
    MYSQL_PASSWORD: "production_db_password",
    MYSQL_DATABASE: "mydatabase_prod",
  },
};


module.exports = config[env];
