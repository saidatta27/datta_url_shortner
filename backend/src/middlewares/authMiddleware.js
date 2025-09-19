import jwt from 'jsonwebtoken';


export const isLoggedIn = (req, res, next) => {


   // console.log(req);
   const jwtToken = req.cookies.jwt;


   if (!jwtToken) {
       console.log('JWT token not found in request');
       return res.status(403).json({ status: 'FORBIDDEN', message: 'Token not found!' });
   }


   try {


       const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
       req.user = decoded;
       console.log("send to next");
       next();


   } catch (error) {


       console.error("Error in validating the token in privateRoute", error.message);
      
       if (error.name === 'TokenExpiredError') {
           return res.status(401).json({ status: 'FORBIDDEN', message: 'Token expired' });
       }
       return res.status(401).json({ status: 'FORBIDDEN', message: 'Invalid token' });


   }
};
