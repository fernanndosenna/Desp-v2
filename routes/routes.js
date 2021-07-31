const express = require("express");
const router = express.Router();
const registroDespesasController = require("../controllers/registroDespesasController");


//rotas
router.get("/", registroDespesasController.indexRegistro);
router.post("/despesas/cadastrar", registroDespesasController.cadastrarDespesas);
router.get("/despesas/edit/:id", registroDespesasController.editarDespesa) //renderizando view de edit de despesa
router.post("/despesas/atualizar", registroDespesasController.atualizarDespesa);
router.get("/despesas/deletar/:id", registroDespesasController.deletarDespesa);

module.exports = router;