import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.query;
  const jsonDirectory = path.join(process.cwd(), '/public/jsons');
  const fileContents = await fs.readFile(
    jsonDirectory + `/${name}.json`,
    'utf8',
  );

  res.status(200).json(fileContents);
}
