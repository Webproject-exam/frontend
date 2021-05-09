import { toast } from 'react-toastify'

/**
 * 
 * @param { String } message 
 * @returns { Number } estimated reading time in miliseconds
 */
/* function calculateReadingTime(message){
    let wordCount = message.trim().split(/\s+/).length;
    let readTimeInMilliseconds = Math.ceil((wordCount/2)*1000)
    return readTimeInMilliseconds;
} */

/**
 * Positive toast message
 * @param {string} message 
 */
function notifySuccess(message) {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
    });
};

/**
 * Negative toast message
 * @param {string} message 
 */
function notifyError(message) {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
    });
};

/**
 * Informative toast message
 * @param {string} message 
 */
function notifyInfo(message) {
    toast.info(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
    });
};

export { notifySuccess, notifyError, notifyInfo };