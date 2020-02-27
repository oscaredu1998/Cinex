const Sequelize = require("sequelize");

const db = require("../config/db");
const persona = require("./persona")
const sala_pelicula = require("./sala_pelicula")

module.exports = db.sequelize.define('compra', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_boletos: {
        type: Sequelize.INTEGER
    },
    idpersona: {
        type: Sequelize.INTEGER,
        references: {
            model: persona,
            key: 'id'
        }
    },
    idsala_peliculas: {
        type: Sequelize.INTEGER,
        references: {
            model: sala_pelicula,
            key: 'id'
        }
    }
})