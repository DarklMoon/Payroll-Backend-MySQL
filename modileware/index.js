const pool = require("../config");

// async function logger(req, res, next) {
//     const timestamp = new Date().toISOString().substring(0, 19);
//     console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`);
//     next()
// };

async function isLoggedIn(req,res,next) {
    let authorization = req.header.role;

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    else if (authorization != "Supervisor" || authorization != "Manager" || authorization != "HR"){
        return res.status(401).send('You are not role')
    }
    else{
        next()
    }
}

module.exports = {isLoggedIn}