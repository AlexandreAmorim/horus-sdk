import Sequelize from 'sequelize';
import { sequelize } from '../database';

export const Operation = sequelize.define('operations', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    cod: {
        type: Sequelize.STRING,
    },
    document: {
        type: Sequelize.STRING,
    },
    team: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_operation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    county: {
        type: Sequelize.STRING,
        allowNull: false
    },
    district: {
        type: Sequelize.STRING,
        allowNull: false
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complement: {
        type: Sequelize.STRING,
        allowNull: false
    },
    open: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    streaming: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})