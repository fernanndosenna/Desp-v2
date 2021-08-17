/* ESSE ARQUIVO É O CONTROLER QUE FAZ O GERENCIAMENTO DE ROTAS E FAZ LIGAÇÃO COM O MODEL*/
const knex = require("../database/connection")
const Despesas = require("../models/Despesas")
const Usuario = require("../models/Usuario")

class registroDespesasController{

    //renderizando a view de registro 
    async indexRegistro(req,res){
        var msgErr = req.flash("msgErr"); //vai atrás da variavel que contém a mensagem
        var msgSuccess = req.flash("msgSuccess"); //vai atrás da variavel que contém a mensagem
     
        var usuarioDaSessaoID = parseInt(req.session.user.id)

        var usuario = await Usuario.encontreUsuarioPorID(usuarioDaSessaoID);
     
        msgErr = (msgErr == undefined  || msgErr.length == 0 ) ? undefined : msgErr
        msgSuccess = (msgSuccess == undefined  || msgSuccess.length == 0 ) ? undefined : msgSuccess


        var listaDespesas = await Despesas.pegarTodasDespesasDoUsuario(usuario);

        var balanca = await Despesas.atualizarValoresDaBalanca(usuario)

        if(listaDespesas == undefined){
            listaDespesas = []
        }
        res.render("registro_despesa", {listaDespesas, msgErr,msgSuccess, balanca,  usuario});
    }




    //metodo de cadastro através do model Despesas
    async cadastrarDespesas(req,res){
        var { tipo, descricao, valor, data, usuario_id } = req.body;
        var conversaoIDusuario = parseInt(usuario_id); // pegando o usuario dono das despesas
        var msgErr
        var msgSuccess

        if(tipo == undefined || tipo == '' || tipo == ' '){
            msgErr = "Tipo não pode ser vazio"

        }
            
        if(descricao == undefined || descricao == '' || descricao == ' '){
            msgErr = "Descrição não pode ser vazio"
        }

        if(valor == undefined || valor == '' || valor == ' '){
            msgErr = "Valor não pode ser vazio"
        }

        
        if(data == undefined || data == '' || data == ' '){
            msgErr = "Data não pode ser vazio"
        
        }
        if(msgErr !=  undefined){
            req.flash("msgErr", msgErr)
            res.redirect("/")
        }

        await Despesas.cadastrar(tipo, descricao, valor,data, conversaoIDusuario);

        res.redirect("/")
        console.log("cadastro com sucesso!");
    }




    //mostrando view de edit com a despesa clicada
    async editarDespesa(req,res){
        var { id } = req.params;
        var msgErr = req.flash("msgErr"); //vai atrás da variavel que contém a mensagem

        msgErr = (msgErr == undefined  || msgErr.length == 0 ) ? undefined : msgErr
        if(isNaN(id)){
            res.redirect("/")
        }

        try {
                var despesa = await Despesas.encontrarIdDespesa(id);
                if(despesa != undefined){
                    res.render("../views/edits/despesas_edits", {despesa, msgErr})
                }

        } catch (error) {
            console.log(error)
            res.redirect("/")
        }

    }


    //atualizar despesa
    async atualizarDespesa(req,res){
        var { id, tipo, descricao, valor, data} = req.body;
        var msgErr
        var msgSuccess

        if(tipo == undefined || tipo == '' || tipo == ' '){
            msgErr = "Tipo não pode ser vazio"

        }

        if(descricao == undefined || descricao == '' || descricao == ' '){
            msgErr = "Tipo não pode ser vazio"

        }

        if(valor == undefined || valor == '' || valor == ' '){
            msgErr = "Tipo não pode ser vazio"

        }
        if(data == undefined || data == '' || data == ' '){
            msgErr = "Tipo não pode ser vazio"

        }
        if(msgErr != undefined){
            req.flash("msgErr", msgErr)
            res.redirect(`/despesas/edit/${id}`)
            return
        }
        var despesasEditadas = {};

        despesasEditadas.tipo = tipo; // recebe novo dado editado
        despesasEditadas.descricao = descricao;
        despesasEditadas.valor = valor;
        despesasEditadas.data = data;


        try {
            
            await knex.update(despesasEditadas).where({id: id}).table("despesas");
             msgSuccess = "Editado com sucesso!"
             req.flash("msgSuccess", msgSuccess)
             res.redirect("/")
        } catch (error) {
            console.log(error)
        }
    }


    //deletar despesa
    async deletarDespesa(req,res){
        var { id } = req.params
        var msgSuccess
        try {
            var resultado = await Despesas.deletar(id);

            if(resultado){
                msgSuccess = "Delete com sucesso!"
                req.flash("msgSuccess", msgSuccess)
                res.redirect("/")
            }
            
        } catch (error) {
            console.log(error)
        }
    
    }



}

//serve para usar o arquivos em outros arquivos
module.exports = new registroDespesasController();