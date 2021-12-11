import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from 'db';

export default async function progress(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const schema = z
    .object({ name: z.string(), description: z.string() })
    .safeParse(JSON.parse(req.body));

  console.log({ session, schema });

  if (req.method !== 'POST' || !schema.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, description } = schema.data;

  try {
    const user = await db.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const exist = await db.achievement.findFirst({
      where: { name, userId: user?.id! },
    });

    if (exist) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    await db.achievement.create({
      data: {
        name,
        description,
        userId: user?.id!,
      },
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to set achievement' });
  }
}
