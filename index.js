var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//Cargar archivos estaticos
app.use(express.static(__dirname + "/Public"));
//Mongoose
mongoose
  .connect(
    "mongodb+srv://alvaro_0817:A65708589l@cluster0.cbh2tqk.mongodb.net/BD_ingresos_gastos?retryWrites=true&w=majority"
  )
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });
//Modelo de datos
var Pers = require("./models/usuarios");
const personas = require("./models/usuarios");
//Rutas -Obtener
app.get("/inicio", async function (req, res) {
  var documentos = await Pers.find();
  res.sendFile(__dirname + "/index.html");
});
// Create
app.post("/usuario", async function (req, res) {
  var datos_ajax = req.body;
  var p = new Pers(datos_ajax);
  await p.save();
  res.send(p);
});
//PUT
app.put("/usuario/:id", async function (req, res) {
  var parametro = req.params.id;
  console.log("ID modificado: " + parametro);
  var p = await Pers.updateOne({ _id: parametro }, req.body);
  res.send("Modificado correctamente");
});
//Delete
app.delete("/usuario/:id", async function (req, res) {
  var parametro = req.params.id;
  console.log("Documento eliminado: " + parametro);

  var p = await Pers.findById(parametro);
  await p.remove();
  res.send("Eliminado de la base de datos");
});


//Listen
app.listen(4000, function () {
  console.log("Servidor iniciado");
});
