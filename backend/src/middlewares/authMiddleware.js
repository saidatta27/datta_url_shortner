import jwt from "jsonwebtoken";

export const isLoggedin =(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"No Token Found"});
            
        }
        const decrypted=jwt.verify(token,process.env.jwt_SECRET); 
        req.user = decrypted;
        next();
        
    }catch(err){

    }
}