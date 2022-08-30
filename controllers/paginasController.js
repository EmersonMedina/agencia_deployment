const { Viaje } = require("../models/Viaje.js");
const { Testimonial } = require("../models/Testimonial.js");

const paginaInicio = async (req, res) => {
  const promiseDB = [];

  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  //Consultar 3 viajes del model Viaje
  try {
    const resultado = await Promise.all(promiseDB);

    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1],
    });
  } catch (error) {
    console.log(viajes);
  }
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  //Consultar BD
  try {
    const viajes = await Viaje.findAll();

    res.render("viajes", {
      pagina: "Próximos Viajes",
      viajes,
    });
  } catch (error) {
    console.log("Ocurrió un error al intentar acceder a los viajes: ", error);
  }
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  //Consultar BD
  const { slug } = req.params;

  try {
    const viaje = await Viaje.findOne({ where: { slug: slug } });

    res.render("viaje", {
      pagina: "Información viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();

    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};
