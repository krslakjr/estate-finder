const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    const Nekretnina = sequelize.define("nekretnina", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tip_nekretnine: {
            type: Sequelize.STRING,
            allowNull: false
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kvadratura: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cijena: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tip_grijanja: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lokacija: {
            type: Sequelize.STRING,
            allowNull: false
        },
        godina_izgradnje: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        datum_objave: {
            type: Sequelize.STRING,
            allowNull: false
        },
        opis: {
            type: Sequelize.TEXT,
            allowNull: true
        }},
        {
            tableName: 'Nekretnina'
        }
    );

    //Nekretnina.hasMany(Upit, { foreignKey: 'nekretnina_id' });

    return Nekretnina;
};
