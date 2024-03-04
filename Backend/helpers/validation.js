function emailValidation(email) {
    let pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
}

function passwordValidation(password) {
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return pattern.test(password);
}

function TradValidation(tradenumber) {
    let pattern = /^TRAD\/[A-Z]{4}\/\d{6}\/\d{4}$/;

    return pattern.test(tradenumber);
}

function nidValidation(nidnumber) {
    let pattern = /^[0-9]{10}$/;

    return pattern.test(nidnumber);
}

module.exports = {
    emailValidation,
    passwordValidation,
    TradValidation,
    nidValidation,
};
