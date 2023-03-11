import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    user: User | AdapterUser;
    expires: string;
  }
}
