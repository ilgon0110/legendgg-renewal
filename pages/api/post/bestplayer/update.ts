import client from '@libs/client/prismadb';
import withHandler from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  [key: string]: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { playerData, playerDescription, bestPlayerId }: IResponseBodyType = req.body;

  await client.bestPlayer.update({
    where: {
      id: bestPlayerId,
    },
    data: {
      image: '',
      description: playerDescription,
    },
  });

  const bfPlayer = await client.playerList.findMany({
    where: {
      bestPlayerId: bestPlayerId,
    },
  });

  bfPlayer.forEach(async (bfvalue, i) => {
    const line = ['top', 'jungle', 'mid', 'bot', 'support'];
    const playerLineData = playerData.map((player, i) => {
      return { ...player, line: line[i] };
    });
    const target = playerLineData.find((data) => bfvalue.line === data.line);

    await client.playerList.update({
      where: {
        id: bfvalue.id,
      },
      data: {
        name: target?.name,
        year: target?.year,
        season: target?.season,
      },
    });
  });

  res.status(200).json({ ok: true });
};

export default withHandler({ methods: ['POST'], handler });

interface IResponseBodyType {
  playerData: { name: string; year: string; season: string; isSelected: boolean }[];
  playerDescription: string;
  bestPlayerId: string;
}
