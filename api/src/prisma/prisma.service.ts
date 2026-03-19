import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        // const adapter = new PrismaMariaDb({
        //   host: process.env.DATABASE_HOST,
        //   user: process.env.DATABASE_USER,
        //   password: process.env.DATABASE_PASSWORD,
        //   database: process.env.DATABASE_NAME,
        //   port: Number(process.env.DATABASE_PORT) || 3306,
        // });
        const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
        super({ adapter });
    }
}