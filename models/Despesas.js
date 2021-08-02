/* Esse arquivo  faz consultas direto com o banco de dados é o chamado model */
const knex = require("../database/connection"); //ativando a conexao com o banco de dados

class Despesas{

    //cadstrando despesas
    async cadastrar(tipo,descricao,valor,data){

        const dataConversao = data.toString();
        try {
            const resultado = await knex.insert({tipo: tipo, descricao: descricao, valor: valor, data: dataConversao }).table("despesas")

            return true;

        } catch (error) {
            console.log(error);
        }
    }

    // pegando todas as despesas do banco de dados
    async pegarTodasDespesas(){
        try {
            var dados = await knex
            .select(["id","tipo","descricao","valor","data"])
            .table("despesas")
            .orderBy("id", "desc")

            if(dados.length > 0)
                return dados
            else
                return undefined
            
        } catch (error) {
            
        }
    }
    
    //encontrando uma especifica despesa pelo id
    async encontrarIdDespesa(id){
        try {
            var dados = await knex
            .select(["id","tipo","descricao","valor","data"])
            .where({id: id})
            .table("despesas")

            console.log(dados)
            if(dados.length > 0)
                return dados[0];
            else
                return undefined

        } catch (error) {
            console.log(error)
        }
    }

    //deletando uma despesa
    async deletar(id){
        var despesa = await this.encontrarIdDespesa(id);

        if(despesa != undefined){

            try {
                await knex.delete().where({id: id}).table("despesas");

                return true;

            } catch (error) {
                console.log(error)
                return false
            }
        }
    }



}

module.exports = new Despesas();