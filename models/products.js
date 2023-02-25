const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Product = sequelize.define('Product', {

    idproducto: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    codigo_barras: {
        type: DataTypes.STRING,
    },
    precio_venta: {
        type: DataTypes.DECIMAL,
    },
    precio_compra: {
        type: DataTypes.DECIMAL,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tamanio: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
    },
    id_departamento: {
        type: DataTypes.INTEGER,
    }
})

module.exports = Product;