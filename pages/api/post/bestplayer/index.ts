import client from '@libs/client/prismadb';
import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getCsrfToken } from 'next-auth/react';
import { resolve } from 'path';

type Data = {
  ok: boolean;
  [key: string]: any;
};

const parseCookies = (cookie = '') => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .map(([key, ...value]) => [key, value.join('=')]);
};

const Line = {
  0: 'top',
  1: 'jungle',
  2: 'mid',
  3: 'bot',
  4: 'support',
} as const;

type Line = typeof Line[keyof typeof Line];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log('bestplayer API 실행');
  const [sessionCookie] = parseCookies(req.headers.cookie);
  const [cookieName, cookieValue] = sessionCookie;
  const {
    body: { playerData, playerDescription },
    query: { id },
  } = req;

  if (req.method === 'POST') {
    const session = await client.session.findUnique({
      where: {
        sessionToken: cookieValue,
      },
    });

    const user = await client.user.findUnique({
      where: {
        id: session?.userId,
      },
    });
    const bestPlayer = await client.bestPlayer.create({
      data: {
        image: '',
        description: playerDescription,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    playerData.forEach(async (player, idx) => {
      await client.playerList.create({
        data: {
          line: Line[idx as keyof typeof Line],
          name: player.name,
          year: player.year,
          season: player.season,
          bestplayer: {
            connect: {
              id: bestPlayer.id,
            },
          },
        },
      });
    });

    res.status(200).json({ ok: true, id: bestPlayer.id });
  }

  if (req.method === 'GET') {
    if (typeof id !== 'string') {
      throw new Error('query must be string');
    }
    const players = await client.bestPlayer.findUnique({
      where: {
        id: id,
      },
      select: {
        description: true,
        userId: true,
        playerList: {
          select: {
            line: true,
            name: true,
            year: true,
            season: true,
          },
        },
      },
    });
    console.log(players);
    res.status(200).json({ ok: true, players });
  }
};

export default withHandler({ methods: ['POST', 'GET'], handler });
