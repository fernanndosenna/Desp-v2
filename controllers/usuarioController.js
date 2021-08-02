const usuario = require("../models/Usuario")
const bcrypt = require("bcrypt")

class usuarioController{

    //mostrando view de cadatro de usuário
    async indexCadastro(req,res){
        var msgErr = req.flash("msgErr"); //vai atrás da variavel que contém a mensagem
        var msgSuccess = req.flash("msgSuccess"); //vai atrás da variavel que contém a mensagem

        msgErr = (msgErr == undefined  || msgErr.length == 0 ) ? undefined : msgErr
        msgSuccess = (msgSuccess == undefined  || msgSuccess.length == 0 ) ? undefined : msgSuccess

        res.render("../views/user/cadastro_usuario", {msgErr, msgSuccess});
    }

    //mostrando view de login
    async indexLogin(req,res){
        var msgErr = req.flash("msgErr"); //vai atrás da variavel que contém a mensagem
        msgErr = (msgErr == undefined  || msgErr.length == 0 ) ? undefined : msgErr

        res.render("../views/user/login_usuario", {msgErr});
    }


    //criando usuário
    async criarUsuario(req,res){
        var { nome, email, senha, nomeUsuario} = req.body;
        var msgErr
        var msgSuccess


        var emailExiste = await usuario.encontreEmail(email);

        if(emailExiste){
            msgErr = "Email já existe!"
            
        }

        if(nome == undefined || nome == '' || nome == ' '){
            msgErr = "Nome não pode ser vazio!"
        }
    
        if(email == undefined || email == '' || email == ' '){
            msgErr = "email não pode ser vazio!"
        }

        if(senha == undefined || senha == '' || senha == ' '){
            msgErr = "Senha não pode ser vazia!"
        }   
        
        if(nomeUsuario == undefined || nomeUsuario == '' || nomeUsuario == ' '){
            msgErr = "Nome de usuário não pode ser vazio!"

        }

        
        if(msgErr != undefined){
            req.flash("msgErr", msgErr)
            res.redirect("/cadastro/usuario")
        }else{
            try {
                var cadastrouComSuccesso = await usuario.novoUsuario(nome,email,senha,nomeUsuario);
                if(cadastrouComSuccesso){
                    msgSuccess = "Usuário cadastrado com sucesso!"
                    req.flash("msgSuccess", msgSuccess)
                    res.redirect("/cadastro/usuario")
                }
            
            } catch (error) {
                console.log(error)
            }
        }        
    }
    
    //login de usuario
    /*
    async login(req,res){
        var { email , senha } = req.body;
        var msgErr

        var usuarioExiste = await usuario.encontrePorEmail(email);
        if(usuarioExiste != undefined){ //se usuario existir

            var senhaBater = await bcrypt.compare(senha, usuarioExiste.senha)
            if(senhaBater){
                res.redirect("/");
            }else{

                if(msgErr != undefined){
                    msgErr = "Senha incorreta!"
                    req.flash("msgErr", msgErr)
                    res.redirect("/login/usuario")
                }
            }

        }
    }
    */

    //autenticar
    async autenticar(req,res){
        const {email, senha} = req.body;
        var msgErr

        if(email == undefined || email == '' || email == ' '){
            msgErr = "Email não pode ser em branco!"
            
        }
        if(senha == undefined || senha == '' || senha == ' '){
            msgErr = "Senha não pode ser em branco!"
        }

         var user = await usuario.encontreUsuario(email);

         if(msgErr != undefined){
            req.flash("msgErr", msgErr)
            res.redirect("/login/usuario")
        }
         if(user != undefined){
             
            var correta = bcrypt.compare(senha, user.senha)
            
            if(correta){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/")
            }else{
                res.redirect("/login/usuario");
            }
         
        }else{
            msgErr = "Usuário nao existe!"

        }     

        if(msgErr != undefined){
            req.flash("msgErr", msgErr)
            res.redirect("/login/usuario")
        }
    }

    //deslogar usuario
    async deslogar(req,res){
        req.session.user = undefined;
        res.redirect("/login/usuario");
    }
  
}

module.exports = new usuarioController();