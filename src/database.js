var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const chalk = require("chalk");

mongoose.connect("LINK DO SEU MONGOOSE AQUI",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  error => {
    if (error) {
      console.log(`Erro: ${error}`);
      process.exit(1);
      return 1;
    }
    console.log(`[${chalk.green("DATABASE")}] Conectado ao banco de dados`);
    return 0;
  }
)

const botSchema = new mongoose.Schema({
  _id: String,
  votos: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('botDB', botSchema);