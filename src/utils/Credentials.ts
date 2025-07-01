import dotenv from 'dotenv';
import path from 'path';

export function loadEnv() {
    const testEnv = process.env.TEST_ENV || 'local';
    const envFile = `.env.${testEnv}`;
    const envPath = path.resolve(__dirname, '../../credentials', envFile);
    dotenv.config({ path: envPath });
}

export interface Credential {
    baseUrl: string;
    email: string;
    password: string;
    communityKey: string;
    communityName: string;
}

export function loadCredential(name: string): Credential {
    return {
        baseUrl: process.env[`${name}_BASE_URL`] || '',
        email: process.env[`${name}_EMAIL`] || '',
        password: process.env[`${name}_PASSWORD`] || '',
        communityKey: process.env[`${name}_COMMUNITY_KEY`] || '',
        communityName: process.env[`${name}_COMMUNITY_NAME`] || ''
    };
}
