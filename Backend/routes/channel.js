const express = require('express');

// Models are imported
const channel = require('../models/channel')
const message = require('../models/message')
const user = require('../models/user')

const router = express.Router();

router.post('/api/channel/new', (req, res) => {
    channel.create(req.body).then((newChannel) => {
        newChannel.admin = req.user;
        console.log(req.user)
        newChannel.save((err)=>{
            err?res.json({err}):res.json({message:"sucess"})
        })
    });
})

router.delete('/api/channel', (req, res) => {
    channel.findById(req.body.channelId).then((foundChannel) => {
        let deleteOperation = foundChannel.messages.map((id) => {
            return message.findByIdAndRemove(id)
        })
        Promise.all(deleteOperation).then((data) => {
            channel.findByIdAndRemove(req.body.channelId, (err) => {
                if (err) res.json({ err })
                else {
                    user.findById(foundChannel.admin).then((foundUser) => {
                        let index = foundUser.hostedChannels.indexOf(req.body.channelId)
                        foundUser.hostedChannels.splice(index, 1);
                        foundUser.save((err) => {
                            err ? res.json({ err }) : null;
                        })
                        deleteOperation = foundChannel.users.map((id) => {
                            return user.findById(id)
                        })
                        Promise.all(deleteOperation).then((foundUsers) => {
                            console.log(foundUsers)
                            let error = ''
                            foundUsers.forEach((eachUser) => {
                                index = eachUser.subscribedChannel.indexOf(req.body.channelId);
                                eachUser.subscribedChannel.splice(index, 1);
                                eachUser.save((err) => {
                                    console.log(err)
                                    error = err + '\n' + err;
                                })
                            })
                            return err
                        }).then((err) => {
                            !!err ? res.json(err) : res.json({ message: 'sucess' })
                        })
                    })
                }
            })
        })
    })
})
router.post('/api/channel/',(req,res)=>{
    channel.findById(req.body.channelId).populate('messages').exec((err,foundChannel)=>{
        console.log(foundChannel)
        console.log(err)
        res.json({messages:foundChannel.messages.slice(req.body.lastMessage)});
    })
})

router.put('/api/channel',(req,res)=>{
    channel.findById(req.body.channelId).then((foundChannel)=>{
        foundChannel.description=req.body.description;
        foundChannel.save((err)=>{
            err?res.json({err}):res.json({message:"sucesss"})
        })
    })
})

router.get('/api/channel/all',(req,res)=>{
    channel.find({}).then((foundChannels)=>{
        res.json({channel:foundChannels});
    })
})
module.exports=router;