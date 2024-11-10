const http = require('http');
const app = require('./app');
const ia = require('./prediction/prediction')
const alert = require('./controllers/Restocks_alert')


/**
 * Normalize a port into a number, string, or false.
 * @param {string} val - The value to normalize.
 * @returns {number|string|boolean} - Returns the normalized port value.
 */
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '10011');
app.set('port', port);

/**
 * Error handler for server errors.
 * @param {Error} error - The error object.
 */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};




const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log(`http://localhost:${port}`);
});



server.listen(port);
