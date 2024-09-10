import { env as envDev } from './env.dev';
import { env as envProd } from './env.prod';

const prod = false;
const env = prod ? envProd : envDev;

export {
    env
};
