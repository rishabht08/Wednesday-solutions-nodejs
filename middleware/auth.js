
const jwt = require('jsonwebtoken');

module.exports = (req, res , next) => {

    try {
        const token = req.headers.token;
  
        jwt.verify(token, process.env.JWT_KEY , (err, decoded) => {
         

          
 
            if (err || !decoded.table.userName) {
          
                res.status(401).send({
                    error:'Invalid request!'
                  });
            }
            else {
                res.locals.user = decoded.table
                next()
                }

    })
 } catch (error) {

        res.status(401).send({
        error: 'Invalid request!'
      });

    }


}