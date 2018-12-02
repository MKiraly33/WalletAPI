const db = require('./db');

module.exports = {
    login: login,
    logout: logout
}

function login(req, res) {
    if(req.body.username && req.body.pin) {
        var loginUser = {
            username: req.body.username,
            pin: req.body.pin
        }

        if(!db.getObject('loggedIn', {username: loginUser.username})) {
            if(db.getObject('users', {username: loginUser.username})) {
                var user = db.getObject('users', {username: loginUser.username});
                
                if(user.pin == loginUser.pin) {
                    db.createObject('loggedIn', {
                        username: user.username,
                        pin: user.pin,
                        accountNumber: user.accountNumber,
                        sessionId: user._id
                    });

                    res.json({
                        sessionId: user._id
                    })
                } else {
                    res.send(401, {
                        message: "Try the pin again."
                    })
                }
            } else {
                res.send(401, {
                    message: "We can't find this account, please register first."
                })
            }
        } else {
            res.send(401, {
                message: "This user is already logged in."
            })
        }
    } else {
        res.send(401, {
            message: "Username or pin missing."
        })
    }
}

function logout(req, res) {
    var sessionId = req.headers.session_id;

    db.deleteObject('loggedIn', {sessionId: sessionId});

    res.json({
        sessionId: sessionId
    });
}