const db = require('./db');
const VAT = 0.27;

module.exports = {
    remove: remove,
    upload: upload,
    pay: pay
}

function remove(req, res) {
    var sessionId = req.headers.session_id;
    var pin = req.headers.pin;

    var data = db.getObject('users', {_id: sessionId});

    if(data) {
        if(pin) {
            if(getNumOfDigits(pin) == 4) {
                if(pin == data.pin) {
                    data.accountNumber = "Unknown";
                    data.balance = 0;

                    db.updateObject('users', {_id: sessionId}, data);

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

function upload(req, res) {
    var sessionId = req.headers.session_id;
    var pin = req.headers.pin;
    var amount = req.query.amount;

    var data = db.getObject('users', {_id: sessionId});

    if(data) {
        if(pin) {
            if(getNumOfDigits(pin) == 4) {
                if(pin == data.pin) {
                    data.balance = parseInt(data.balance) + parseInt(amount);

                    db.updateObject('users', {_id: sessionId}, data);

                    res.json({
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

function pay(req, res) {
    var sessionId = req.headers.session_id;
    var pin = req.headers.pin;
    var price = req.query.price;

    var data = db.getObject('users', {_id: sessionId});

    if(data) {
        if(pin) {
            if(getNumOfDigits(pin) == 4) {
                if(pin == data.pin) {
                    if(parseInt(data.balance) - parseInt(price) >= 0) {
                        data.balance = parseInt(data.balance) - (parseInt(price) + parseInt(price) * VAT);

                        db.updateObject('users', {_id: sessionId}, data);

                        res.json({
                            balance: data.balance
                        })
                    } else {
                        res.send(400, {
                            message: "You don't have enough money for this transaction."
                        })
                    }
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