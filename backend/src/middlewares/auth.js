const jwt = require('jsonwebtoken');

module.exports = {

    tokenValidation(req,res,next) {

        const { authorization } = req.headers;

        if(!authorization) {

            return res.status(401).json({ message: 'authentication required' });
        
        }

        const [ prefix, token ] = authorization.split(' ');

        if(prefix!=='Bearer') {

            return res.status(400).json({ message: 'bad token format' });

        }
            
        try {

            req.jwt = jwt.verify(token, process.env.JWT_SECRET);
            return next();

        } catch (err) {
            
            if(err instanceof jwt.TokenExpiredError) {

                return res.status(403).send({message:'forbidden access', cause: 'token expired' });
            
            }

            return res.status(403).send({message:'forbidden access'});
        }

    }

}