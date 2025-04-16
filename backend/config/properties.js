//tenemos dos propiedades, el puerto y la base de datos
module.exports = {
  PORT: process.env.PORT || 3000,
  //DB: nos creara una nueva base de datos llamada angular
  DB: ('mongodb://localhost:27017/angular'),
    options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
}
