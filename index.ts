import net from 'net';

const client = net.createConnection({
    host: '127.0.0.1',
    port: 8123
}, () => {
    console.log('Connected to ClickHouse server');
});

