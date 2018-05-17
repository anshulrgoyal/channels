const mongoose=require('mongoose');

messageSchema= new mongoose.Schema({
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    },
    text:String,
    image:String,
    files:[String],
},{timestamps:true});

module.exports=mongoose.model('Message',messageSchema);