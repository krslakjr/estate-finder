const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const Upit = sequelize.define("upit", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nekretnina_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        korisnik_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tekst_upita: {
            type: Sequelize.TEXT,
            allowNull: false
        }},
    {
        tableName: 'Upit'
    });
    
   // Upit.belongsTo(Nekretnina, { foreignKey: 'nekretnina_id' });
    //Upit.belongsTo(Korisnik, { foreignKey: 'korisnik_id' });
    return Upit;
};


