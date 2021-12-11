import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from 'db';

export default async function progress(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  const schema = z
    .object({
      query: z.object({
        taskId: z.string(),
<<<<<<< Updated upstream
        stepId: z.string().transform((value) => Number(value)),
=======
        stepId: z.number(),
>>>>>>> Stashed changes
      }),
    })
    .safeParse(req);

  if (req.method !== 'POST' || !schema.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { stepId, taskId } = schema.data.query;

  try {
<<<<<<< Updated upstream
    const user = await db.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const p = await db.progress.findFirst({
      where: { taskId, stepId, userId: user?.id! },
    });

    if (!p) {
      await db.progress.create({
        data: {
          taskId,
          stepId,
          userId: user?.id!,
        },
      });
    }

    res.status(201).json({ success: true });
=======
    await db.progress.create({
      data: {
        taskId,
        stepId,
        user: { connect: { email: session.user.email } },
      },
    });

    res.status(200).json({ success: true });
>>>>>>> Stashed changes
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to set progress' });
  }
}
