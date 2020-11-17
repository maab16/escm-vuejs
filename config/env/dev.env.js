module.exports = {
    NODE_ENV: 'development',
    BASE_URL: '/api',
    COOKIES_LIFETIME: 365, // 1 year
    OTP_LIFETIME: 10, // 10 days
    SEARCH_LIMIT: 5, // For no limit use `null`
    MAX_KEYWORD: 5,
    RECENT_ORDERS_LIMIT: 5,
    RECENT_UPDATES_LIMIT: 5,
    INTERNAL_USER_DOMAIN: 'gmail.com',
    DEBOUNCE_WAIT_RATE: 500,// search wait in miliseconds
    COUNTDOWN: 59, // Set coundown for checkout in seconds. Default 60 SECONDS
    PRIVATE_KEY: 'private-key',
    TOKEN_EXPIRES: 60 // seconds
};
