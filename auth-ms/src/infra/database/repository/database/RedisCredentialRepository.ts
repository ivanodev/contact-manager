import Credential from "@domain/entity/Credential";
import CredentialRepository from "@domain/repository/CredentialRepository";
import redis from 'redis';
import { promisify } from 'util';

//const client = redis.createClient();
const client = redis.createClient({
    url: "redis://localhost:6379"
});


const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);
const scanAsync = promisify(client.scan).bind(client);

class RedisCredentialRepository implements CredentialRepository {

    async save(credential: Credential): Promise<Credential> {

        const { token, userId, roles, expireTime } = credential;

        await setAsync(`token:${token}`, {userId, roles});
        await expireAsync(`token:${token}`, expireTime);
        return credential;
    }

    async findOne(token: string): Promise<Credential | null> {

        const value = await getAsync(`token:${token}`);

        if (!value) return null;

        const {userId, roles} = value;
        const credential = new Credential(token, userId);
        credential.addRoles(roles);
        return credential;
    }

    async removeAll(): Promise<void> {
        const pattern = 'token:*';
        let cursor = '0';

        do {
            const [newCursor, keys] = await scanAsync(cursor, 'MATCH', pattern);
            cursor = newCursor;

            if (keys.length > 0) {
                await Promise.all(keys.map((key: any) => delAsync(key)));
            }
        } while (cursor !== '0');
    }

    async removeOne(token: string): Promise<void> {
        await delAsync(`token:${token}`);
    }
}

export default RedisCredentialRepository;