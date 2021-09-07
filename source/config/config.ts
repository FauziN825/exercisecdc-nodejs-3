import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true

}

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb://localhost:27017/exercise-3';
const MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `${MONGO_HOST}`
}


const SERVER_PORT = process.env.SERVER_PORT  || 1337;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME  || 'localhost';
const SERVER_TOKEN_EXPIRETIME = process.env.ERVER_TOKEN_EXPIRETIM  || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'supersecret';


const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;