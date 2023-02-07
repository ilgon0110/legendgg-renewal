import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '@libs/client/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
};
