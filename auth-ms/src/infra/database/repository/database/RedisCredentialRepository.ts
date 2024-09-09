import Credential from "@domain/entity/Credential";
import CredentialRepository from "@domain/repository/CredentialRepository";
import { createClient } from 'redis';

const client = createClient({
    url: "redis://token-redis:6379"
});

client.on('connect', () => {
    console.log('Connection to Redis established');
});

client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

(async () => {
    try {
        await client.connect();
        const pong = await client.ping();
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

class RedisCredentialRepository implements CredentialRepository {

    async save(credential: Credential): Promise<Credential> {
        const { token, userId, roles, expireTime } = credential;

        await client.set(`token:${token}`, JSON.stringify({ userId, roles }));
        await client.expire(`token:${token}`, expireTime);
        return credential;
    }

    async findOne(token: string): Promise<Credential | null> {

        const value = await client.get(`token:${token}`);
        if (!value) return null;

        const { userId, roles } = JSON.parse(value);

        const credential = new Credential(token, userId);
        credential.addRoles(roles);

        return credential;
    }

    async removeAll(): Promise<void> {
        const pattern = 'token:*';
        let cursor = 0;

        do {
            const options = {
                MATCH: pattern,
                COUNT: 1000
            };

            const scanResult = await client.scan(cursor, options);
            const newCursor = scanResult.cursor;
            const keys = scanResult.keys;

            cursor = newCursor;

            if (keys.length > 0) {
                await Promise.all(keys.map((key: any) => client.del(key)));
            }
        } while (cursor !== 0);
    }

    async removeOne(token: string): Promise<void> {
        await client.del(`token:${token}`);
    }
}

export default RedisCredentialRepository;