const express=require('express');
const app=express();
const mongoose=require('mongoose')
const jwt =require('jsonwebtoken');

// routes are imported
const authRoutes=require('./routes/auth');
const channelRoutes=require('./routes/channel');
const messageRoutes=require('./routes/message');
const userRoutes=require('./routes/user');

// models are imported
const user=require('./models/user');

// Token function imported
const userToken=require('./conf/userToken')

// Database connected
mongoose.connect();


app.use(require('body-parser').json());

// Token are converted to user
app.use(userToken(jwt,user))

// routes 
app.use(authRoutes);
app.use(channelRoutes);
app.use(messageRoutes);
app.use(userRoutes);



app.listen(process.env.PORT||3000,()=>{
    console.log('hello');
})
