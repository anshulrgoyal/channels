const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    firstName:String,
    lastName:String,
    password:String,
    subscribedChannel:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }],
    hostedChannels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }]
})
userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})
userSchema.methods.comparePassword=function(candidatePassword,next){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return next(err);
        next(null,isMatch)
    })
}
module.exports=mongoose.model('User',userSchema);