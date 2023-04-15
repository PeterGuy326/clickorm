import Clickorm from './core/clickorm';

type UserAttribute = {
    id: number,
    name: string,
    age: number,
    gender: string
}

const clickorm = new Clickorm<UserAttribute>('127.0.0.1', 8123, 'root', '123456', 'test');

// const { Op } = clickorm;

// Op.insert('user', {
//     id: 1,
//     name: 'Alice',
//     age: 25,
//     gender: 'female'
// })