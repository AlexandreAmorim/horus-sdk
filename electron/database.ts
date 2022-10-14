import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('leiseca', 'leiseca', 'leiseca', {
    host: 'localhost',
    dialect: 'mysql'
});
