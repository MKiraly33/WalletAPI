const db = require('./db');

module.exports = {
    signUpUser: signUpUser
}

db.initCollection('users');

function signUpUser(req, res) {
    if(req.body.username && req.body.pin && req.body.accountNumber) {
        var user = {
            username: req.body.username,
            pin: req.body.pin,
            accountNumber: req.body.accountNumber,
            balance: 0
        }

        var sessionId = db.createObject('users', user);
        
        res.json({
            sessionId: sessionId._id
        });
    } else {
        return res.send(400, {
            message: "Username or pin or account number missing."
        })
    }
}