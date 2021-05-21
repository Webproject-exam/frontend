// https://medium.com/swlh/how-to-implement-refresh-token-functionality-front-end-eff58ce52564
const expiryDuration = 600000;
const LOCAL_STORAGE_PREFIX = 'plants-';

const store = (key, value) => {
    return localStorage.setItem(LOCAL_STORAGE_PREFIX + key, value);
};

const read = (key) => {
    return localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
};

const getExpiry = () => {
    return (new Date().getTime() + expiryDuration);
};

const isExpired = (expiry) => {
    return (new Date().getTime() > parseInt(expiry, 10));
};

const storeExpiry = (key, value, expiry = false) => {
    if (expiry === true) {
        store(`${key}.e`, getExpiry());
    }
    return store(key, value);
};

const readExpiry = (key) => {
    const expiryData = read(`${key}.e`);
    const data = read(key);
    if (data != null) {
        if (data && isExpired(expiryData)) {
            return { response: data, expired: true };
        }
        if (data && !isExpired(expiryData)) {
            return { response: data, expired: false };
        }
    }
    return { response: null, expired: true };
};

const timeToUpdate = () => {
    const expiry = readExpiry("token");
    return expiry.expired;
}

const clear = () => {
    window.localStorage.clear();
    return null;
}

module.exports = { clear, storeExpiry, readExpiry, read, store, timeToUpdate };