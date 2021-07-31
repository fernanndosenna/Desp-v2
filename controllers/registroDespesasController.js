/* ESSE ARQUIVO É O CONTROLER QUE FAZ O GERENCIAMENTO DE ROTAS E FAZ LIGAÇÃO COM O MODEL*/
const knex = require("../database/connection")
const Despesas = require("../models/Despesas")

class registroDespesasController{

    //renderizando a view de registro 
    async indexRegistro(req,res){

        var listaDespesas = await Despesas.pegarTodasDespesas();

        if(listaDespesas == undefined){
            listaDespesas = []
        }
        res.render("registro_despesa", {listaDespesas});
    }




    //metodo de cadastro através do model Despesas
    async cadastrarDespesas(req,res){
        var { tipo, descricao, valor, data } = req.body;

        if(tipo == undefined || tipo == '' || tipo == ' '){
            console.log("campo não pode ser vazio!")
        }
            
        if(descricao == undefined || descricao == '' || descricao == ' '){
            console.log("campo não pode ser vazio!")
        }

        if(valor == undefined || valor == '' || valor == ' '){
            console.log("campo não pode ser vazio!")
        }

        
        if(data == undefined || data == '' || data == ' '){
            console.log("campo não pode ser vazio!")
        }

        await Despesas.cadastrar(tipo, descricao, valor,data);

        res.redirect("/")
        console.log("cadastro com sucesso!");
    }




    //editar despesa
    async editarDespesa(req,res){
        var { id } = req.params;

        if(isNaN(id)){
            res.redirect("/")
        }

        try {
                var despesa = await Despesas.encontrarIdDespesa(id);
                if(despesa != undefined){
                    res.render("../views/edits/despesas_edits", {despesa})
                }

        } catch (error) {
            console.log(error)
            res.redirect("/")
        }

    }


    //atualizar despesa
    async atualizarDespesa(req,res){
        var { id, tipo, descricao, valor, data} = req.body;

        console.log(tipo)
        var despesasEditadas = {};

        despesasEditadas.tipo = tipo; // recebe novo dado editado
        despesasEditadas.descricao = descricao;
        despesasEditadas.valor = valor;
        despesasEditadas.data = data;


        try {
            
            await knex.update(despesasEditadas).where({id: id}).table("despesas");
             res.redirect("/")
        } catch (error) {
            console.log(error)
        }
    }


    //deletar despesa
    async deletarDespesa(req,res){
        var { id } = req.params

        try {
            var resultado = await Despesas.deletar(id);

            if(resultado){
                console.log("delete com sucesso!")
                res.redirect("/")
            }
            
        } catch (error) {
            console.log(error)
        }
    
    }

}

//serve para usar o arquivos em outros arquivos
module.exports = new registroDespesasController();