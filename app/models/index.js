const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require('sequelize'); // Import both Sequelize and DataTypes

// Create a Sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false, // Not recommended but necessary for Sequelize 5.x

  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    idle: dbConfig.idle
  },
  logging: false // Disable logging for cleaner console output (you can enable for debugging purposes)
});

const db = {};

// Asignamos la instancia de Sequelize y la conexión sequelize
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Defining the models
db.tutorials = require("./tutorial.model.js")(sequelize, DataTypes);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit process if connection fails (optional, to handle failure)
  });

// Optional: Sync models with the database (used cautiously in production)
sequelize.sync({ force: false })  // 'force: false' ensures the data isn't dropped on every startup
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });

// Export the db object for use in other parts of the app
module.exports = db;
