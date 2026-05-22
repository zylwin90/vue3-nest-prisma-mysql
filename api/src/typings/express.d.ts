// src/types/express-user.d.ts
import 'express';

declare module 'express' {
  interface Request {
    user: {
      userId: number;
      username: string;
    };
  }
}