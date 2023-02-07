// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from '@libs/client/prismadb';
import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  [key: string]: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;
  if (typeof id !== 'string') {
    throw new Error('query must be string');
  }
  const bestPlayer = await client.bestPlayer.findMany({
    where: {
      userId: id,
    },
  });

  res.status(200).json({ ok: true, bestPlayer });
}

export default withHandler({ methods: ['GET'], handler });
