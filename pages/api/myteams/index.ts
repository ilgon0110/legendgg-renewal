import client from '@libs/client/prismadb';
import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  [key: string]: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const allPlayers = await client.bestPlayer.findMany();

  res.status(200).json({ ok: true, allPlayers });
};

export default withHandler({ methods: ['GET'], handler });
