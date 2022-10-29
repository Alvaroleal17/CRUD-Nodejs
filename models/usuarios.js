const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuario = new Schema({
    nombre: String,
    fecha: String,
    importe: Number,
    tipo: String,
    detalle: String
},
{ versionKey: false}
);
module.exports = mongoose.model("Usuarios", usuario);