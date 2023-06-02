const jwt = require('jsonwebtoken')

const isAuthenticated = async (req,res,next) =>{
        const token = req.headers['authorization']?.split(' ')[1]
    if(!token) return res.status(401).json({message:'Token is incorrect'})
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err) return res.json({message:err})
            req.user= user
            next()
        });  
 
}

module.exports = {isAuthenticated}