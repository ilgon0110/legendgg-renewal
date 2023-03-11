import { NextApiHandler } from 'next';
import NextAuth, { Session, User } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '@libs/client/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AdapterUser } from 'next-auth/adapters';

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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }: ISessionTypes) {
      if (session.user) {
        session.id = user.id;
      }
      return session;
    },
  },
};

interface ISessionTypes {
  session: Session;
  user: User | AdapterUser;
}
