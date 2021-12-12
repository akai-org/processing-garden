import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import db from 'db';

export default async function save(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const schema = z.object({ code: z.string() }).safeParse(JSON.parse(req.body));

  if (req.method !== 'POST' || !schema.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { code } = schema.data;

  try {
    await db.sandbox.update({
      data: { code },
      where: { id: req.query.id as string },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to set progress' });
  }
}
