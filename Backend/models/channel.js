const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')

const channelSchema= new mongoose.Schema({
    name:String,
    numberOfUser:{
        type:Number,
        default:0,
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        default:'NO Description'
    },
    type:{
        type:String,
        default:'Public'
    },
    inviteLink:{
        type:String,
        default:'NONE'
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }]

},{timestamps:true})

channelSchema.pre('save', function (next) {
    const channel = this;
    channel.inviteLink="/invite/"+ jwt.sign({channelId:channel._id},"kickass")
    next();
}, function (err) {
    next(err)
})
module.exports=mongoose.model('Channel',channelSchema)