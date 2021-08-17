const express = require("express");
const router = express.Router();
const registroDespesasController = require("../controllers/registroDespesasController");
const usuarioController = require("../controllers/usuarioController")
const adminAuth = require("../middlewares/adminAuth")

//rotas de gerenciamento de despesas
router.get("/", adminAuth,  registroDespesasController.indexRegistro);
router.post("/despesas/cadastrar", adminAuth,  registroDespesasController.cadastrarDespesas);
router.get("/despesas/edit/:id", adminAuth, registroDespesasController.editarDespesa) //renderizando view de edit de despesa
router.post("/despesas/atualizar", adminAuth, registroDespesasController.atualizarDespesa);
router.get("/despesas/deletar/:id", adminAuth, registroDespesasController.deletarDespesa);

//rotas de gerenciamento de usuario
router.get("/cadastro/usuario", usuarioController.indexCadastro);
router.post("/cadastro/salvar", usuarioController.criarUsuario);
router.get("/login/usuario", usuarioController.indexLogin);
//router.post("/login", usuarioController.login);
router.post("/login/autenticar", usuarioController.autenticar);
router.get("/deslogar/usuario", usuarioController.deslogar);

module.exports = router;