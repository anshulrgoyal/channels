const express =require('express');
const router =express.Router();

const user=require('../models/user');
const channel=require('../models/channel');

router.get('/api/user/info',(req,res)=>{
    user.findById(req.user._id).exec((err,foundUser)=>{
      res.json({foundUser});
    })
})

router.get('/api/user/channels',(req,res)=>{
    user.findById(req.user._id)
    .populate('subscribedChannel','description name')
    .exec(function(foundChannels){
        res.json(foundChannels);
    })
})

router.post('/api/user/subscribe',(req,res)=>{
    channel.findById(req.body.chaqnnelId).then((foundChannel)=>{
        foundChannel.users.push(req.user);
        foundChannel.save();
        user.findById(req.user._id).then((foundUser)=>{
            foundUser.subscribedChannel.push(req.body.chaqnnelId);
            foundUser.save((err)=>{
                err?res.json({err}):res.json({message:"sucess"})
            })
        })
    })
})


module.exports=router;

