const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
//Cargar archivos estaticos
app.use(express.static(__dirname + "/public"));
//Mongoose
mongoose
  .connect(process.env.STRING_CONEXION)
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });
//Modelo de datos
const Pers = require("./models/usuarios");
//Rutas
//Get
app.get("/", async function (req, res) {
  await Pers.find();
  res.sendFile(__dirname + "/index.html");
});

//Create
app.post("/usuario", async function (req, res) {
  const datos_ajax = req.body;
  const p = new Pers(datos_ajax);
  await p.save();
  res.status(200).send(p);
});

//Put
app.put("/usuario/:id", async function (req, res) {
  const parametro = req.params.id;
  await Pers.updateOne({ _id: parametro }, req.body);
  res.status(200).send("Modificado correctamente");
});

//Delete
app.delete("/usuario/:id", async function (req, res) {
  const parametro = req.params.id;
  const p = await Pers.findById(parametro);
  await p.remove();
  res.status(200).send("Eliminado de la base de datos");
});

//Listen
app.listen(3000, function () {
  console.log("Servidor iniciado");
});
