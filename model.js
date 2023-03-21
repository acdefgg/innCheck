const sequelize = require('././db.js');
const {DataTypes} = require("sequelize");


const Inn =sequelize.define(
    'inn',
    {
        id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING},
        inn_number: {type: DataTypes.STRING},
    },
);


module.exports = {Inn};