const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    const Korisnik = sequelize.define("korisnik", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prezime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }},
        { tableName: 'Korisnik'
    });

   // Korisnik.hasMany(Upit, { foreignKey: 'korisnik_id' });
    return Korisnik;
};

