import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getSession } from 'next-auth/react';
import { v4 } from 'uuid';
import db from 'db';

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
  const schema = z
    .object({
      body: z.object({
        template: z.string().optional(),
      }),
    })
    .safeParse(req);

  if (req.method !== 'POST' || !schema.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { template } = schema.data.body;

  console.log({ template });

  try {
    const sandbox = await db.sandbox.create({
      data: {
        id: v4(),
        code: '',
      },
    });

    await db.sandboxUser.create({
      data: {
        sandboxId: sandbox.id,
        userEmail: session.user.email,
      },
    });

    return res.status(201).json(sandbox);
  } catch (error) {
    return res.status(500).json({ message: 'TODO' });
  }
}
