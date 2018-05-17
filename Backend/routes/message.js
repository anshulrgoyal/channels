const express=require('express');

const channel=require('../models/channel')
const message=require('../models/message');

const router=express.Router();

router.get('/api/messages',(req,res)=>{
    message.findById(req.body.messageId).then((foundMessage)=>{
      res.json(foundMessage);  
    })
})

router.put('/api/messages',(req,res)=>{
    message.findById(req.body.messageId).then((foundMessage)=>{
        foundMessage.text=req.body.text;
        foundMessage.save((err)=>{res.json(err)})
    })
})

router.delete('/api/message',(req,res)=>{
    message.findByIdAndRemove(req.body.messageId,(err)=>{
        err?res.json({err}):res.json({message:"sucess"});
    })
    channel.findById(req.body.channelId).then((foundChannel)=>{
        const index=foundChannel.messages.indexOf(req.body.messageId);
        foundChannel[index]=null;
        foundChannel.save((err)=>{
            err?res.json({err}):res.json({message:"sucess"})
        })
    })
})

router.post('/api/message',(req,res)=>{
    message.create(req.body).then((newMessage)=>{
        channel.findById(req.body.channelId).then((foundChannel)=>{
            foundChannel.messages.push(newMessage);
            foundChannel.save((err)=>{
                err?res.json({err}):res.json({message:"sucess"});
            })
        })
    });
    
})

module.exports=router;