import Sequelize from 'sequelize';
import { sequelize } from '../database';

export const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    document: {
        type: Sequelize.STRING,
        allowNull: false
    }
})