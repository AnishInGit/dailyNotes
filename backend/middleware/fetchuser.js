const jwt = require('jsonwebtoken');
const Jwt_SECRET="Anishisagoodb$oy";
const fetchuser=(req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.ststus(401).send({error:"Please authenticate using a valid token"})
     
    }
    try {
        const data=jwt.verify(token,Jwt_SECRET);
        req.user=data.user;
        next() 
    } catch (error) {
        res.ststus(401).send({error:"Please authenticate using a valid token"})

    }

}
module.exports=fetchuser;
