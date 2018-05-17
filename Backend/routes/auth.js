const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();


const user=require('../models/user');

router.post("/api/auth/signup",function(req,res){
    user.create(req.body).then((user) => {
        const token=jwt.sign({userId:user.id},'kickass');
        res.status(200).json({token});
    }).catch((err)=>{
        res.status(400).json(err);
    })
 })
 router.post('/api/auth/signin',function(req,res){
    user.findOne({email:req.body.email}).then((user)=>{
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(isMatch){
                    const token=jwt.sign({userId:user.id},'kickass');
                    res.status(200).json({token})
                }
                else{
                    res.status(200).json({message:'Invaild Password/Username'})
                }
            })
    }).catch((err)=>{
        res.status(400).json({message:'Invalid Password/Username'});
    })
})


module.exports=router