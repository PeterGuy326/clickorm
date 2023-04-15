import net from 'net';
import { Op } from './utils/op';
export default class Clickorm<T> {
    private host: string;
    private port: number;
    private user: string;
    private password: string;
    private database: string;
    private client: net.Socket;

    Op: Op<T>;

    constructor(host: string, port: number, user: string, password: string, database: string) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
        this.client = net.createConnection({
            host,
            port
        }, () => {
            console.log('Connected to ClickHouse server');
        });

        this.Op = new Op<T>(host, port, user, password, database);
    }

    getClient() {
        return this.client;
    }

    async close(): Promise<void> {
        await this.client.end(() => {
            console.log('Interrupted connect to ClickHouse server');
        })
    }
}