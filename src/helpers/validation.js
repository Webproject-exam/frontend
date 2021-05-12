/**
 * 
 * @param {String} emailToValidate email to validate
 * @returns {Boolean} true / false
 */
function emailIsValid(emailToValidate) {
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(emailToValidate);
}

export { emailIsValid };