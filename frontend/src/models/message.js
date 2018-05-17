class Message{
    constructor(id,text,channelId,time,recivedTime,image){
        this.id=id;
        this.text=text;
        this.image=image;
        this.channelId=channelId;
        this.time=time;
        this.recivedTime=recivedTime;
    }
    getDrypt=()=>{

    }
}


class Channel {
    isPublic=true;
    constructor(id,description,admin,date,messages){
        this.id=id;
        this.description=description;
        this.admin=admin;
        this.date=date;
        this.messages=messages.map((message)=>{
            return new Message(message);
        })
    }
    delete=()=>{};
    rename=()=>{};
    makePrivate=()=>{};
    makePublic=()=>{};
    sendInvites=()=>{};
}
class User{
    constructor(id,photo,bio,userName,token){
        this.id=id;
        this.photo=photo;
        this.bio=bio;
        this.userName=userName;
        this.token=token;
    }
    isLoggedIn=()=>{};
    login=()=>{};
    logOut=()=>{};

}