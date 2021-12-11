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
      name: z.string(),
      template: z.string().optional(),
    })
    .safeParse(JSON.parse(req.body));

  if (req.method !== 'POST' || !schema.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, template } = schema.data;

  console.log({ name, template });

  try {
    const sandbox = await db.sandbox.create({
      data: {
        id: v4(),
        code: '',
        name,
      },
    });

    console.log({ sandbox });

    const user = await db.user.findFirst({
      where: { email: { equals: session.user.email } },
    });

    console.log({ user });

    if (user) {
      const sbUser = await db.sandboxUser.create({
        data: {
          sandboxId: sandbox.id,
          userId: user?.id!,
        },
      });
      console.log({ sbUser });
      return res.status(201).json(sandbox);
    }
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ message: 'Failed to create a sandbox' });
  }
}
