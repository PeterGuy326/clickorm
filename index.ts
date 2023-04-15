import { Clickorm } from './core/clickorm';

const clickorm = new Clickorm('127.0.0.1', 8123, 'root', '123456');
const client = clickorm.getClient();
