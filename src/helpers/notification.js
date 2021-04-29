import { toast } from 'react-toastify'

/**
 * Positive toast message
 * @param {string} message 
 */
function notifySuccess(message) {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

/**
 * Negative toast message
 * @param {string} message 
 */
function notifyError(message) {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export { notifySuccess, notifyError };