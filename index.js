const express = require("express");
const { router } = require("./routes/index.js");
const { db } = require("./config/db.js");
const app = express();

require("dotenv").config({ path: "variables.env" });

//Conectar la base de datos
db.authenticate()
  .then(() => {
    console.log("base de datos conectada");
  })
  .catch((error) => {
    console.log(error);
  });

//Habilitar PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use((req, res, next) => {
  const year = new Date();

  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

//Agregar body parser para leer datos del formulario
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta pública
app.use(express.static("public"));

//Agregar router
app.use("/", router);

//Definir puerto y host para la app
const host = process.env.HOST || "0.0.0.0";

const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  console.log(`Servidor escuchando y funcionando en el puerto: ${port}`);
});
