const express = require("express");
const app = express();
const router = require("./routes/routes"); //importação de rotas
const bodyParser = require("body-parser");

//configuracoes
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//modelo de template 
app.set("view engine", "ejs");

//arquivos estaticos
app.use(express.static("public"));


//roteamento raiz
app.use("/", router);




//conexao
const port = 8080;
app.listen(port, () => {
    console.log(`Conexão rodando na porta ${port}`);
})