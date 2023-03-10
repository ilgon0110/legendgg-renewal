import client from '@libs/client/prismadb';
import withHandler from '@libs/server/withHandler';
import { parseCookies } from '@utilities/index';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  [key: string]: any;
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
  const {
    body: { playerData, playerDescription },
    query: { id },
  } = req;

  if (req.method === 'POST') {
    const [csrfToken, __, sessionCookie] = parseCookies(req.headers.cookie);
    const [_, cookieValue] = sessionCookie;
    const session = await client.session.findUnique({
      where: {
        sessionToken: cookieValue,
      },
    });
    if (!session) throw new Error('No Session');

    const user = await client.user.findUnique({
      where: {
        id: session.userId,
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

    await playerData.forEach(async (player: any, idx: any) => {
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

    res.status(200).json({ ok: true, players });
  }
};

export default withHandler({ methods: ['POST', 'GET'], handler });
