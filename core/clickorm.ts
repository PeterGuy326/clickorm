import net from 'net';
export class Clickorm {
    private host: string;
    private port: number;
    private user?: string;
    private password?: string;
    private database?: string;
    private client: net.Socket;

    constructor(host: string, port: number, user?: string, password?: string, database?: string) {
        this.host = host;
        this.port = port;
        user ? this.user = user : {} ;
        password ? this.password = password : {} ;
        database ? this.database = database : {} ;
        this.client = net.createConnection({
            host,
            port
        }, () => {
            console.log('Connected to ClickHouse server');
        });
    }

    getClient() {
        return this.client;
    }

    public async close(): Promise<void> {
        await this.client.end(() => {
            console.log('Interrupted connect to ClickHouse server');
        })
    }
}