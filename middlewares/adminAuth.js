//guarda de rotas
function adminAuth(req,res,next){
    if(req.session.user != undefined){
        next();
    }else{
        console.log("Usuario inválido!")
        res.redirect("/login/usuario");
    }
}


module.exports = adminAuth;