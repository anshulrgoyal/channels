function userTokens(jwt,user){
    return function userToken(req,res,next){
        try{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, "kickass", function (err, payload) {
            if (payload) {
                user.findById(payload.userId).then(
                    (doc)=>{
                        req.user=doc;
                        next()
                    }
                )
            } else {
               next()
            }
        })
    }catch(e){
        next()
    }
    }
}

module.exports=userTokens
