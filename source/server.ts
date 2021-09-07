import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import contactRoutes from './routes/contact';
import userRoutes from './routes/user'  
import  mongoose  from 'mongoose';

const NAMESPACE = 'Server';
const router = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, "Connected to MongoDb");
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error)
    })


router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

router.use(express.json())
router.use(express.urlencoded({
    extended: true
}))



/** Rules of our API */

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method == 'OPTIONS')
    {
        res.header('Access-Controll-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({})
        
    }
    next();
})


/** Routes */

router.use('/api/contacts', contactRoutes)
router.use('/api', userRoutes)


router.use((req, res, next) => {
    const error = new Error('Not Found');

    return res.status(404).json({
        message: error.message
    });
});



/** Create the server */

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))