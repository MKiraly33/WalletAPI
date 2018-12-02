const db = require('./db');

module.exports = {
    getUserData: getUserData
}

function getUserData(req, res) {
    var sessionId = req.headers.session_id;
    var pin = req.headers.pin;

    var data = db.getObject('users', {_id: sessionId});

    if(data) {
        if(pin) {
            if(getNumOfDigits(pin) == 4) {
                if(pin == data.pin) {
                    res.json({
                        username: data.username,
                        accountNumber: data.accountNumber,
                        balance: data.balance
                    })
                } else {
                    res.send(401, {
                        message: "Wrong pin."
                    })
                }
            } else {
                res.send(400, {
                    message: "The pin must be a 4 digit number."
                })
            }
        } else {
            res.send(401, {
                pin: "Pin is needed."
            })
        }
    } else {
        res.send(400, {
            message: "Couldn't find any data."
        })
    }
}

function getNumOfDigits(num) {
    return num.toString().length;
}