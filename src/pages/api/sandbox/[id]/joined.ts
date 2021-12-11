import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { z } from 'zod';
import db from 'db';

export default async function joined(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const schema = z
    .object({
      query: z.object({
        id: z.string(),
      }),
    })
    .safeParse(req);

  if (req.method !== 'POST' || !schema.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = schema.data.query;

  try {
    await db.sandboxUser.create({
      data: {
        sandboxId: id,
        userEmail: session.user.email,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to set progress' });
  }
}
