import { Sequelize } from "sequelize";

const sequelize = new Sequelize('taskManagement', 'root', 'Subhendu@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true }); // Force table creation (deletes and recreates tables)
    console.log("User table created successfully!");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
