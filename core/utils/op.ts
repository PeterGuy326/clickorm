import Clickorm from '../clickorm';

export class Op<T> extends Clickorm<T> {

    constructor(host: string, port: number, user: string, password: string, database: string) {
        super(host, port, user, password, database);
    }

    public async query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const client = super.getClient();
            client.write(sql + '\n');
            client.on('data', (data) => {
                const result = data.toString().split('\n');
                result.pop(); // 删除最后一个空行
                resolve(result);
            });
            client.on('error', (err) => {
                reject(err);
            });
        });
    }

    public async select(table: string, columns: string[], conditions?: string[]): Promise<T[]> {
        const columnString = columns.join(',');
        const whereString = conditions ? `WHERE ${conditions.join(' AND ')}` : '';
        const sql = `SELECT ${columnString} FROM ${table} ${whereString}`;
        const result = await this.query(sql);
        return result.map((row: any) => {
            const values = row.split('\t');
            const obj: { [key: string]: any } = {};
            for (let i = 0; i < columns.length; i++) {
                obj[columns[i]] = values[i];
            }
            return obj;
        });
    }

    public async insert<T extends Record<string, any>>(table: string, data: T): Promise<void> {
        const columns = Object.keys(data).join(',');
        const values = Object.values(data).map((val) => `'${val}'`).join(',');
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
        await this.query(sql);
    }

    public async update<T extends Record<string, any>>(table: string, data: T, where: string): Promise<void> {
        const setClause = Object.entries(data).map(([key, value]) => `${key}='${value}'`).join(',');
        const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`;
        await this.query(sql);
    }

    public async delete(table: string, where: string): Promise<void> {
        const sql = `DELETE FROM ${table} WHERE ${where}`;
        await this.query(sql);
    }
}