import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import db from 'db';

export default async function save(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const queryParams = z
    .object({
      query: z.object({
        taskId: z.string(),
        stepId: z.number(),
      }),
    })
    .safeParse(req);

  //   if (req.method === 'POST' && queryParams.success) {
  //     const { stepId, taskId } = queryParams.data.query;

  //     try {
  //       await db.progress.create({
  //         data: {
  //           taskId,
  //           stepId,
  //           // @ts-ignore
  //           userId: session.userId,
  //         },
  //       });

  //       res.status(200).json({ success: true });
  //     } catch (error) {
  //       res.status(500).json({ error, message: 'Failed to set progress' });
  //     }
  //   }

  return res.status(400).json({ error: 'Invalid input' });
}
