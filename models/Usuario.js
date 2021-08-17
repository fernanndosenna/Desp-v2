const bcrypt = require("bcrypt");
const knex = require("../database/connection");

class Usuario{
  
    //cadastro de usuario
    async novoUsuario(nome, email, senha, nomeUsuario){
        try{

            //adicionando um "sal" na senha para evitar que seja salva pura
           
               // exemplo: se senha é digitado "123" sem o hash ela salva dessa mesma forma
               // com o hash é adicionado um sal sobre ela, e é salva mais ou menos dessa forma
               // "fsjkdfjksdlfksdpfsdflçsdfldçs"
          
           var hash = await bcrypt.hash(senha, 10);

           var retorno =  await knex.
           insert({nome, email, senha: hash, nomeUsuario})
           .table("usuarios")

           console.log(retorno) 
           return true
        }catch (error) {
            console.log(error)
        }
    }

    //encontrar por em um email caso ele já tenha sido cadastro
    async encontreEmail(email){
        try {
            var resultado = await knex
            .select("*")
            .from("usuarios")
            .where({email: email});
        
            if(resultado.length > 0) //email existe
                return true;
            else
                return false;

        } catch (error) {
            console.log(error)
            return false;
        }
    }

    //encontrar por email caso queria fazer um sistema de lógica por recuperação de senha
    async encontrePorEmail(email){
        try {

            var resultado = await knex
            .select("id","email","senha","nome")
            .where({email: email})
            .table("usuarios")
            if(resultado.length > 0){
                return resultado[0]
            }else{
                return undefined;
            }

        } catch (error) {
            console.log(error)
        }
    }

    async encontreUsuarioPorID(usuarioDaSessaoID){
        var resultado = await knex.select("id","nome").where({id : usuarioDaSessaoID}).table("usuarios")
        if( resultado.length > 0){
            return resultado[0]
        }else{
            return undefined
        }
    }
    async encontreUsuario(email){
        var resultado = await knex
        .select("id","email","senha")
        .where({email: email})
        .table("usuarios")
        
        if(resultado.length > 0){
            return resultado[0]
        }else{
            return undefined
        }
    }
}

module.exports = new Usuario();
