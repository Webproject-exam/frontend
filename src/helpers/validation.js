/**
 * 
 * @param {String} emailToValidate email to validate
 * @returns {Boolean} true / false
 */
function emailIsValid(emailToValidate) {
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(emailToValidate);
}

/**
 * 
 * @param { String } valueToCheck string to validate
 * @returns {Boolean} true / false
 */
function isEmpty(valueToCheck) {
    if (valueToCheck === '') {
        return false
    } else {
        return true
    }
}

export { emailIsValid, isEmpty };