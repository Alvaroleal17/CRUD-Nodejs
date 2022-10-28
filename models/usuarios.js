var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario = new Schema({
    nombre: String,
    fecha: String,
    importe: Number,
    tipo: String,
    detalle: String
},
{ versionKey: false}
);
module.exports = mongoose.model("Usuarios", usuario);