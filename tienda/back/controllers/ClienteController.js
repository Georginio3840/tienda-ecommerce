'use strict'

var Cliente=require('../models/cliente');
var bcrypt= require ('bcrypt-nodejs');
var jwt=require('../helpers/jwt');



const registro_cliente = async function(req,res){
    //
    var data= req.body;
    var clientes_arr=[];
    clientes_arr=await Cliente.find({email:data.email});
    if(clientes_arr.length==0){
     
    if(data.password){
        bcrypt.hash(data.password,null,null,async function(err,hash){
            if(hash){
                data.password=hash;
                   //Registro
                var reg=await Cliente.create(data);
                res.status(200).send({data:reg});
            }else{
                res.status(200).send({message:'ERROR',data: undefined});  
            }
        })
    }else{
        res.status(200).send({message:'no hay contrasenia',data: undefined});
    }


    

    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data: undefined});
    }
}
const login_cliente= async function(req, res){
    var data =req.body;
    var cliente_arr=[];
    cliente_arr=await Cliente.find({email:data.email});
    if(cliente_arr.length== 0){
        res.status(200).send({message:'No se encontro el correo',data: undefined});
    }else{
        //Login
        let user=cliente_arr[0];

        bcrypt.compare(data.password,user.password,async function(error,check){
        if(check){
            res.status(200).send({
                data:user,
                token: jwt.createToken(user)}); 
        }else{
            res.status(200).send({message:'la contra no coincide',data: undefined});
        }

        });
        
    }
   


}
const listar_clientes_filtro_admin=async function(req,res){
    let reg = await Cliente.find();
    res.status(200).send({data:reg});


}
    
module.exports={
registro_cliente,
login_cliente,
listar_clientes_filtro_admin



}