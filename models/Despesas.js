/* Esse arquivo  faz consultas direto com o banco de dados é o chamado model */
const knex = require("../database/connection"); //ativando a conexao com o banco de dados

class Despesas{

    //cadstrando despesas
    async cadastrar(tipo,descricao,valor,data, conversaoIDusuario){

        const dataConversao = data.toString();
        try {
            const resultado = await 
            knex.insert({
                tipo: tipo, descricao: descricao, valor: valor, data: dataConversao,
                 usuario_id: conversaoIDusuario 
            }).table("despesas")

            return true;

        } catch (error) {
            console.log(error);
        }
    }

    // pegando todas as despesas do banco de dados
    async pegarTodasDespesasDoUsuario(usuario){
        try {
            var dados = await knex
            .select(["id","tipo","descricao","valor","data"])
            .table("despesas").where({usuario_id: usuario.id})
            .orderBy("id", "desc")

            console.log(dados)
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


    async atualizarValoresDaBalanca(usuarioID){
        //balanca

        var listaDeTransacoes = await this.pegarTodasDespesasDoUsuario(usuarioID);
            if(listaDeTransacoes == undefined)
            listaDeTransacoes = []
          
        var transacoesValores = listaDeTransacoes
        .map(somenteValores => somenteValores.valor);
       

        var total = transacoesValores
        .reduce((accumulator,transacoes) => accumulator + transacoes, 0)
        .toFixed(2)


        var renda = transacoesValores
        .filter(valor => valor > 0)
        .reduce((accumulator, valor) => accumulator + valor,0)
        .toFixed(2)

        var despesa = transacoesValores
        .filter(value => value < 0)
        .reduce((accumulator, valor) => accumulator + valor,0)
        
     

        
        return ({total,renda,despesa})
    }


}

module.exports = new Despesas();