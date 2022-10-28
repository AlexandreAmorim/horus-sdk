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
    local: {
        type: Sequelize.STRING,
        allowNull: false
    }
})