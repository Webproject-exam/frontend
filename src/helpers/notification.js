import { toast } from 'react-toastify'

/**
 * 
 * @param { String } message 
 * @returns { Number } estimated reading time in miliseconds
 */
function calculateReadingTime(message){
    let wordCount = String(message).trim().split(/\s+/).length;
    let readTimeInMilliseconds = Math.ceil((wordCount/2)*1000)
    return readTimeInMilliseconds;
}

/**
 * Positive toast message
 * @param {string} message 
 */
function notifySuccess(message) {
    toast.success(message, {
        position: "bottom-left",
        autoClose: calculateReadingTime(message),
    });
};

/**
 * Negative toast message
 * @param {string} message 
 */
function notifyError(message) {
    toast.error(message, {
        position: "bottom-left",
        autoClose: calculateReadingTime(message),
    });
};

/**
 * Informative toast message
 * @param {string} message 
 */
function notifyInfo(message) {
    toast.info(message, {
        position: "bottom-left",
        autoClose: calculateReadingTime(message),
    });
};

export { notifySuccess, notifyError, notifyInfo };